import { SubscriptionInfo } from './../models/SubscriptionInfo';
import { Subscription } from './../models/Subscription';
import { UserRepository } from '../repository/UserRepository';
import { Inject, Service } from 'typedi';
import { SubscriptionType } from '../models/SubscriptionType';
import { SubscriptionRepository } from '../repository/SubscriptionRepository';
import { SubscriptionTypeRepository } from '../repository/SubscriptionTypeRepository';
import { addMonths } from 'date-fns';
import { SubscriptionInfoRepository } from '../repository/SubscriptionInfoRepository';

@Service()
export class SubscriptionService {
	@Inject(() => SubscriptionRepository)
	private subscriptionRepository!: SubscriptionRepository;

	@Inject(() => SubscriptionTypeRepository)
	private subscriptionTypeRepository!: SubscriptionTypeRepository;

	@Inject(() => SubscriptionInfoRepository)
	private subscriptionInfoRepository!: SubscriptionInfoRepository;

	@Inject(() => UserRepository)
	private userRepository!: UserRepository;

	updateSubscription = async (
		userId: number,
		closeAt: Date | null = null,
		subscriptionTypeId: number | null = null,
		subscriptionInfoId: number | null = null
	) => {
		try {
			const user = await this.userRepository.findOneUser({
				userId: userId,
			});
			if (user) {
				let subscription = user.subscription;
				if (subscriptionInfoId !== null) {
					const subcriptionInfo =
						await this.subscriptionInfoRepository.getSubscriptionInfoById(
							subscriptionInfoId
						);
					if (!subcriptionInfo) {
						throw new Error('subscriptionInfoId not found for the given ID');
					}
					if (subscription.closeAt > new Date()) {
						subscription.closeAt = addMonths(
							subscription.closeAt,
							subcriptionInfo!.duration.time
						);
					} else {
						subscription.closeAt = addMonths(
							new Date(),
							subcriptionInfo!.duration.time
						);
					}
					subscription.subscriptionTypeId =
						subcriptionInfo.subscriptionType.subscriptionTypeId;
				} else {
					if (subscriptionTypeId !== null) {
						subscription.subscriptionTypeId = subscriptionTypeId;
					}

					if (closeAt !== null) {
						subscription.closeAt = closeAt;
					}
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
		name: string | null = null,
		price: number | null = null,
		subcriptionTypeId: number | null = null
	) => {
		try {
			if (subcriptionTypeId !== null) {
				const subcriptionTypeToUpdate =
					await this.subscriptionTypeRepository.findById(subcriptionTypeId);
				if (name !== null) {
					await subcriptionTypeToUpdate.update({ name: name });
				}
				if (price !== null) {
					await subcriptionTypeToUpdate.update({ price: price });
				}
				return await this.subscriptionTypeRepository.save(
					subcriptionTypeToUpdate
				);
			} else {
				return await this.subscriptionTypeRepository.save(
					SubscriptionType.build({ name: name, price: price })
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

	createOrUpdateSubscriptionInfo = async (
		subscriptionTypeId: number | null = null,
		durationId: number | null = null,
		discount: number | null = null,
		subscriptionInfoId: number | null = null
	) => {
		try {
			if (subscriptionInfoId !== null) {
				const subcriptionInfoToUpdate =
					await this.subscriptionInfoRepository.findById(subscriptionInfoId);
				if (subscriptionTypeId !== null) {
					await subcriptionInfoToUpdate.update({
						subscriptionTypeId: subscriptionTypeId,
					});
				}
				if (durationId !== null) {
					await subcriptionInfoToUpdate.update({ durationId: durationId });
				}
				if (discount !== null) {
					await subcriptionInfoToUpdate.update({ discount: discount });
				}
				return await this.subscriptionInfoRepository.save(
					subcriptionInfoToUpdate
				);
			} else {
				return await this.subscriptionInfoRepository.save(
					SubscriptionInfo.build({
						subscriptionTypeId: subscriptionTypeId,
						durationId: durationId,
						discount: discount,
					})
				);
			}
		} catch (error: any) {
			throw new Error(
				'Lỗi khi tạo hoặc cập nhật gói thông tin dịch vụ: ' + error.message
			);
		}
	};

	getAllSubscriptionInfo = async () => {
		try {
			return await this.subscriptionInfoRepository.getAllSubscriptionInfo();
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getSubscriptionInfoById = async (id: number) => {
		try {
			return await this.subscriptionInfoRepository.getSubscriptionInfoById(id);
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getPriceBySubscriptionInfoId = async (id: number) => {
		try {
			const subscriptionInfo =
				await this.subscriptionInfoRepository.getSubscriptionInfoById(id);
			const price =
				subscriptionInfo!.subscriptionType.price *
				(1 - subscriptionInfo!.discount);
			return price;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	deleteSupscriptionInfo = async (subscriptionInfoId: number) => {
		try {
			return await this.subscriptionInfoRepository.delete(
				await this.subscriptionInfoRepository.findById(subscriptionInfoId)
			);
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
