import BaseRoutes from './Base/BaseRouter';
import { GenreController } from '../controller/GenreController';
import { validateCreateGenre, validateDeleteGenre, validateUpdateGenre } from '../validators/GenreValidator';
import { validate } from '../validators/Validator';
import { authAdmin } from '../middleware/AuthMiddleware';
class GenreRoutes extends BaseRoutes {
	constructor() {
		super(new GenreController());
	}
	public routes(): void {
		this.router.get('/', this.controller.getAllGenres);
		this.router.post('/',authAdmin, validateCreateGenre, validate, this.controller.createGenre);
		this.router.put('/:genreId',authAdmin, validateUpdateGenre, validate, this.controller.updateGenre);
		this.router.delete('/:genreId',authAdmin, validateDeleteGenre, validate, this.controller.deleteGenre);
	}
}

export default new GenreRoutes().router;
