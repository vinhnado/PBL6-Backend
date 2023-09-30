import BaseRoutes from '..//Base/BaseRouter';
import UserController from './UserController';
class UserRoutes extends BaseRoutes {
	public routes(): void {
		// this.router.get('/', UserController.searchMovies);
		// this.router.get('/:id', UserController.getMovieById);
	}
}

export default new UserRoutes().router;
