import { ActorRepository } from './../repository/ActorRepository';
import { Inject, Service } from 'typedi';

@Service()
export class ActorService {
	@Inject(() => ActorRepository)
	private actorRepository!: ActorRepository;

	findAllMovieByActorId = async (
		actorId: number,
		page: number,
		pageSize: number
	) => {
		try {
			return await this.actorRepository.findAllMovieByActorId(
				actorId,
				page,
				pageSize
			);
		} catch (error) {
			console.log(error);
			throw new Error('Cannot get all movie');
		}
	};
}
