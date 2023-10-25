import { User } from '../models/User';
import Container, { Inject, Service } from 'typedi';
import { UserRepository } from '../repository/UserRepository';
import { IUserRepository } from '../repository/Interfaces/IUserRepository';
import { UserDTO } from '../dto/UserDTO';
import { WatchHistoryRepository } from '../repository/WatchHistorRepository';
import { WatchLaterRepository } from '../repository/WatchLaterRepository';
import { MovieFavoriteRepository } from '../repository/MovieFavoriteRepository';
import { MovieFavorite } from '../models/MovieFavorite';

@Service()
export class UserService {
	@Inject(() => UserRepository)
	private userRepository!: UserRepository;

	@Inject(() => MovieFavoriteRepository)
	private movieFavoriteRepository!: MovieFavoriteRepository;

	@Inject(() => WatchHistoryRepository)
	private watchHistoryRepository!: WatchHistoryRepository;

	@Inject(() => WatchLaterRepository)
	private watchLaterRepository!: WatchLaterRepository;

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

	saveFavoriteMovie = async (userId: number, movieId: number) => {
		try {
			let movieFavorite = await this.movieFavoriteRepository
				.findOneByCondition({
					user_id: userId,
					movie_id: movieId,
				})
				.then(async (movieFavorite) => {
					if (movieFavorite.deleteAt != null) {
						await this.movieFavoriteRepository.delete(movieFavorite);
						return console.log('Da xoa bang soft delete');
					} else {
						await this.movieFavoriteRepository.restore(movieFavorite);
						return console.log('Da resotre');
					}
				})
				.catch((error) => {
					// Xử lý lỗi nếu có
					console.error('Lỗi: ', error);
				});
			console.log(movieFavorite);
			return await this.movieFavoriteRepository.save(
				MovieFavorite.build({ userId: userId, movieId: movieId })
			);
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
			return this.movieFavoriteRepository.findAll(userId, page, pageSize);
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
			// return await this.watchHistoryRepository.addWatchHistory(
			// 	userId,
			// 	movieId,
			// 	duration
			// );
			return null;
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
			return this.watchHistoryRepository.findAll(userId, page, pageSize);
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	addWatchList = async (userId: number, movieId: number) => {
		try {
			// return await this.watchLaterRepository.findAll(userId, movieId);
			return null;
		} catch (error: any) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	findAllWatchList = async (userId: number, page: number, pageSize: number) => {
		try {
			return this.watchLaterRepository.findAll(userId, page, pageSize);
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
