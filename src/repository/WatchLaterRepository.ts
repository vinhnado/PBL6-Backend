import { Service } from 'typedi';
import { BaseRepository } from './BaseRepository';
import { User } from '../models/User';
import { Movie } from '../models/Movie';
import { WatchLater } from '../models/WatchLater';
import { Genre } from '../models/Genre';

@Service()
export class WatchLaterRepository extends BaseRepository<WatchLater> {
	constructor() {
		super(WatchLater);
	}

	async findAll(userId: number, page: number, pageSize: number) {
		try {
			const watchLaterList = await User.findOne({
				where: { userId: userId },
				offset: (page - 1) * pageSize,
				limit: pageSize,
				attributes: ['userId'],
				include: [
					{
						model: Movie,
						as: 'watchLaterList',
						attributes: {
							exclude: ['createdAt', 'updatedAt', 'deletedAt'],
						},
						through: { attributes: ['updatedAt'] },
						include: [
							{
								model: Genre,
								attributes: ['genre_id', 'name'],
								as: 'genres',
								through: { attributes: [] },
							},
						],
					},
				],
			});

			return watchLaterList;
		} catch (error) {
			console.log(error);
			throw new Error('Cannot get all movie history');
		}
	}
}
