import BaseRoutes from './Base/BaseRouter';
import { MovieController } from '../controller/MovieController';
import { 
	validateSearchMovies,
	validateGetMovieById,
	validateDeleteMovieById,
	validateCreateMovie,
	validateUpdateMovie,
	validategetPresignUrlToUpload
} from '../validators/MovieValidator';
import { validate } from '../validators/Validator';
import { auth, authUser } from '../middleware/AuthMiddleware';
class MovieRoutes extends BaseRoutes {
	constructor() {
		super(new MovieController());
	}
	public routes(): void {
		this.router.get('/', validateSearchMovies, validate, this.controller.searchMovies);
		this.router.get('/:id',authUser, validateGetMovieById, validate, this.controller.getMovieById);
		this.router.get('/all', this.controller.getAllMovies);
		this.router.get('/home/trending', this.controller.getMoviesTrending);
		this.router.get('/home/upcoming', this.controller.getMoviesUpcoming);
		this.router.get('/home/vip', this.controller.getMoviesForVip);
		this.router.delete('/', validateDeleteMovieById, validate, this.controller.deleteMovieById);
		this.router.post('/', validateCreateMovie, validate, this.controller.createMovie);
		this.router.put('/:id', validateUpdateMovie, validate, this.controller.updateMovie);
		this.router.get('/recommend/get',auth, this.controller.getMoviesRecommender);
		this.router.get('/get/nations', this.controller.getAllNations);
		this.router.get('/get/years', this.controller.getAllReleaseYears);
		this.router.get('/get/presign-url', validategetPresignUrlToUpload, validate, this.controller.getPresignUrlToUpload);
		this.router.post('/movie-actor', this.controller.addActorForMovie);
		this.router.delete('/movie-actor', this.controller.deleteActorOfMovie);

		this.router.post('/movie-director', this.controller.addDirectorsForMovie);
		this.router.delete('/movie-director', this.controller.deleteDirectorsOfMovie);

		this.router.post('/movie-genre', this.controller.addGenresForMovie);
		this.router.delete('/movie-genre', this.controller.deleteGenresOfMovie);
	}
}

export default new MovieRoutes().router;
