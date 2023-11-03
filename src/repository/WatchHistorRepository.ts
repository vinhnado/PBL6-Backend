import { Service } from 'typedi';
import { BaseRepository } from './BaseRepository';
import { User } from '../models/User';
import { Movie } from '../models/Movie';
import { WatchHistory } from '../models/WatchHistory';

@Service()
export class WatchHistoryRepository extends BaseRepository<WatchHistory> {
	constructor() {
		super(WatchHistory);
	}

	async findAll(userId: number, page: number, pageSize: number) {
		try {
			const movieHistoryList = await User.findOne({
				where: { userId: userId },
				offset: (page - 1) * pageSize,
				limit: pageSize,
				attributes: ['userId'],
				include: [
					{
						model: Movie,
						as: 'watchHistoryList',
						attributes: {
							exclude: ['createdAt', 'updatedAt', 'deletedAt'],
						},
						through: { attributes: ['updatedAt', 'duration'] },
					},
				],
			});

			return movieHistoryList;
		} catch (error) {
			console.log(error);
			throw new Error('Cannot get all movie history');
		}
	}
}
