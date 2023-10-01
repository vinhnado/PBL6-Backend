import BaseRoutes from '../Base/BaseRouter';
import AuthenticationController from './AuthenticationController';

class AuthenticationRoutes extends BaseRoutes {
	routes(): void {
		this.router.post('/login', AuthenticationController.login);
		this.router.post('/register', AuthenticationController.register);
	}
}

export default new AuthenticationRoutes().router;
