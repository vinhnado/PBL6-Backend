import { User } from '../models/User';
import Container, { Inject, Service } from 'typedi';
import { UserRepository } from '../repository/UserRepository';
import { IUserRepository } from '../repository/Interfaces/IUserRepository';
import { UserDTO } from '../dto/UserDTO';

@Service()
export class UserService {
	@Inject(() => UserRepository)
	private userRepository!: UserRepository;

	findOneUser = async (searchConditions: any): Promise<UserDTO> => {
		try {
			return UserDTO.userToUserDTO(
				await this.userRepository.findOneUser(searchConditions)
			);
		} catch (err: any) {
			throw new Error(err.message);
		}
	};

	searchUsers = async (
		searchConditions: any,
		page: number,
		pageSize: number
	): Promise<User[]> => {
		try {
			console.log(this.userRepository);
			return this.userRepository.searchUsers(searchConditions, page, pageSize);
		} catch (err: any) {
			throw new Error(err.message);
		}
	};

	addFavoriteMovie = async (userId: number, movieId: number) => {
		try {
			return await this.userRepository.addFavoriteMovie(userId, movieId);
		} catch (error: any) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	findAllFavoriteMovie = async (
		userId: number,
		page: number,
		pageSize: number
	) => {
		try {
			return this.userRepository.getAllFavoriteMovie(userId, page, pageSize);
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	addWatchHistory = async (
		userId: number,
		movieId: number,
		duration: number
	) => {
		try {
			return await this.userRepository.addWatchHistory(
				userId,
				movieId,
				duration
			);
		} catch (error: any) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	findAllWatchHistory = async (
		userId: number,
		page: number,
		pageSize: number
	) => {
		try {
			return this.userRepository.getAllWatchHistory(userId, page, pageSize);
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	// addWatchList = async (userId: number, movieId: number) => {
	// 	try {
	// 		return await this.userRepository.(userId, movieId);
	// 	} catch (error: any) {
	// 		console.log(error);
	// 		throw new Error(error.message);
	// 	}
	// };

	findAllWatchList = async (userId: number, page: number, pageSize: number) => {
		try {
			return this.userRepository.getAllWatchList(userId, page, pageSize);
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
