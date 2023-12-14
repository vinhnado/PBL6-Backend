import { Service } from 'typedi';
import { Actor } from '../models/Actor';
import { Movie } from '../models/Movie';
import { BaseRepository } from './BaseRepository';
import { Op, Sequelize } from 'sequelize';
import { MovieActor } from '../models/MovieActor';

@Service()
export class ActorRepository extends BaseRepository<Actor> {
	constructor() {
		super(Actor);
	}
	findActorInfomation = async (actorId: number) => {
		try {
			let data = await Actor.findOne({
				where: { actorId: actorId },
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

	searchAllActor = async (search: string, page: number, pageSize: number) => {
		try {
			const data = await Actor.findAndCountAll({
				where: {
					name: {
						[Op.like]: `%${search}%`,
					},
				},
				offset: (page - 1) * pageSize,
				limit: pageSize,
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'deletedAt'],
				},
			});

			return data;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

    getPopularActors = async(page: number, pageSize: number): Promise<Actor[]> => {
		try {
			const popularActors = await Actor.findAll({
				attributes: {
				  include: [
					[Sequelize.fn('COUNT', Sequelize.col('movies.movie_id')), 'movieCount'],
				  ],
				  exclude: ['createdAt', 'updatedAt', 'deletedAt'],
				},
				include: [
				  {
					model: Movie,
					attributes: [],
					through: { attributes: [] },
				  },
				],
				group: ['actors.actor_id'],
				order: [[Sequelize.literal('movieCount'), 'DESC']],
				// limit: pageSize,
				// offset: (page - 1) * pageSize,
			  });
		  
			  return popularActors;
		  } catch (error) {
			console.log(error);
			throw(error);
		  }
	}

}
