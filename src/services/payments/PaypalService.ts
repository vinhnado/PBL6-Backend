import { query } from 'express-validator';
import { Inject, Service } from 'typedi';
import { PaymentService } from '../PaymentService';
import { Payment } from '../../models/Payment';
import { SubscriptionService } from '../SubscriptionService';
import axios from 'axios';
import { json, Response } from 'express';
import { get } from 'http';
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

	createOrder = async (userId: number, subscriptionInfoId: number) => {
		try {
			const price = await this.subscriptionService.getPriceBySubscriptionInfoId(
				subscriptionInfoId
			);
			const order = {
				intent: 'CAPTURE',
				purchase_units: [
					{
						amount: {
							currency_code: 'USD',
							value: '100.20',
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
				// add Subscription for user
				await this.subscriptionService.updateSubscription(
					payment.getDataValue('userId'),
					null,
					null,
					payment.getDataValue('subscriptionInfoId')
				);
				return 'Done';
			} else {
				return 'Fail';
			}
		} catch (error) {
			return error;
		}
	};
}
