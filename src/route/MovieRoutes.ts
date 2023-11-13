import BaseRoutes from './Base/BaseRouter';
import { MovieController } from '../controller/MovieController';
import { validateSearchMovies } from '../validators/MovieValidator';
import { validate } from '../validators/Validator';
class MovieRoutes extends BaseRoutes {
	constructor() {
		super(new MovieController());
	}
	public routes(): void {
		this.router.get('/', validateSearchMovies, validate, this.controller.searchMovies);
		this.router.get('/:id', this.controller.getMovieById);
		this.router.get('/all', this.controller.getAllMovies);
		this.router.get('/home/trending', this.controller.getMoviesTrending);
		this.router.get('/home/recommender', this.controller.getMoviesRecommender);
		this.router.get('/home/upcoming', this.controller.getMoviesUpcoming);
		this.router.get('/home/vip', this.controller.getMoviesForVip);
		this.router.delete('/', this.controller.deleteMovieById);
		this.router.post('/create', this.controller.createMovie);

	}
}

export default new MovieRoutes().router;
