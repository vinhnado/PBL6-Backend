import { IndividualController } from '../controller/IndividualController';
import BaseRoutes from './Base/BaseRouter';
class IndividualRoutes extends BaseRoutes {
	constructor() {
		super(new IndividualController());
	}
	public routes(): void {
		// this.router.get('/actor', this.controller.findActorInfomation);
		this.router.delete('/actors/:actorId', this.controller.deleteActor);
		this.router.post('/actors',this.controller.createActor);
		this.router.get('/actors/:actorId', this.controller.getActorDetails);
		this.router.get('/actors', this.controller.getActors);
		this.router.put('/actors/:actorId', this.controller.updateActor);

		this.router.get('/directors', this.controller.getDirectors);
		this.router.delete('/directors/:directorId', this.controller.deleteDirector);
		this.router.get('/directors/:directorId', this.controller.getDirectorDetails);

	}
}

export default new IndividualRoutes().router;
