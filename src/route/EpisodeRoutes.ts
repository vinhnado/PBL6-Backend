import BaseRoutes from './Base/BaseRouter';
import { EpisodeController } from '../controller/EpisodeController';
import { validateCreateEpisode, validateDeleteEpisodeById, validateGetEpisodeById, validateGetPresignURL, validateUpdateEpisode } from '../validators/EpisodeValidator';
import { validate } from '../validators/Validator';
class EpisodeRoutes extends BaseRoutes {
	constructor() {
		super(new EpisodeController());
	}
	public routes(): void {
		this.router.get('/:id', validateGetEpisodeById, validate, this.controller.getEpisode);
		this.router.get('/:id/comments', this.controller.getCommentsOfEpisode);
		this.router.post('/create', validateCreateEpisode, validate, this.controller.createEpisode);
		this.router.put('/update/:episodeId', validateUpdateEpisode, validate, this.controller.updateEpisode);
		this.router.delete('/delete/:episodeId',validateDeleteEpisodeById, validate, this.controller.deleteEpisode);
		this.router.get('/presignURL/upload', validateGetPresignURL, validate, this.controller.getPresignUrlToUploadPosterAndMovie);
	}
}

export default new EpisodeRoutes().router;
