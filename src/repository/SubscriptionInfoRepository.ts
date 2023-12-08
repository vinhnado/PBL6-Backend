import { Service } from 'typedi';
import { BaseRepository } from './BaseRepository';
import { SubscriptionInfo } from '../models/SubscriptionInfo';

@Service()
export class SubscriptionInfoRepository extends BaseRepository<SubscriptionInfo> {
	constructor() {
		super(SubscriptionInfo);
	}
}
