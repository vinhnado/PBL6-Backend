import { PaymentController } from '../controller/PaymentController';
import { auth, authAdmin } from '../middleware/AuthMiddleware';
import { validateGetPayments } from '../validators/PaymentValidatator';
import { validate } from '../validators/Validator';
import BaseRoutes from './Base/BaseRouter';
class PaymentRoutes extends BaseRoutes {
	constructor() {
		super(new PaymentController());
	}
	public routes(): void {
		this.router.post('/paypal', auth, this.controller.createPaypalOrder);
		this.router.post(
			'/paypal/capture',
			auth,
			this.controller.capturePaypalOrder
		);
		this.router.delete(
			'/paypal/cancel',
			auth,
			this.controller.cancelPaypalOrder
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
			auth,
			authAdmin,
			validateGetPayments,
			validate,
			this.controller.getPayments
		);
	}
}

export default new PaymentRoutes().router;
