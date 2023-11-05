import { Service } from 'typedi';
import { BaseRepository } from './BaseRepository';
import { Subscription } from '../models/Subscription';

@Service()
export class SubcriptionRepository extends BaseRepository<Subscription> {
	constructor() {
		super(Subscription);
	}
}
