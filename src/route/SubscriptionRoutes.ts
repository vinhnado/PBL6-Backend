import { SubscriptionController } from '../controller/SubscriptionController';
import { auth, authAdmin } from '../middleware/AuthMiddleware';
import BaseRoutes from './Base/BaseRouter';
class SubscriptionRoutes extends BaseRoutes {
	constructor() {
		super(new SubscriptionController());
	}
	public routes(): void {
		this.router.put('/update-subscription',auth,authAdmin, this.controller.updateSubscription);
		this.router.post(
			'/create-subscription-type',auth,authAdmin,
			this.controller.createSubscriptionType
		);
		this.router.put(
			'/update-subscription-type',auth,authAdmin,
			this.controller.updateSubscriptionType
		);
		this.router.get(
			'/get-all-subscription-type',
			this.controller.getAllSubscriptionType
		);
		this.router.delete(
			'/delete-subscription-type',auth,authAdmin,
			this.controller.deleteSubscriptionType
		);
		this.router.get(
			'/get-all-subscription-info',
			this.controller.getAllSubscriptionInfo
		);
		this.router.post(
			'/create-subscription-info',auth,authAdmin,
			this.controller.createSubscriptionInfo
		);
		this.router.put(
			'/update-subscription-info',auth,authAdmin,
			this.controller.updateSubscriptionInfo
		);
		this.router.delete(
			'/delete-subscription-info',auth,authAdmin,
			this.controller.deleteSubscriptionInfo
		);
	}
}

export default new SubscriptionRoutes().router;
