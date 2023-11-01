import { HomeController } from '../controller/HomeController';
import { IndividualController } from '../controller/IndividualController';
import BaseRoutes from './Base/BaseRouter';
class IndividualRoutes extends BaseRoutes {
	constructor() {
		super(new IndividualController());
	}
	public routes(): void {
		this.router.get('/actor', this.controller.findActorInfomation);
		this.router.delete('/actor', this.controller.deleteActor);
		this.router.post(
			'/actor/createOrUpdate',
			this.controller.createOrUpdateActor
		);
		this.router.get('/actor/get-all', this.controller.getAllActor);
		this.router.get('/actor/search', this.controller.searchActor);

		this.router.get('/director', this.controller.findDirectortorInfomation);
		this.router.delete('/director', this.controller.deleteDirector);
		this.router.post(
			'/director/createOrUpdate',
			this.controller.createOrUpdateDirector
		);
		this.router.get('/director/get-all', this.controller.getAllDirector);
		this.router.get('/director/search', this.controller.searchDirector);
		this.router.delete('/director', this.controller.deleteDirector);
	}
}

export default new IndividualRoutes().router;
