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
		this.router.get('/getRevenue',validateStatistical, validate, this.controller.getRevenueStatistics);
	}
}

export default new StatisticalRoutes().router;
