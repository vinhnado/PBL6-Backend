import { Movie } from './../models/Movie';
import { User } from '../models/User';
import Container, { Inject, Service } from 'typedi';
import { UserRepository } from '../repository/UserRepository';
import { IUserRepository } from '../repository/Interfaces/IUserRepository';
import { UserDTO } from '../dto/UserDTO';
import { WatchHistoryRepository } from '../repository/WatchHistorRepository';
import { WatchLaterRepository } from '../repository/WatchLaterRepository';
import { MovieFavoriteRepository } from '../repository/MovieFavoriteRepository';
import { MovieFavorite } from '../models/MovieFavorite';
import { WatchHistory } from '../models/WatchHistory';
import { WatchLater } from '../models/WatchLater';
import { MovieDTO } from '../dto/MovieDTO';
import { S3Service } from './S3Service';

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

	@Inject(() => S3Service)
	private s3Service!: S3Service;

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

	saveMovieFavorite = async (userId: number, movieId: number) => {
		try {
			let movieFavorite = await this.movieFavoriteRepository.findOneByCondition(
				{
					user_id: userId,
					movie_id: movieId,
				}
			);

			if (movieFavorite != null && movieFavorite.deleteAt != null) {
				console.log('vao1');
				return await this.movieFavoriteRepository.restore(movieFavorite);
			}

			return await this.movieFavoriteRepository.save(
				MovieFavorite.build({ userId: userId, movieId: movieId })
			);
		} catch (error: any) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	deleteMovieFavorite = async (userId: number, movieId: number) => {
		try {
			let movieFavorite = await this.movieFavoriteRepository.findOneByCondition(
				{
					user_id: userId,
					movie_id: movieId,
				}
			);
			return await this.movieFavoriteRepository.delete(movieFavorite);
		} catch (error: any) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	findAllMovieFavorite = async (
		userId: number,
		page: number,
		pageSize: number
	) => {
		try {
			const userMovie = await this.movieFavoriteRepository.findAll(
				userId,
				page,
				pageSize
			);
			return new MovieDTO(userMovie!, 'MovieFavorite');
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	saveWatchHistory = async (
		userId: number,
		movieId: number,
		duration: number
	) => {
		try {
			let watchHistory = await this.watchHistoryRepository
				.findOneByCondition({
					user_id: userId,
					episode_id: movieId,
				})
				.then(async (watchHistory) => {
					if (watchHistory != null) {
						watchHistory.duration = duration;
						watchHistory.deletedAt = null;
						return await this.watchHistoryRepository.save(watchHistory);
					} else {
						return await this.watchHistoryRepository.save(
							WatchHistory.build({
								userId: userId,
								episode_id: movieId,
								duration: duration,
							})
						);
					}
				})
				.catch((error) => {
					console.error('Lỗi: ', error);
				});
		} catch (error: any) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	getWatchHistory = async (userId: number, movieId: number) => {
		try {
			return await this.watchHistoryRepository.findOneByCondition({
				user_id: userId,
				movie_id: movieId,
			});
		} catch (error: any) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	deleteWatchHistory = async (userId: number, movieId: number) => {
		try {
			let watchHistory = await this.watchHistoryRepository.findOneByCondition({
				user_id: userId,
				movie_id: movieId,
			});
			return await this.watchHistoryRepository.delete(watchHistory);
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
			let userMovie = await this.watchHistoryRepository.findAll(
				userId,
				page,
				pageSize
			);
			return new MovieDTO(userMovie!, 'WatchHistory');
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	saveWatchLater = async (userId: number, movieId: number) => {
		try {
			let watchLater = await this.watchLaterRepository.findOneByCondition({
				user_id: userId,
				movie_id: movieId,
			});
			if (watchLater != null && watchLater.deleteAt != null) {
				return await this.movieFavoriteRepository.restore(watchLater);
			}
			return await this.watchLaterRepository.save(
				WatchLater.build({ userId: userId, movieId: movieId })
			);
		} catch (error: any) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	deleteWatchLater = async (userId: number, movieId: number) => {
		try {
			let watchLater = await this.watchLaterRepository.findOneByCondition({
				user_id: userId,
				movie_id: movieId,
			});
			return await this.watchLaterRepository.delete(watchLater);
		} catch (error: any) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	findAllWatchLater = async (
		userId: number,
		page: number,
		pageSize: number
	) => {
		try {
			let userMovie = await this.watchLaterRepository.findAll(
				userId,
				page,
				pageSize
			);
			return new MovieDTO(userMovie!, 'WatchLater');
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
