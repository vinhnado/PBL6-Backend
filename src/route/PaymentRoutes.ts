import BaseRoutes from './Base/BaseRouter';
import { MovieController } from '../controller/MovieController';
import { PaymentController } from '../controller/PaymentController';
import { PaypalController } from '../controller/PaypalController';
class PaymentRoutes extends BaseRoutes {
	constructor() {
		// super(new PaymentController());
		super(new PaypalController());
	}
	public routes(): void {
		// this.router.get('/vn-pay', this.controller.searchMovies);
		this.router.get('/pay', this.controller.createOrder);
		this.router.post('/success', this.controller.completeOrder);
	}
}

export default new PaymentRoutes().router;
