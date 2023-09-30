import BaseRoutes from '..//Base/BaseRouter';
import MovieController from './MovieController';
class MovieRoutes extends BaseRoutes {
	public routes(): void {
		this.router.get('/', MovieController.searchMovies);
		this.router.get('/:id', MovieController.getMovieById);
		this.router.get('/movies', MovieController.getAllMovies);
		this.router.delete('/movies/:id', MovieController.deleteMovieById);
	}
}

export default new MovieRoutes().router;
