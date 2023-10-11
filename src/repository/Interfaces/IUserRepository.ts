import { User } from '../../models/User';

export interface IUserRepository {
	searchUsers(
		searchConditions: {
			username?: string;
			email?: string;
			gender?: string;
		},
		page: number,
		pageSize: number
	): Promise<User[]>;
}
