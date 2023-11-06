import { Subscription } from '../models/Subscription';
import { User } from '../models/User';
import { Account } from '../models/Account';
import { Op } from 'sequelize';
import { IUserRepository } from './Interfaces/IUserRepository';
import { MovieFavorite } from '../models/MovieFavorite';
import { WatchHistory } from '../models/WatchHistory';
import { BaseRepository } from './BaseRepository';
import { Service } from 'typedi';
import { SubscriptionType } from '../models/SubscriptionType';
import { Movie } from '../models/Movie';
import { Episode } from '../models/Episode';

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
				{
					model: Subscription,
					// attributes: ['closedAt'],
					include: [
						{
							model: SubscriptionType, // Đặt tên mối quan hệ mà bạn đã định nghĩa trong model Subcription
							attributes: ['subscription_type_id', 'name'], // Thay thế bằng các trường bạn muốn lấy từ SubcriptionType
						},
					],
				},
			],
		});
		return user!;
	}
	async createNewUser(
		newUser: User,
		newAccount: Account,
		newSubscription: Subscription
	): Promise<void> {
		const t = await this.db.sequelize!.transaction();

		try {
			const account = await newAccount.save({ transaction: t });
			const subscription = await newSubscription.save({ transaction: t });
			newUser.accountId = account.accountId;
			newUser.subscriptionId = subscription.subscriptionId;
			await newUser.save({ transaction: t });
			await t.commit(); // Lưu giao dịch nếu không có lỗi
		} catch (error: any) {
			// console.error(error);

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
		episodeId: number,
		duration: number
	): Promise<void> {
		try {
			const history = new WatchHistory();
			history.userId = userId;
			history.episodeId = episodeId;
			history.duration = duration;
			history.save();
		} catch (error) {
			throw new Error('Không thể thêm phim yêu thích');
		}
	}

	async getAllWatchHistory(userId: number, page: number, pageSize: number) {
		try {
			const watchHistories = await User.findOne({
				where: { userId: userId },
				offset: (page - 1) * pageSize,
				limit: pageSize,
				attributes: ['userId'],
				include: [
					{
						model: Episode,
						as: 'WatchHistories',
						attributes: {
							exclude: ['createdAt', 'updatedAt', 'deletedAt'],
						},
						// through: { attributes: ['updatedAt'] },
					},
				],
			});

			return watchHistories;
		} catch (error) {
			console.log(error);
			throw new Error('Cannot get all movie favorite');
		}
	}

	async getAllWatchList(userId: number, page: number, pageSize: number) {
		try {
			const watchList = await User.findOne({
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

			return watchList;
		} catch (error) {
			console.log(error);
			throw new Error('Cannot get all movie favorite');
		}
	}
}
