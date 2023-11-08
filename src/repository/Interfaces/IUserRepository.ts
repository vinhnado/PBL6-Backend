import { Account } from '../../models/Account';
import { Subscription } from '../../models/Subscription';
import { User } from '../../models/User';
import { BaseInterface } from './BaseInterface';

export interface IUserRepository extends BaseInterface {
	findOneUser(searchConditions: any): Promise<User>;
	searchUsers(
		searchConditions: any,
		page: number,
		pageSize: number
	): Promise<User[]>;
	createNewUser(
		newUser: User,
		newAccount: Account,
		newSubscription: Subscription
	): Promise<void>;
}
