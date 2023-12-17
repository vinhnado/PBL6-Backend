import BaseRoutes from './Base/BaseRouter';
import { auth } from '../middleware/AuthMiddleware';
import { validate } from '../validators/Validator';
import { RatingController } from '../controller/RatingController';
import { validateAddRating, validateDeleteRating, validateUpdateRating } from '../validators/RatingValidator';
class RatingRoutes extends BaseRoutes {
	constructor() {
		super(new RatingController());
	}
	public routes(): void {
		this.router.post('/create',auth,validateAddRating, validate, this.controller.addRating);
		this.router.put('/',validateUpdateRating, validate, this.controller.updateRating);
		this.router.delete('/',validateDeleteRating, validate, this.controller.deleteRating);
	}
}

export default new RatingRoutes().router;
