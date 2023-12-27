import { SubscriptionController } from '../controller/SubscriptionController';
import BaseRoutes from './Base/BaseRouter';
import { validateCreateSubscriptionInfo, validateCreateSubscriptionType, validateDeleteSubscriptionInfo, validateDeleteSubscriptionType, validateUpdateSubscription, validateUpdateSubscriptionInfo, validateUpdateSubscriptionType } from '../validators/SubscriptionValidator';
import { validate } from '../validators/Validator';
class SubscriptionRoutes extends BaseRoutes {
	constructor() {
		super(new SubscriptionController());
	}
	public routes(): void {
		this.router.put('/update-subscription',validateUpdateSubscription,validate, this.controller.updateSubscription);
		this.router.post(
			'/create-subscription-type',validateCreateSubscriptionType,validate,
			this.controller.createSubscriptionType
		);
		this.router.put(
			'/update-subscription-type',validateUpdateSubscriptionType,validate,
			this.controller.updateSubscriptionType
		);
		this.router.get(
			'/get-all-subscription-type',
			this.controller.getAllSubscriptionType
		);
		this.router.delete(
			'/delete-subscription-type',validateDeleteSubscriptionType,validate,
			this.controller.deleteSubscriptionType
		);
		this.router.get(
			'/get-all-subscription-info',
			this.controller.getAllSubscriptionInfo
		);
		this.router.post(
			'/create-subscription-info',validateCreateSubscriptionInfo,validate,
			this.controller.createSubscriptionInfo
		);
		this.router.put(
			'/update-subscription-info',validateUpdateSubscriptionInfo,validate,
			this.controller.updateSubscriptionInfo
		);
		this.router.delete(
			'/delete-subscription-info',validateDeleteSubscriptionInfo,validate,
			this.controller.deleteSubscriptionInfo
		);
	}
}

export default new SubscriptionRoutes().router;
