import Container, { Inject, Service } from 'typedi';
export class IndividualController {
	private actorService: ActorService;
	private direcrService: DirectorService;

	constructor() {
		this.actorService = Container.get(ActorService);
		this.direcrService = Container.get(DirectorService);
	}
}
