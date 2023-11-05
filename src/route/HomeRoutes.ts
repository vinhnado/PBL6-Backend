import { HomeController } from '../controller/HomeController';
import BaseRoutes from './Base/BaseRouter';
class HomeRoutes extends BaseRoutes {
	constructor() {
		super(new HomeController());
	}
	public routes(): void {
		this.router.get('/', this.controller.getMoviesByGenre);
		this.router.get('/posters', this.controller.getHomePoster);
	}
}

export default new HomeRoutes().router;
