import BaseRoutes from './Base/BaseRouter';
import { PaypalController } from '../controller/PaypalController';
class PaymentRoutes extends BaseRoutes {
	constructor() {
		super(new PaypalController());
	}
	public routes(): void {
		this.router.get('/paypal', this.controller.createPaypalOrder);
		this.router.post('/paypal/success', this.controller.completePaypalOrder);
		this.router.get('/vn-pay', this.controller.getVNPayPaymentURL);
		this.router.get('/momo', this.controller.getMomoPaymentURL);
		this.router.get('/vn-pay/check', this.controller.verifyReturnUrl);
	}
}

export default new PaymentRoutes().router;
