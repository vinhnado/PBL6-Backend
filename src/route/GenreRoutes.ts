import BaseRoutes from './Base/BaseRouter';
import { GenreController } from '../controller/GenreController';
class GenreRoutes extends BaseRoutes {
	constructor() {
		super(new GenreController());
	}
	public routes(): void {
		this.router.get('/', this.controller.getAllGenres);
	}
}

export default new GenreRoutes().router;
