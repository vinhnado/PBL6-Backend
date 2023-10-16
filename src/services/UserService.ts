import { User } from '../models/User';
import { MovieFavorite } from '../models/MovieFavorite';
import { WatchList } from '../models/WatchList';
import { WatchHistory } from '../models/WatchHistory';
import Container, { Inject, Service } from 'typedi';
import { UserRepository } from '../repository/UserRepository';
import { IUserRepository } from '../repository/Interfaces/IUserRepository';
import { inject, injectable } from 'inversify';

@Service()
export class UserService {
	@Inject('UserRepository')
	private userRepository!: IUserRepository;

	async findOneUser(searchConditions: any): Promise<User> {
		try {
			return this.userRepository.findOneUser(searchConditions);
		} catch (err: any) {
			throw new Error(err.message);
		}
	}

	async searchUsers(
		searchConditions: any,
		page: number,
		pageSize: number
	): Promise<User[]> {
		try {
			console.log(this.userRepository);
			return this.userRepository.searchUsers(searchConditions, page, pageSize);
		} catch (err: any) {
			throw new Error(err.message);
		}
	}
}
