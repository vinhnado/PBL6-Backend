import BaseRoutes from './Base/BaseRouter';
import { EpisodeController } from '../controller/EpisodeController';
class EpisodeRoutes extends BaseRoutes {
	constructor() {
		super(new EpisodeController());
	}
	public routes(): void {
		this.router.get('/:id', this.controller.getEpisode);
	}
}

export default new EpisodeRoutes().router;
