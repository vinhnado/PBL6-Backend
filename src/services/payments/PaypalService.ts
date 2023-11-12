import { Service } from 'typedi';

@Service()
export class PaypalService {
	environment = process.env.ENVIRONMENT;
	client_id = process.env.CLIENT_ID;
	client_secret = process.env.CLIENT_SECRET;
	endpoint_url =
		this.environment === 'sandbox'
			? 'https://api-m.sandbox.paypal.com'
			: 'https://api-m.paypal.com';

	get_access_token() {
		const auth = `${this.client_id}:${this.client_secret}`;
		const data = 'grant_type=client_credentials';
		return fetch(this.endpoint_url + '/v1/oauth2/token', {
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

	createOrder = async (price: number) => {
		this.get_access_token()
			.then((access_token) => {
				let order_data_json = {
					// intent: req.body.intent.toUpperCase(),
					intent: 'CAPTURE',

					purchase_units: [
						{
							amount: {
								currency_code: 'USD',
								value: price.toString(),
							},
						},
					],
				};
				const data = JSON.stringify(order_data_json);

				fetch(this.endpoint_url + '/v2/checkout/orders', {
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
						return json;
					}); //Send minimal data to client
			})
			.catch((error) => {
				throw new Error('Can not fetch data : ' + error.message);
			});
	};

	completeOrder = async (orderId: string) => {
		this.get_access_token()
			.then((access_token) => {
				fetch(
					this.endpoint_url +
						'/v2/checkout/orders/' +
						orderId +
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
						return json;
					}); //Send minimal data to client
			})
			.catch((error) => {
				throw new Error('Can not fetch data : ' + error.message);
			});
	};
}
