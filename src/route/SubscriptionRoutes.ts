import { SubcriptionController } from '../controller/SubcriptionController';
import BaseRoutes from './Base/BaseRouter';
class SubscriptionRoutes extends BaseRoutes {
	constructor() {
		super(new SubcriptionController());
	}
	public routes(): void {
		this.router.put('/update-subscription', this.controller.updateSubscription);
		this.router.post(
			'/create-subscription-type',
			this.controller.createSubscriptionType
		);
		this.router.put(
			'/create-subscription-type',
			this.controller.updateSubscriptionType
		);
		this.router.get(
			'/get-all-subscription-type',
			this.controller.getAllSubscriptionType
		);
	}
}

export default new SubscriptionRoutes().router;
