import { auth } from '../middleware/AuthMiddleware';
import BaseRoutes from '../route/Base/BaseRouter';
import UserController from '../controller/UserController';
class UserRoutes extends BaseRoutes {
	public routes(): void {
		this.router.get('/get-all-users', auth, UserController.searchUsers);
		this.router.get('/get-user', UserController.getUser);
		this.router.get(
			'/add-favorite-movie',
			auth,
			UserController.addFavoriteMovie
		);
		this.router.post('/test-save', UserController.save);
	}
}

export default new UserRoutes().router;
