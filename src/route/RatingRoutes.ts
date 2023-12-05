import BaseRoutes from './Base/BaseRouter';
import { auth } from '../middleware/AuthMiddleware';
import { validate } from '../validators/Validator';
import { RatingController } from '../controller/RatingController';
class RatingRoutes extends BaseRoutes {
	constructor() {
		super(new RatingController());
	}
	public routes(): void {
		this.router.post('/create',auth, this.controller.addRating);
	}
}

export default new RatingRoutes().router;
