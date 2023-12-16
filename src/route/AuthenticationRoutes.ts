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
		this.router.get('/valid-register', this.controller.validRegister);
		this.router.post('/forgot-password', this.controller.forgotPassword);
		this.router.post('/change-password', auth, this.controller.changePassword);
		this.router.post('/active-user', this.controller.activeUser);
		this.router.post('/get-access-token', this.controller.getAccessToken);
		this.router.post(
			'/register-admin',
			auth,
			authRoot,
			this.controller.registerAdmin
		);
	}
}

export default new AuthenticationRoutes().router;
