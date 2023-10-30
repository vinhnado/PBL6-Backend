import { HomeController } from '../controller/HomeController';
import BaseRoutes from './Base/BaseRouter';
class HomeRoutes extends BaseRoutes {
	constructor() {
		super(new HomeController());
	}
	public routes(): void {
		this.router.get('/', this.controller.getMoviesByGenre);
	}
}

export default new HomeRoutes().router;
