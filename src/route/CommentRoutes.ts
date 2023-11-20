import BaseRoutes from './Base/BaseRouter';
import { CommentController } from '../controller/CommentController';
import { auth } from '../middleware/AuthMiddleware';
import { validateAddComment, validateDeleteComment, validateUpdateComment } from '../validators/CommentValidator';
import { validate } from '../validators/Validator';
class CommentRoutes extends BaseRoutes {
	constructor() {
		super(new CommentController());
	}
	public routes(): void {
		this.router.post('/create',auth, validateAddComment, validate, this.controller.addComment);
		this.router.delete('/delete/:commentId', auth, validateDeleteComment, validate, this.controller.deleteComment);
		this.router.put('/edit/:commentId', auth, validateUpdateComment, validate, this.controller.updateComment);
	}
}

export default new CommentRoutes().router;
