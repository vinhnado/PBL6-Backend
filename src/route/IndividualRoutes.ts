import { IndividualController } from '../controller/IndividualController';
import { auth, authAdmin } from '../middleware/AuthMiddleware';
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
		this.router.delete('/actors/:actorId',auth, authAdmin, validateDeleteActor, validate, this.controller.deleteActor);
		this.router.get('/actors/:actorId',auth, authAdmin, validateGetActorDetails,validate, this.controller.getActorDetails);
		this.router.get('/actors',auth, authAdmin, validateGetActors, validate, this.controller.getActors);
		this.router.put('/actors/:actorId',auth, authAdmin, validateUpdateActor, validate, this.controller.updateActor);
		this.router.post('/actors',auth, authAdmin, validateCreateActor, validate ,this.controller.createActor);
		this.router.get('/actors/get-presign-url/avatar',auth, authAdmin, validateGetPresignUrlActor, validate, this.controller.getPresignUrlToUploadAvatarActor);
		
		this.router.get('/directors',auth, authAdmin,  validateGetDirectors, validate, this.controller.getDirectors);
		this.router.delete('/directors/:directorId',auth, authAdmin, validateDeleteDirector, validate, this.controller.deleteDirector);
		this.router.get('/directors/:directorId',auth, authAdmin, validateGetDirectorDetails, validate, this.controller.getDirectorDetails);
		this.router.put('/directors/:directorId',auth, authAdmin, validateUpdateDirector, validate, this.controller.updateDirector);
		this.router.post('/directors',auth, authAdmin, validateCreateDirector, validate, this.controller.createDirector);
		this.router.get('/directors/get-presign-url/avatar',auth, authAdmin, validateGetPresignUrlDirector, validate, this.controller.getPresignUrlToUploadAvatarDirector);

	}
}

export default new IndividualRoutes().router;
