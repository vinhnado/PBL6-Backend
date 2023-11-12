import BaseRoutes from './Base/BaseRouter';
import { PaymentController } from '../controller/PaymentController';
class PaymentRoutes extends BaseRoutes {
	constructor() {
		super(new PaymentController());
	}
	public routes(): void {
		this.router.get('/vn-pay', this.controller.getVNPayPaymentURL);
		this.router.get('/momo', this.controller.getMomoPaymentURL);
		this.router.get('/vn-pay/check', this.controller.verifyReturnUrl);
	}
}

export default new PaymentRoutes().router;
