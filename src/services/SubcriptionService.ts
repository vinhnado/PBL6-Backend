import { UserRepository } from './../repository/UserRepository';
import { Inject, Service } from 'typedi';
import { SubcriptionRepository } from '../repository/SubcriptiionRepository';
import { Subcription } from '../models/Subcription';
import { SubcriptionTypeRepository } from '../repository/SubcriptionTypeRepository';
import { SubcriptionType } from '../models/SubcriptionType';

@Service()
export class SubcriptionService {
	@Inject(() => SubcriptionRepository)
	private subcriptionRepository!: SubcriptionRepository;

	@Inject(() => SubcriptionTypeRepository)
	private subcriptionTypeRepository!: SubcriptionTypeRepository;

	@Inject(() => UserRepository)
	private userRepository!: UserRepository;

	// createOrUpdate = async();

	createOrUpdateSubscription = async (
		userId: number,
		closedAt: Date,
		subscriptionTypeId: number | null = null
	) => {
		try {
			if (userId !== null) {
				const subcriptionToUpdate = await this.userRepository.findById(userId);
				console.log(subcriptionToUpdate);
				if (subcriptionToUpdate) {
					await subcriptionToUpdate.update({
						subscriptionTypeId: subscriptionTypeId,
						closedAt: closedAt,
					});
					return await this.subcriptionRepository.save(subcriptionToUpdate);
				} else {
					throw new Error('Actor not found for the given ID');
				}
			} else {
				return await this.subcriptionRepository.save(Subcription.build({}));
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
					await this.subcriptionTypeRepository.findById(subcriptionTypeId);
				await subcriptionTypeToUpdate.update({ name: name });
				return await this.subcriptionTypeRepository.save(
					subcriptionTypeToUpdate
				);
			} else {
				return await this.subcriptionTypeRepository.save(
					SubcriptionType.build({ name: name })
				);
			}
		} catch (error: any) {
			throw new Error(
				'Lỗi khi tạo hoặc cập nhật gói dịch vụ: ' + error.message
			);
		}
	};
}
