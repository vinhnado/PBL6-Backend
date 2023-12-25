import { IndividualController } from '../controller/IndividualController';
import { authAdmin } from '../middleware/AuthMiddleware';
import { validateCreateActor, validateDeleteActor, validateGetActorDetails, validateGetActors, validateUpdateActor,validateGetPresignUrlActor } from '../validators/ActorValidator';
import { validateCreateDirector, validateDeleteDirector, validateGetDirectorDetails, validateGetDirectors, validateUpdateDirector,validateGetPresignUrlDirector } from '../validators/DirectorValidate';
import { validate } from '../validators/Validator';
import BaseRoutes from './Base/BaseRouter';
class IndividualRoutes extends BaseRoutes {
	constructor() {
		super(new IndividualController());
	}
	public routes(): void {
		// this.router.get('/actor', this.controller.findActorInfomation);
		this.router.delete('/actors/:actorId',authAdmin, validateDeleteActor, validate, this.controller.deleteActor);
		this.router.get('/actors/:actorId',authAdmin, validateGetActorDetails,validate, this.controller.getActorDetails);
		this.router.get('/actors',authAdmin, validateGetActors, validate, this.controller.getActors);
		this.router.put('/actors/:actorId',authAdmin, validateUpdateActor, validate, this.controller.updateActor);
		this.router.post('/actors',authAdmin, validateCreateActor, validate ,this.controller.createActor);
		this.router.get('/actors/get-presign-url/avatar',authAdmin, validateGetPresignUrlActor, validate, this.controller.getPresignUrlToUploadAvatarActor);
		
		this.router.get('/directors',authAdmin,  validateGetDirectors, validate, this.controller.getDirectors);
		this.router.delete('/directors/:directorId',authAdmin, validateDeleteDirector, validate, this.controller.deleteDirector);
		this.router.get('/directors/:directorId',authAdmin, validateGetDirectorDetails, validate, this.controller.getDirectorDetails);
		this.router.put('/directors/:directorId',authAdmin, validateUpdateDirector, validate, this.controller.updateDirector);
		this.router.post('/directors',authAdmin, validateCreateDirector, validate, this.controller.createDirector);
		this.router.get('/directors/get-presign-url/avatar',authAdmin, validateGetPresignUrlDirector, validate, this.controller.getPresignUrlToUploadAvatarDirector);

	}
}

export default new IndividualRoutes().router;
