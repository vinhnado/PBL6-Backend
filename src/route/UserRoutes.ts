import { UserController } from '../controller/UserController';
import { auth, authAdmin } from '../middleware/AuthMiddleware';
import BaseRoutes from '../route/Base/BaseRouter';
class UserRoutes extends BaseRoutes {
	constructor() {
		super(new UserController());
	}

	public routes(): void {
		this.router.get('/get-all-users', this.controller.searchUsers);
		this.router.get('/get-user', this.controller.getUser);
		this.router.get('/get-self-information', auth, this.controller.getSelfInfo);
		this.router.get(
			'/update-self-information',
			auth,
			this.controller.updateSelfInfo
		);
		this.router.put('/update-user', authAdmin, this.controller.updateUser);
		this.router.post('/create-user', authAdmin, this.controller.createUser);
		this.router.delete('/delete-user', this.controller.deleteUser);

		this.router.get(
			'/get-presign-url-to-upload-avatar',
			auth,
			this.controller.getPresignUrlToUploadAvatar
		);
		this.router.get(
			'/add-favorite-movie',
			auth,
			this.controller.saveMovieFavorite
		);
		this.router.delete(
			'/delete-favorite-movie',
			auth,
			this.controller.deleteMovieFavorite
		);
		this.router.get(
			'/get-favorite-movie-list',
			auth,
			this.controller.getFavoriteMovieList
		);
		this.router.get('/add-watch-list', auth, this.controller.addWatchLater);
		this.router.delete(
			'/delete-watch-list',
			auth,
			this.controller.deleteWatchLater
		);
		this.router.get(
			'/get-watch-movie-list',
			auth,
			this.controller.getAllWatchLaterList
		);
		this.router.get(
			'/add-movie-history',
			auth,
			this.controller.saveWatchHistory
		);
		this.router.delete(
			'/delete-movie-history',
			auth,
			this.controller.deleteWatchHistory
		);
		this.router.get(
			'/get-movie-history-list',
			auth,
			this.controller.getWatchHistoryList
		);

		this.router.get(
			'/get-movie-history',
			auth,
			this.controller.getWatchHistory
		);
	}
}

export default new UserRoutes().router;
