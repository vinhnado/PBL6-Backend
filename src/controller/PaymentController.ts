import { Request, Response } from 'express';
import Container from 'typedi';
import { VNPayService } from '../services/payments/VNPayService';
import { text } from 'node:stream/consumers';
import { MomoService } from '../services/payments/MomoService';
import { PaypalService } from '../services/payments/PaypalService';

export class PaymentController {
	private vnPayService: VNPayService;
	private momoService: MomoService;
	private paypalService: PaypalService;

	constructor() {
		this.vnPayService = new VNPayService({
            tmnCode: '4YOYYZHU',
            secureSecret: 'MBIDOAOKAURPHPQIQVKYWQNHCSNNVWHU',
            returnUrl: 'https://sandbox.vnpayment.vn/tryitnow/Home/ReturnResult',
        });
        this.momoService = Container.get(MomoService);
        this.paypalService = Container.get(PaypalService);
    }

	getVNPayPaymentURL = async (req: Request, res: Response) => {
		try {
			const paymentUrl = await this.vnPayService.buildPaymentUrl({
				vnp_Amount: 10000,
				vnp_IpAddr: '127.0.0.1',
				vnp_TxnRef: (Math.floor(Math.random() * 90000) + 10000).toString(),
				vnp_OrderInfo: '123456',
			});
			res.status(200).json({
				message: 'Successfully',
				success: true,
				data: {
					url: paymentUrl,
				},
			});
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error', error: error });
		}
	};

	verifyReturnUrl = async (req: Request, res: Response) => {
		try {
			// console.log(req.query);
			const query: any = req.query;
			const results = await this.vnPayService.verifyReturnUrl(query);
			if (results.isSuccess) {
				res.status(200).json({
					message: 'Payment With VN Pay Successfully',
					success: true,
					results: results,
				});
			}
			res.status(200).json({
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
            this.momoService.getPaymentUrl( 'MM'+new Date().getTime(),'pay with MoMo', '', 55000)
              .then(paymentUrl => {
                res.status(200).json({
                    message: "Successfully",
                    success: true,
                    data: {
                        url: paymentUrl
                    },
                });
              })
              .catch(error => {
                console.error('Error:', error);
                    res.status(200).json({
                        message: "Failed",
                        success: false,
                    });
              });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error: error });
        } 
    }

	createPaypalOrder = async (req: Request, res: Response) => {
		this.paypalService
			.createOrder(req.body.price)
			.then((json) => {
				console.log(json);
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
}
