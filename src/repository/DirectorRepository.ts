import { Service } from 'typedi';
import { Actor } from '../models/Actor';
import { Movie } from '../models/Movie';
import { BaseRepository } from './BaseRepository';
import { Director } from '../models/Director';

@Service()
export class DirecorRepository extends BaseRepository<Director> {
	constructor() {
		super(Director);
	}
	findAllMovieByDirectorId = async (
		directorId: number,
		page: number,
		pageSize: number
	) => {
		try {
			const data = await Director.findOne({
				where: { directorId: directorId },
				offset: (page - 1) * pageSize,
				limit: pageSize,
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'deletedAt'],
				},
				include: [
					{
						model: Movie,
						attributes: {
							exclude: ['createdAt', 'updatedAt', 'deletedAt'],
						},
						through: { attributes: [] },
					},
				],
			});
			return data;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
