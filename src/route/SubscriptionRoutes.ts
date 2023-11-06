import { SubcriptionController } from '../controller/SubcriptionController';
import BaseRoutes from './Base/BaseRouter';
class SubscriptionRoutes extends BaseRoutes {
	constructor() {
		super(new SubcriptionController());
	}
	public routes(): void {
		this.router.put('/update-subcription', this.controller.updateSubcription);
		this.router.post(
			'/create-subcription-type',
			this.controller.createSubcriptionType
		);
		this.router.put(
			'/create-subcription-type',
			this.controller.updateSubcriptionType
		);
	}
}

export default new SubscriptionRoutes().router;
