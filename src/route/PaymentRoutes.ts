import { PaymentController } from '../controller/PaymentController';
import BaseRoutes from './Base/BaseRouter';
class PaymentRoutes extends BaseRoutes {
	constructor() {
		super(new PaymentController());
	}
	public routes(): void {
		this.router.post('/paypal', this.controller.createPaypalOrder);
		this.router.post('/paypal/success', this.controller.completePaypalOrder);
		this.router.post('/paypal/capture', this.controller.capturePaypalOrder);
		this.router.get('/vn-pay', this.controller.getVNPayPaymentURL);
		this.router.get('/momo', this.controller.getMomoPaymentURL);
		this.router.get('/vn-pay/check', this.controller.verifyReturnUrl);
	}
}

export default new PaymentRoutes().router;
