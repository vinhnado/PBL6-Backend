import BaseRoutes from './Base/BaseRouter';
import { MovieController } from '../controller/MovieController';
import { PaymentController } from '../controller/PaymentController';
class PaymentRoutes extends BaseRoutes {
	constructor() {
		super(new PaymentController());
	}
	public routes(): void {
		this.router.get('/vn-pay', this.controller.searchMovies);
	}
}

export default new PaymentRoutes().router;
