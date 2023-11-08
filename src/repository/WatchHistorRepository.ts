import { Service } from 'typedi';
import { BaseRepository } from './BaseRepository';
import { User } from '../models/User';
import { Movie } from '../models/Movie';
import { WatchHistory } from '../models/WatchHistory';
import { Genre } from '../models/Genre';
import { Episode } from '../models/Episode';

@Service()
export class WatchHistoryRepository extends BaseRepository<WatchHistory> {
	constructor() {
		super(WatchHistory);
	}

	// async findAll(userId: number, page: number, pageSize: number) {
	// 	try {
	// 		const movieHistoryList = await User.findOne({
	// 			where: { userId: userId },
	// 			offset: (page - 1) * pageSize,
	// 			limit: pageSize,
	// 			attributes: ['userId'],
	// 			include: [
	// 				{
	// 					model: Movie,
	// 					as: 'watchHistoryList',
	// 					attributes: {
	// 						exclude: ['createdAt', 'updatedAt', 'deletedAt'],
	// 					},
	// 					through: { attributes: ['updatedAt', 'duration'] },
	// 					include: [
	// 						{
	// 							model: Genre,
	// 							attributes: ['genre_id', 'name'],
	// 							as: 'genres',
	// 							through: { attributes: [] },
	// 						},
	// 					],
	// 				},
	// 			],
	// 		});

	// 		return movieHistoryList;
	// 	} catch (error) {
	// 		console.log(error);
	// 		throw new Error('Cannot get all movie history');
	// 	}
	// }
	async findAll(userId: number, page: number, pageSize: number) {
		try {
			const movieHistoryList = await User.findOne({
				where: { userId: userId },
				offset: (page - 1) * pageSize,
				limit: pageSize,
				attributes: ['userId'],
				include: [
					{
						model: Episode,
						as: 'watchHistoryList',
						attributes: {
							exclude: ['createdAt', 'updatedAt', 'deletedAt'],
						},
						through: { attributes: ['updatedAt', 'duration'] },
						include: [
							{
								model: Movie,
								// attributes: ['genre_id', 'name'],
								through: { attributes: [] },
							},
						],
					},
				],
			});
			console.log(movieHistoryList);
			return movieHistoryList;
		} catch (error) {
			console.log(error);
			throw new Error('Cannot get all movie history');
		}
	}
}
