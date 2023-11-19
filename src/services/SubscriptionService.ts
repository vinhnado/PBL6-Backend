import { Subscription } from './../models/Subscription';
import { UserRepository } from '../repository/UserRepository';
import { Inject, Service } from 'typedi';
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
			const user = await this.userRepository.findOneUser({
				userId: userId,
			});
			if (user) {
				let subscription = user.subscription;
				if (subscriptionTypeId !== null) {
					subscription.subscriptionTypeId = subscriptionTypeId;
				}
				if (closedAt !== null) {
					subscription.closedAt = closedAt;
				}
				return await this.subscriptionRepository.save(subscription);
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

	getAllSubscriptionType = async () => {
		try {
			console.log(await this.subscriptionTypeRepository.findByCondition({}));
			return await this.subscriptionTypeRepository.findMany();
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	deleteSupscriptionType = async (subcriptionTypeId: number) => {
		try {
			return await this.subscriptionTypeRepository.delete(
				await this.subscriptionTypeRepository.findById(subcriptionTypeId)
			);
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
