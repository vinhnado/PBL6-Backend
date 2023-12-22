import { PaymentController } from '../controller/PaymentController';
import { auth } from '../middleware/AuthMiddleware';
import { validateGetPayments } from '../validators/PaymentValidatator';
import { validate } from '../validators/Validator';
import BaseRoutes from './Base/BaseRouter';
class PaymentRoutes extends BaseRoutes {
	constructor() {
		super(new PaymentController());
	}
	public routes(): void {
		this.router.post('/paypal', auth, this.controller.createPaypalOrder);
		// this.router.post('/paypal/success', this.controller.completePaypalOrder);
		this.router.get(
			'/paypal/capture',

			this.controller.capturePaypalOrder
		);
		this.router.post('/vn-pay', auth, this.controller.getVNPayPaymentURL);
		this.router.post('/momo', this.controller.getMomoPaymentURL);
		this.router.get('/vn-pay/verify', this.controller.verifyReturnUrlVNPay);
		this.router.get('/momo/verify', this.controller.verifyReturnUrlMomo);
		this.router.get(
			'/momo/verify/test',
			this.controller.verifyReturnUrlMomoTest
		);
		this.router.get(
			'/',
			validateGetPayments,
			validate,
			this.controller.getPayments
		);
	}
}

export default new PaymentRoutes().router;
