import { SubscriptionController } from '../controller/SubscriptionController';
import BaseRoutes from './Base/BaseRouter';
class SubscriptionRoutes extends BaseRoutes {
	constructor() {
		super(new SubscriptionController());
	}
	public routes(): void {
		this.router.put('/update-subscription', this.controller.updateSubscription);
		this.router.post(
			'/create-subscription-type',
			this.controller.createSubscriptionType
		);
		this.router.put(
			'/update-subscription-type',
			this.controller.updateSubscriptionType
		);
		this.router.get(
			'/get-all-subscription-type',
			this.controller.getAllSubscriptionType
		);
		this.router.delete(
			'/delete-subscription-type',
			this.controller.deleteSubscriptionType
		);
	}
}

export default new SubscriptionRoutes().router;
