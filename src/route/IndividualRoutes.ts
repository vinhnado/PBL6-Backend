import { HomeController } from '../controller/HomeController';
import { IndividualController } from '../controller/IndividualController';
import BaseRoutes from './Base/BaseRouter';
class IndividualRoutes extends BaseRoutes {
	constructor() {
		super(new IndividualController());
	}
	public routes(): void {
		this.router.get('/actor/find-all', this.controller.findAllMovieByActorId);
	}
}

export default new IndividualRoutes().router;
