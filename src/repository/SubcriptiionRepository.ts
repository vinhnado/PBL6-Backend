import { Service } from 'typedi';
import { BaseRepository } from './BaseRepository';
import { Subcription } from '../models/Subcription';

@Service()
export class SubcriptionRepository extends BaseRepository<Subcription> {
	constructor() {
		super(Subcription);
	}
}
