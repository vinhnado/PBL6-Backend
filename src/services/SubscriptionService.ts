import { UserRepository } from '../repository/UserRepository';
import { Inject, Service } from 'typedi';
import { Subscription } from '../models/Subscription';
import { SubscriptionType } from '../models/SubscriptionType';
import { SubscriptionRepository } from '../repository/SubscriptionRepository';
import { SubscriptionTypeRepository } from '../repository/SubscriptionTypeRepository';

@Service()
export class SubscriptionService {
	@Inject(() => SubscriptionRepository)
	private subscriptionRepository!: SubscriptionRepository;

	@Inject(() => SubscriptionTypeRepository)
	private subscriptionTypeRepository!: SubscriptionTypeRepository;

	@Inject(() => UserRepository)
	private userRepository!: UserRepository;

	updateSubscription = async (
		userId: number,
		closedAt: Date | null,
		subscriptionTypeId: number | null = null
	) => {
		try {
			const updateData: { [key: string]: any } = {};

			if (subscriptionTypeId !== null) {
				updateData.subscriptionTypeId = subscriptionTypeId;
			}

			if (closedAt !== null) {
				updateData.closedAt = closedAt;
			}
			const subcriptionToUpdate = await this.userRepository.findById(userId);
			if (subcriptionToUpdate) {
				await subcriptionToUpdate.update({
					updateData,
				});
				return await this.subscriptionRepository.save(subcriptionToUpdate);
			} else {
				throw new Error('UserId not found for the given ID');
			}
		} catch (error: any) {
			throw new Error(
				'Lỗi khi tạo hoặc cập nhật gói dịch vụ: ' + error.message
			);
		}
	};

	createOrUpdateSubscriptionType = async (
		name: string,
		subcriptionTypeId: number | null = null
	) => {
		try {
			if (subcriptionTypeId !== null) {
				const subcriptionTypeToUpdate =
					await this.subscriptionTypeRepository.findById(subcriptionTypeId);
				await subcriptionTypeToUpdate.update({ name: name });
				return await this.subscriptionTypeRepository.save(
					subcriptionTypeToUpdate
				);
			} else {
				return await this.subscriptionTypeRepository.save(
					SubscriptionType.build({ name: name })
				);
			}
		} catch (error: any) {
			throw new Error(
				'Lỗi khi tạo hoặc cập nhật gói dịch vụ: ' + error.message
			);
		}
	};

	getAllSupcriptionType = async () => {
		try {
			return await this.subscriptionTypeRepository.findMany();
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	deleteSupcriptionType = async (subcriptionTypeId: number) => {
		try {
			return await this.subscriptionTypeRepository.delete(
				await this.subscriptionTypeRepository.findById(subcriptionTypeId)
			);
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
