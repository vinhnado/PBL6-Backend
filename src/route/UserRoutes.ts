import { UserController } from '../controller/UserController';
import { auth } from '../middleware/AuthMiddleware';
import BaseRoutes from '../route/Base/BaseRouter';
import Container from 'typedi';
class UserRoutes extends BaseRoutes {
	constructor() {
		super(new UserController());
	}

	public routes(): void {
		this.router.get('/get-all-users', this.controller.searchUsers);
		this.router.get('/get-user', this.controller.getUser);
	}
}

export default new UserRoutes().router;
