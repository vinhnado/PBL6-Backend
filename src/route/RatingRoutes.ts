import BaseRoutes from './Base/BaseRouter';
import { auth } from '../middleware/AuthMiddleware';
import { validate } from '../validators/Validator';
import { RatingController } from '../controller/RatingController';
import { validateAddRating } from '../validators/RatingValidator';
class RatingRoutes extends BaseRoutes {
	constructor() {
		super(new RatingController());
	}
	public routes(): void {
		this.router.post('/create',auth,validateAddRating, validate, this.controller.addRating);
	}
}

export default new RatingRoutes().router;
