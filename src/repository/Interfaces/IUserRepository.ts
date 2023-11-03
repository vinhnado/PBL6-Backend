import { Account } from '../../models/Account';
import { Subcription } from '../../models/Subcription';
import { User } from '../../models/User';
import { BaseInterface } from './BaseInterface';

export interface IUserRepository extends BaseInterface {
	getAllFavoriteMovie(userId: number, page: number, pageSize: number): unknown;
	findOneUser(searchConditions: any): Promise<User>;
	searchUsers(
		searchConditions: any,
		page: number,
		pageSize: number
	): Promise<User[]>;
	createNewUser(
		newUser: User,
		newAccount: Account,
		newSubcription: Subcription
	): Promise<void>;
}
