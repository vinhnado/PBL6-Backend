import { User } from '../../models/User';
import { BaseInterface } from './BaseInterface';

export interface IUserRepository extends BaseInterface {
	findOneUser(searchConditions: any): Promise<User>;
	searchUsers(
		searchConditions: any,
		page: number,
		pageSize: number
	): Promise<User[]>;
}
