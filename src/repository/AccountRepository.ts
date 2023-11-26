import Container, { Service } from 'typedi';
import { BaseRepository } from './BaseRepository';
import { Account } from '../models/Account';

@Service()
export class AccountRepository extends BaseRepository<Account> {
	constructor() {
		super(Account);
	}
}
