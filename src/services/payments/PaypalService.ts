import { Inject, Service } from 'typedi';
import { PaymentService } from '../PaymentService';
import { Payment } from '../../models/Payment';
import { SubscriptionService } from '../SubscriptionService';
import xml2js from 'xml2js';
import axios from 'axios';
@Service()
export class PaypalService {
	@Inject(() => PaymentService)
	private paymentService!: PaymentService;

	@Inject(() => SubscriptionService)
	private subscriptionService!: SubscriptionService;

	environment = process.env.ENVIRONMENT;
	client_id = process.env.CLIENT_ID?.toString();
	client_secret = process.env.CLIENT_SECRET?.toString();
	endpoint_url =
		this.environment === 'sandbox'
			? 'https://api-m.sandbox.paypal.com'
			: 'https://api-m.paypal.com';
	static transferRate: number;

	createOrder = async (userId: number, subscriptionInfoId: number) => {
		try {
			let price = await this.subscriptionService.getPriceBySubscriptionInfoId(
				subscriptionInfoId
			);
			// if (!PaypalService.transferRate) {
			// 	this.getExchangeRates();
			// 	console.log(PaypalService.transferRate);
			// }
			// console.log(price);
			// price = price / PaypalService.transferRate;
			// console.log(price);
			const order = {
				intent: 'CAPTURE',
				purchase_units: [
					{
						amount: {
							currency_code: 'USD',
							// value: price.toString(),
							value: 100,
						},
						description: 'Movie Subscription',
					},
				],
				application_context: {
					brand_name: 'MOVTIME',
					landing_page: 'LOGIN',
					user_action: 'PAY_NOW',
					return_url: 'http://localhost:3000/bill',
					cancel_url: 'http://localhost:3000/bill/cancel',
				},
			};

			const response = await axios.post(
				`${this.endpoint_url}/v2/checkout/orders`,
				order,
				{
					auth: {
						username: this.client_id || '',
						password: this.client_secret || '',
					},
				}
			);
			const id = response.data.links[1].href.split('=')[1];

			const partialObject: Partial<Payment> = {
				type: 'paypal',
				price: Number(price),
				transactionId: id,
				status: 'Not checkout',
				userId: userId,
				isPayment: false,
				subscriptionInfoId: subscriptionInfoId,
			};
			await this.paymentService.addOrEditPayment(partialObject);
			return response.data.links[1].href;
		} catch (error) {
			console.log(error);
		}
	};

	captureOrder = async (token: string) => {
		try {
			const response = await axios.post(
				`${this.endpoint_url}/v2/checkout/orders/${token}/capture`,
				{},
				{
					auth: {
						username: this.client_id || '',
						password: this.client_secret || '',
					},
				}
			);
			if (response.data.status === 'COMPLETED') {
				console.log(response.data);
				const partialObject: Partial<Payment> = {
					orderInfo: JSON.stringify(response.data),
					status: 'Success',
					isPayment: true,
					transactionId: token,
				};
				await this.paymentService.addOrEditPayment(partialObject);
				const payment = await this.paymentService.findPaymentByTransactionId(
					token
				);

				await this.subscriptionService.updateSubscription(
					payment.getDataValue('userId'),
					null,
					null,
					payment.getDataValue('subscriptionInfoId')
				);
				return 'Done';
			} else {
				return null;
			}
		} catch (error) {
			return error;
		}
	};

	cancelOrder = async (token: string) => {
		try {
			const payment = await this.paymentService.findPaymentByTransactionId(
				token
			);
			console.log(payment.paymentId);
			return await this.paymentService.deletePayment(payment.paymentId);
		} catch (error: any) {
			throw new Error(`Failed to delete payment: ${error.message}`);
		}
	};

	getExchangeRates = async () => {
		try {
			// Gửi yêu cầu để lấy dữ liệu từ URL
			const response = await axios.get(
				'https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx?b=10'
			);

			// Kiểm tra xem yêu cầu có thành công không (status code 200)
			if (response.status === 200) {
				// Parse XML từ nội dung của trang web
				const xmlData = response.data;
				const parser = new xml2js.Parser();
				const result = await parser.parseStringPromise(xmlData);

				// Lấy danh sách các Exrate
				const exrateList = result.ExrateList.Exrate as Array<any>;

				// Tìm tỷ giá cho VND và USD
				exrateList.forEach((exrate) => {
					const currencyCode = exrate.$.CurrencyCode;
					if (currencyCode === 'VND' || currencyCode === 'USD') {
						console.log(exrate.$.Transfer);
						PaypalService.transferRate = exrate.$.Transfer;
						return exrate.$.Transfer;
					}
				});
			} else {
				console.log(
					`Yêu cầu không thành công. Status code: ${response.status}`
				);
				return 1;
			}
		} catch (error) {
			console.error('Lỗi khi thực hiện yêu cầu:', error);
		}
	};
}
