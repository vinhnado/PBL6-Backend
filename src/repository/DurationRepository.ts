import { Service } from 'typedi';
import { BaseRepository } from './BaseRepository';
import { Duration } from '../models/Duration';

@Service()
export class DurationRepository extends BaseRepository<Duration> {
	constructor() {
		super(Duration);
	}
}
