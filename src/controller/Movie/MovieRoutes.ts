import BaseRoutes from '..//Base/BaseRouter';
import MovieController from './MovieController';
class MovieRoutes extends BaseRoutes {
	public routes(): void {
		this.router.get('/movies', MovieController.getMovies);
		this.router.get('/movies/:id', MovieController.getMovieById);
		this.router.get('/movies/genre/:genre', MovieController.getMovieByGenres);
	}
}

export default new MovieRoutes().router;
