import BaseRoutes from './Base/BaseRouter';
import { GenreController } from '../controller/GenreController';
import { validateCreateGenre, validateDeleteGenre, validateUpdateGenre } from '../validators/GenreValidator';
import { validate } from '../validators/Validator';
class GenreRoutes extends BaseRoutes {
	constructor() {
		super(new GenreController());
	}
	public routes(): void {
		this.router.get('/', this.controller.getAllGenres);
		this.router.post('/', validateCreateGenre, validate, this.controller.createGenre);
		this.router.put('/', validateUpdateGenre, validate, this.controller.updateGenre);
		this.router.delete('/', validateDeleteGenre, validate, this.controller.deleteGenre);
	}
}

export default new GenreRoutes().router;
