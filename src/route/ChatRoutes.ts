import BaseRoutes from './Base/BaseRouter';
import { auth } from '../middleware/AuthMiddleware';
import { validate } from '../validators/Validator';
import { ChatController } from '../controller/ChatController';
class ChatRoutes extends BaseRoutes {
	constructor() {
		super(new ChatController());
	}
	public routes(): void {
		this.router.post('/', this.controller.chat);

	}
}

export default new ChatRoutes().router;
