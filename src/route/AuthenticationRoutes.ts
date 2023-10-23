import { AuthenticationController } from '../controller/AuthenticationController';
import BaseRoutes from './Base/BaseRouter';

class AuthenticationRoutes extends BaseRoutes {
	constructor() {
		super(new AuthenticationController());
	}
	routes(): void {
		this.router.post('/login', this.controller.login);
		this.router.post('/register', this.controller.register);
	}
}

export default new AuthenticationRoutes().router;
