import { Service } from 'typedi';
import { BaseRepository } from './BaseRepository';
import { SubscriptionType } from '../models/SubscriptionType';

@Service()
export class SubcriptionTypeRepository extends BaseRepository<SubscriptionType> {
	constructor() {
		super(SubscriptionType);
	}
}
