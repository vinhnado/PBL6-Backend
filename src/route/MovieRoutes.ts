import BaseRoutes from './Base/BaseRouter';
import { MovieController } from '../controller/MovieController';
class MovieRoutes extends BaseRoutes {
	constructor() {
		super(new MovieController());
	}
	public routes(): void {
		this.router.get('/', this.controller.searchMovies);
		this.router.get('/all', this.controller.getAllMovies);
		this.router.delete('/movies/:id', this.controller.deleteMovieById);
	}
}

export default new MovieRoutes().router;
