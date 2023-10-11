import { User } from '../../models/User';
import { Account } from '../../models/Account';
import { Op } from 'sequelize';
import { IUserRepository } from './IUserRepository';
import Database from '../../config/database';
import { MovieFavorite } from '../../models/MovieFavorite';
import { WatchList } from '../../models/WatchList';
import { WatchHistory } from '../../models/WatchHistory';

const db = Database.getInstance();

// export class UserRepository implements IUserRepository {
export class UserRepository {
	async findOneUser(searchConditions: any): Promise<User> {
		const { username, email, idUser } = searchConditions;
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

		if (idUser) {
			whereConditions.idUser = {
				[Op.eq]: idUser,
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
	async save(newUser: User, newAccount: Account): Promise<void> {
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
						// through: { attributes: [] },
						where: {
							username: {
								[Op.like]: `%${user_name}%`,
							},
						},
					},
				],
				// order: [['release_date', 'DESC']],
			});
			return users;
		} catch (error: any) {
			throw new Error('Không thể lấy danh sách user ' + error.message);
		}
	}

	async addFavoriteMovie(userId: number, movieId:number):Promise<void>{
		try{
		const favorite = new MovieFavorite();
		favorite.userId = userId;
		favorite.movieId = movieId;
		favorite.save();
		}catch(error){
			throw new Error('Không thể thêm phim yêu thích');
		}
	}

	async addWatchHistory(userId: number, movieId:number):Promise<void>{
		try{
		const history = new WatchHistory();
		history.userId = userId;
		history.movieId = movieId;
		history.save();
		}catch(error){
			throw new Error('Không thể thêm phim yêu thích');
		}
	}

	async addWatchList(userId: number, movieId:number):Promise<void>{
		try{
		const movie = new WatchList();
		movie.userId = userId;
		movie.movieId = movieId;
		movie.save();
		}catch(error){
			throw new Error('Không thể thêm phim vao danh sach');
		}
	}
}
