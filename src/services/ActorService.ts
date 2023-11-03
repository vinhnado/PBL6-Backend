import { Actor } from '../models/Actor';
import { ActorRepository } from './../repository/ActorRepository';
import { Inject, Service } from 'typedi';
import { S3Service } from './S3Service';

@Service()
export class ActorService {
	@Inject(() => ActorRepository)
	private actorRepository!: ActorRepository;

	@Inject(() => S3Service)
	private s3Service!: S3Service;

	findActorInfomation = async (actorId: number) => {
		try {
			let actor = await this.actorRepository.findActorInfomation(actorId);
			actor!.avatar = await this.s3Service.getObjectUrl(actor!.avatar);
			actor!.poster = await this.s3Service.getObjectUrl(actor!.poster);
			console.log(actor);
			for (const movie of actor!.movies) {
				movie.posterURL = await this.s3Service.getObjectUrl(movie.posterURL);
				movie.trailerURL = await this.s3Service.getObjectUrl(movie.trailerURL);
				movie.backgroundURL = await this.s3Service.getObjectUrl(
					'movies/'.concat(movie.movieId.toString(), '/background.jpg')
				);
			}
			return actor;
		} catch (error) {
			console.log(error);
			throw new Error('Cannot get all movie');
		}
	};

	createOrUpdate = async (actorData: Partial<Actor>) => {
		try {
			if (actorData.actorId) {
				const actorToUpdate = await this.actorRepository.findById(
					actorData.actorId
				);
				if (actorToUpdate) {
					await actorToUpdate.update(actorData);
					return await this.actorRepository.save(actorToUpdate);
				} else {
					throw new Error('Actor not found for the given ID');
				}
			} else {
				return await this.actorRepository.save(Actor.build(actorData));
			}
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	findByActorId = async (actorId: number) => {
		try {
			return this.actorRepository.findById(actorId);
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	deleteActorByActorId = async (actorId: number) => {
		try {
			const actor = await this.actorRepository.findById(actorId);
			return await this.actorRepository.delete(actor);
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getAllActor = async () => {
		try {
			return await this.actorRepository.findMany();
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	searchActor = async (search: string, page: number, pageSize: number) => {
		try {
			const data = await this.actorRepository.searchAllActor(
				search,
				page,
				pageSize
			);
			return data;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
