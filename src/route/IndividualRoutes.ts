import { HomeController } from '../controller/HomeController';
import { IndividualController } from '../controller/IndividualController';
import BaseRoutes from './Base/BaseRouter';
class IndividualRoutes extends BaseRoutes {
	constructor() {
		super(new IndividualController());
	}
	public routes(): void {
		this.router.get('/actor', this.controller.findActorInfomation);
		this.router.post(
			'/actor/createOrUpdate',
			this.controller.createOrUpdateActor
		);
		this.router.get('/actor/get-all', this.controller.findActorInfomation);
		this.router.get('/actor/search', this.controller.findActorInfomation);
		this.router.get('/actor/delete', this.controller.findActorInfomation);

		this.router.get('/director', this.controller.findActorInfomation);
		this.router.post(
			'/director/createOrUpdate',
			this.controller.createOrUpdateActor
		);
		this.router.get('/director/get-all', this.controller.findActorInfomation);
		this.router.get('/director/search', this.controller.findActorInfomation);
		this.router.get('/director/delete', this.controller.findActorInfomation);
	}
}

export default new IndividualRoutes().router;
