import { Service } from 'typedi';
import { BaseRepository } from './BaseRepository';
import { SubcriptionType } from '../models/SubcriptionType';

@Service()
export class SubcriptionTypeRepository extends BaseRepository<SubcriptionType> {
	constructor() {
		super(SubcriptionType);
	}
}
