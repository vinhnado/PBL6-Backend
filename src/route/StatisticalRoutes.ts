import BaseRoutes from './Base/BaseRouter';
import { auth } from '../middleware/AuthMiddleware';
import { validate } from '../validators/Validator';
import { StatisticalController } from '../controller/StatisticalController';
import { validateStatistical } from '../validators/StatisticalValidator';
class StatisticalRoutes extends BaseRoutes {
	constructor() {
		super(new StatisticalController());
	}
	public routes(): void {
		this.router.get('/revenues',validateStatistical, validate, this.controller.getRevenueStatistics);
		this.router.get('/movies-by-genres', this.controller.getStatisticsMoviesByGenres);
		this.router.get('/comments', this.controller.getStatisticsComments);
	}
}

export default new StatisticalRoutes().router;

