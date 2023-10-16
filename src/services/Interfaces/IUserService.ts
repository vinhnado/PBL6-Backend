import { User } from '../../models/User';

export interface IUserService {
	findOneUser(searchConditions: any): Promise<User>;
	searchUsers(
		searchConditions: any,
		page: number,
		pageSize: number
	): Promise<User[]>;
	addFavoriteMovie(userId: number, movieId: number): Promise<void>;
	addWatchHistory(
		userId: number,
		movieId: number,
		duration: number
	): Promise<void>;
	addWatchList(userId: number, movieId: number): Promise<void>;
}
