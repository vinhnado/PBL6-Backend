import { Service } from 'typedi';
import { Actor } from '../models/Actor';
import { Movie } from '../models/Movie';
import { BaseRepository } from './BaseRepository';

@Service()
export class ActorRepository extends BaseRepository<Actor> {
	constructor() {
		super(Actor);
	}
	findAllMovieByActorId = async (
		actorId: number,
		page: number,
		pageSize: number
	) => {
		try {
			const data = await Actor.findOne({
				where: { actorId: actorId },
				offset: (page - 1) * pageSize,
				limit: pageSize,
				attributes: ['actorId'],
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
		} catch (error) {
			console.log(error);
			throw new Error('Cannot get all movie');
		}
	};
}
