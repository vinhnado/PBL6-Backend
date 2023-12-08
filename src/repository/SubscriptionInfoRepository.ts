import { Service } from 'typedi';
import { BaseRepository } from './BaseRepository';
import { SubscriptionInfo } from '../models/SubscriptionInfo';
import { SubscriptionType } from '../models/SubscriptionType';
import { Duration } from '../models/Duration';

@Service()
export class SubscriptionInfoRepository extends BaseRepository<SubscriptionInfo> {
	constructor() {
		super(SubscriptionInfo);
	}

	getSubscriptionInfoById = async (id: number) => {
		try {
			let data = await SubscriptionInfo.findOne({
				where: { subscription_info_id: id },
				attributes: ['subscriptionInfoId', 'discount'],
				include: [
					{
						model: SubscriptionType,
						attributes: {
							exclude: ['createdAt', 'updatedAt', 'deletedAt'],
						},
					},
					{
						model: Duration,
						attributes: {
							exclude: ['createdAt', 'updatedAt', 'deletedAt'],
						},
					},
				],
				order: ['subscriptionInfoId', 'ASC'],
			});
			return data;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getAllSubscriptionInfo = async () => {
		try {
			let data = await SubscriptionInfo.findAll({
				attributes: ['subscriptionInfoId', 'discount'],
				include: [
					{
						model: SubscriptionType,
						attributes: {
							exclude: ['createdAt', 'updatedAt', 'deletedAt'],
						},
					},
					{
						model: Duration,
						attributes: {
							exclude: ['createdAt', 'updatedAt', 'deletedAt'],
						},
					},
				],
				order: [['subscriptionInfoId', 'ASC']],
			});
			return data;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
