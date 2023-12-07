import { AuthenticationController } from '../controller/AuthenticationController';
import { auth, authRoot } from '../middleware/AuthMiddleware';
import BaseRoutes from './Base/BaseRouter';

class AuthenticationRoutes extends BaseRoutes {
	constructor() {
		super(new AuthenticationController());
	}
	routes(): void {
		this.router.post('/login', this.controller.login);
		this.router.post('/register', this.controller.register);
		this.router.post(
			'/register-admin',
			auth,
			authRoot,
			this.controller.registerAdmin
		);
		this.router.post('/forgot-password', this.controller.forgotPassword);
		this.router.post('/active-user', this.controller.activeUser);
	}
}

export default new AuthenticationRoutes().router;
