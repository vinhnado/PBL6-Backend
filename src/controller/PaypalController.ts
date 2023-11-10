import 'dotenv/config';
import { Request, Response } from 'express';

const environment = process.env.ENVIRONMENT || 'sandbox';
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const endpoint_url =
	environment === 'sandbox'
		? 'https://api-m.sandbox.paypal.com'
		: 'https://api-m.paypal.com';

export class PaypalController {
	createOrder = (req: Request, res: Response) => {
		get_access_token()
			.then((access_token) => {
				let order_data_json = {
					// intent: req.body.intent.toUpperCase(),
					intent: 'CAPTURE',

					purchase_units: [
						{
							amount: {
								currency_code: 'USD',
								value: '100.00',
							},
						},
					],
				};
				const data = JSON.stringify(order_data_json);

				fetch(endpoint_url + '/v2/checkout/orders', {
					//https://developer.paypal.com/docs/api/orders/v2/#orders_create
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${access_token}`,
					},
					body: data,
				})
					.then((res) => res.json())
					.then((json) => {
						res.send(json);
					}); //Send minimal data to client
			})
			.catch((err) => {
				console.log(err);
				res.status(500).send(err);
			});
	};

	completeOrder = (req: Request, res: Response) => {
		get_access_token()
			.then((access_token) => {
				fetch(
					endpoint_url +
						'/v2/checkout/orders/' +
						req.body.order_id +
						'/' +
						'capture',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${access_token}`,
						},
					}
				)
					.then((res) => res.json())
					.then((json) => {
						console.log(json);
						res.send(json);
					}); //Send minimal data to client
			})
			.catch((err) => {
				console.log(err);
				res.status(500).send(err);
			});
	};
}

function get_access_token() {
	const auth = `${client_id}:${client_secret}`;
	const data = 'grant_type=client_credentials';
	return fetch(endpoint_url + '/v1/oauth2/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${Buffer.from(auth).toString('base64')}`,
		},
		body: data,
	})
		.then((res) => res.json())
		.then((json: any) => {
			return json.access_token;
		});
}
