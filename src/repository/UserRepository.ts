import { User } from '../models/User';
import { Account } from '../models/Account';
import { Op, Sequelize, json } from 'sequelize';
import { IUserRepository } from './Interfaces/IUserRepository';
import Database from '../config/database';
import { MovieFavorite } from '../models/MovieFavorite';
import { WatchLater } from '../models/WatchLater';
import { WatchHistory } from '../models/WatchHistory';
import { BaseRepository } from './BaseRepository';
import { Container, Service } from 'typedi';
import { Movie } from '../models/Movie';

const db = Database.getInstance();
@Service()
export class UserRepository
	extends BaseRepository<User>
	implements IUserRepository
{
	constructor() {
		super(User);
	}
	async findOneUser(searchConditions: any): Promise<User> {
		const { username, email, userId } = searchConditions;
		let user_name: string;
		const whereConditions: { [key: string]: any } = {};

		if (email) {
			whereConditions.email = {
				[Op.iLike]: `%${email}%`,
			};
		}

		if (username) {
			user_name = username;
		} else {
			user_name = '';
		}

		if (userId) {
			whereConditions.user_id = {
				[Op.eq]: userId,
			};
		}

		const user = await User.findOne({
			where: whereConditions,
			include: [
				{
					model: Account,
					attributes: ['username', 'password'],
					where: {
						username: {
							[Op.like]: `%${user_name}%`,
						},
					},
				},
			],
		});
		return user!;
	}
	async createNewUser(newUser: User, newAccount: Account): Promise<void> {
		const t = await db.sequelize!.transaction();

		try {
			await newUser.save({ transaction: t });
			await newAccount.save({ transaction: t });

			await t.commit(); // Lưu giao dịch nếu không có lỗi
		} catch (error: any) {
			console.error(error);

			await t.rollback(); // Rollback giao dịch nếu có lỗi
			throw new Error('Không thể tạo mới người dùng ' + error.message);
		}
	}

	async searchUsers(
		searchConditions: any,
		page: number,
		pageSize: number
	): Promise<User[]> {
		try {
			const { username, email, gender } = searchConditions;
			let user_name: string;
			const whereConditions: { [key: string]: any } = {};

			if (email) {
				whereConditions.email = {
					[Op.iLike]: `%${email}%`,
				};
			}

			if (username) {
				user_name = username;
			} else {
				user_name = '';
			}

			if (gender) {
				whereConditions.nation = {
					[Op.eq]: gender,
				};
			}

			const users = await User.findAll({
				where: whereConditions,
				offset: (page - 1) * pageSize,
				limit: pageSize,
				include: [
					{
						model: Account,
						attributes: ['username'],
						where: {
							username: {
								[Op.like]: `%${user_name}%`,
							},
						},
					},
				],
			});
			return users;
		} catch (error: any) {
			throw new Error('Không thể lấy danh sách user ' + error.message);
		}
	}

	async addFavoriteMovie(userId: number, movieId: number): Promise<void> {
		try {
			const favorite = new MovieFavorite();
			favorite.userId = userId;
			favorite.movieId = movieId;
			favorite.save();
		} catch (error) {
			throw new Error('Không thể thêm phim yêu thích');
		}
	}

	async getAllFavoriteMovie(userId: number, page: number, pageSize: number) {
		try {
			const favoritemovies = await User.findOne({
				where: { userId: userId },
				offset: (page - 1) * pageSize,
				limit: pageSize,
				attributes: ['userId'],
				include: [
					{
						model: Movie,
						as: 'movieFavorites',
						attributes: {
							exclude: ['createdAt', 'updatedAt', 'deletedAt'],
						},
						through: { attributes: ['updatedAt'] },
					},
				],
			});

			return favoritemovies;
		} catch (error) {
			console.log(error);
			throw new Error('Cannot get all movie favorite');
		}
	}

	async addWatchHistory(
		userId: number,
		movieId: number,
		duration: number
	): Promise<void> {
		try {
			const history = new WatchHistory();
			history.userId = userId;
			history.movieId = movieId;
			history.duration = duration;
			history.save();
		} catch (error) {
			throw new Error('Không thể thêm phim yêu thích');
		}
	}

	async getAllWatchHistory(userId: number, page: number, pageSize: number) {
		try {
			const favoritemovies = await User.findOne({
				where: { userId: userId },
				offset: (page - 1) * pageSize,
				limit: pageSize,
				attributes: ['userId'],
				include: [
					{
						model: Movie,
						as: 'WatchHistories',
						attributes: {
							exclude: ['createdAt', 'updatedAt', 'deletedAt'],
						},
						// through: { attributes: ['updatedAt'] },
					},
				],
			});

			return favoritemovies;
		} catch (error) {
			console.log(error);
			throw new Error('Cannot get all movie favorite');
		}
	}

	// async addWatchList(userId: number, movieId: number): Promise<void> {
	// 	try {
	// 		const movie = new WatchList();
	// 		movie.userId = userId;
	// 		movie.movieId = movieId;
	// 		movie.save();
	// 	} catch (error) {
	// 		throw new Error('Không thể thêm phim vao danh sach');
	// 	}
	// }

	async getAllWatchList(userId: number, page: number, pageSize: number) {
		try {
			const favoritemovies = await User.findOne({
				where: { userId: userId },
				offset: (page - 1) * pageSize,
				limit: pageSize,
				attributes: ['userId'],
				include: [
					{
						model: Movie,
						as: 'watchList',
						attributes: {
							exclude: ['createdAt', 'updatedAt', 'deletedAt'],
						},
						// through: { attributes: ['updatedAt'] },
					},
				],
			});

			return favoritemovies;
		} catch (error) {
			console.log(error);
			throw new Error('Cannot get all movie favorite');
		}
	}
}
