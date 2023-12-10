import { Request, Response } from 'express';
import Container, { Inject } from 'typedi';
import { VNPayService } from '../services/payments/VNPayService';
import { text } from 'node:stream/consumers';
import { MomoService } from '../services/payments/MomoService';
import { PaypalService } from '../services/payments/PaypalService';
import { Payment } from '../models/Payment';
import { PaymentService } from '../services/PaymentService';
import timezone from 'moment-timezone';
import { SubscriptionService } from '../services/SubscriptionService';

export class PaymentController {
	private vnPayService: VNPayService;
	private momoService: MomoService;
	private paypalService: PaypalService;
	private paymentService: PaymentService;
	private subscriptionService: SubscriptionService;

	constructor() {
		this.vnPayService = new VNPayService({
			tmnCode: process.env.VNP_TMN_CODE || '4YOYYZHU',
			secureSecret:
				process.env.VNP_HASH_SECRET || 'MBIDOAOKAURPHPQIQVKYWQNHCSNNVWHU',
			returnUrl:
				process.env.VNP_RETURN_URL ||
				'https://sandbox.vnpayment.vn/tryitnow/Home/ReturnResult',
		});
		this.momoService = Container.get(MomoService);
		this.paypalService = Container.get(PaypalService);
		this.paymentService = Container.get(PaymentService);
		this.subscriptionService = Container.get(SubscriptionService);
	}

	/**
	 * @param date
	 * @param format
	 * @return number
	 */
	private dateFormat(date: Date, format = 'yyyyMMddHHmmss'): number {
		const pad = (n: number) => (n < 10 ? `0${n}` : n).toString();
		const year = date.getFullYear();
		const month = pad(date.getMonth() + 1);
		const day = pad(date.getDate());
		const hour = pad(date.getHours());
		const minute = pad(date.getMinutes());
		const second = pad(date.getSeconds());

		return Number(
			format
				.replace('yyyy', year.toString())
				.replace('MM', month)
				.replace('dd', day)
				.replace('HH', hour)
				.replace('mm', minute)
				.replace('ss', second)
		);
	}

	getVNPayPaymentURL = async (req: Request, res: Response) => {
		try {
			const price = req.body.price;
			const ipAdd = req.body.ipAddress;
			const timeGMT7 = timezone(new Date()).tz('Asia/Ho_Chi_Minh').format();
			const userId = Number(req.payload.userId);
			const id =
				this.dateFormat(new Date(timeGMT7), 'yyyyMMddHHmmss') +
				(Math.floor(Math.random() * 90000) + 10000).toString();
			const idSubscription = req.body.idSubscription;
			const { subscriptionTypeId, price:priceSub } = await this.subscriptionService.getPriceBySubscriptionInfoId(idSubscription);
			if(priceSub!== price) {
				return res.status(400).json({
                    message: 'Price not match',
                });
			}
			const subInfo = await this.subscriptionService.getSubscriptionInfoById(idSubscription);
			const nameSubscription  = subInfo?.subscriptionType.getDataValue('name');
			const timeSubscription = subInfo?.duration.getDataValue('time');
			
			const paymentUrl = await this.vnPayService.buildPaymentUrl({
				vnp_Amount: price,
				vnp_IpAddr: ipAdd,
				vnp_TxnRef: id,
				vnp_OrderInfo: 'User_'+userId+' Thanh toán gói '+nameSubscription+' '+timeSubscription+' tháng',
			});

			const partialObject: Partial<Payment> = {
				type: 'VN Pay',
				price: price,
				transactionId: id,
				orderInfo: 'User_'+userId+' Thanh toán gói '+nameSubscription+' '+timeSubscription+' tháng',
				status: 'Not checkout',
				userId: userId,
				isPayment: false,
				subscriptionTypeId:idSubscription
			};

			await this.paymentService.addOrEditPayment(partialObject);
			res.status(200).json({
				message: 'Successfully',
				success: true,
				data: {
					url: paymentUrl,
				},
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Internal Server Error', error: error });
		}
	};

	verifyReturnUrlVNPay = async (req: Request, res: Response) => {
		try {
			// console.log(req.query);
			const query: any = req.query;
			const results = await this.vnPayService.verifyReturnUrl(query);
			const userId = Number(req.payload.userId);
			
			if (results.isSuccess) {
				const partialObject: Partial<Payment> = {
					orderInfo: results.vnp_OrderInfo,
					status: 'Completed',
					transactionId: results.vnp_TxnRef,
					isPayment: true,
				};

				// add Subscription for user
				// await this.subscriptionService.updateSubscription(userId,null, null,);

				await this.paymentService.addOrEditPayment(partialObject);

				return res.status(200).json({
					message: 'Payment With VN Pay Successfully',
					success: true,
					results: results,
				});
			}
			return res.status(200).json({
				message: 'Payment With VN Pay Failed',
				success: false,
				results: results,
			});
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error', error: error });
		}
	};

	getMomoPaymentURL = async (req: Request, res: Response) => {
		try {
			this.momoService
				.getPaymentUrl('MM' + new Date().getTime(), 'pay with MoMo', '', 55000)
				.then((paymentUrl) => {
					res.status(200).json({
						message: 'Successfully',
						success: true,
						data: {
							url: paymentUrl,
						},
					});
				})
				.catch((error) => {
					console.error('Error:', error);
					res.status(200).json({
						message: 'Failed',
						success: false,
					});
				});
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error', error: error });
		}
	};

	createPaypalOrder = async (req: Request, res: Response) => {
		this.paypalService
			.createOrder(3, req.body.subscriptionInfoId)
			.then((json) => {
				res.send(json);
			})
			.catch((err) => {
				res.status(500).json({ message: 'Internal Server Error', error: err });
			});
	};

	completePaypalOrder = async (req: Request, res: Response) => {
		this.paypalService
			.completeOrder(req.body.order_id)
			.then((json) => {
				res.send(json);
			})
			.catch((err) => {
				res.status(500).json({ message: 'Internal Server Error', error: err });
			});
	};
	capturePaypalOrder = async (req: Request, res: Response) => {
		this.paypalService
			.captureOrder(req.body.order_id)
			.then((json) => {
				res.send(json);
			})
			.catch((err) => {
				res.status(500).json({ message: 'Internal Server Error', error: err });
			});
	};

	verifyReturnUrlMomo = async (req: Request, res: Response) => {
		console.log(req.body);
		console.log('Momo return');
	};
}
