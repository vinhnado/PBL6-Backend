import { UserController } from '../controller/UserController';
import { auth } from '../middleware/AuthMiddleware';
import BaseRoutes from '../route/Base/BaseRouter';
class UserRoutes extends BaseRoutes {
	constructor() {
		super(new UserController());
	}

	public routes(): void {
		this.router.get('/get-all-users', this.controller.searchUsers);
		this.router.get('/get-user', this.controller.getUser);
		this.router.get('/get-self-infomation', auth, this.controller.getUser);
		this.router.get(
			'/add-favorite-movie',
			auth,
			this.controller.addFavoriteMovie
		);
		this.router.get(
			'/get-favorite-movie-list',
			auth,
			this.controller.getFavoriteMovieList
		);
		this.router.get('/add-watch-list', auth, this.controller.addWatchList);
		this.router.get(
			'/get-watch-movie-list',
			auth,
			this.controller.getAllWatchList
		);
		this.router.get(
			'/add-movie-history',
			auth,
			this.controller.addWatchHistory
		);
		this.router.get(
			'/get-history-movie-list',
			auth,
			this.controller.getAllWatchHistory
		);
	}
}

export default new UserRoutes().router;
