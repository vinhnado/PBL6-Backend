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
import { Genre } from '../models/Genre';
import { SubscriptionInfo } from '../models/SubscriptionInfo';
import { Duration } from '../models/Duration';

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
					// attributes: ['account_id', 'username', 'password'],
					where: {
						username: {
							[Op.like]: `%${user_name}%`,
						},
					},
				},
				{
					model: Subscription,
					// attributes: ['closeAt'],
					include: [
						{
							model: SubscriptionType,
							attributes: ['subscription_type_id', 'name'],
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
	):Promise<{
		users: User[];
		totalCount: number;
	  }> {
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

			const totalCount = await User.count({ 
				where: whereConditions,
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

			return {users, totalCount};
		} catch (error: any) {
			throw new Error('Không thể lấy danh sách user ' + error.message);
		}
	}
}
