import Container, { Inject, Service } from 'typedi';
import { ActorService } from '../services/ActorService';
import { Request, Response } from 'express';

export class IndividualController {
	private actorService: ActorService;
	// private direcrService: DirectorService;

	constructor() {
		this.actorService = Container.get(ActorService);
		// this.direcrService = Container.get(DirectorService);
	}

	findAllMovieByActorId = async (req: Request, res: Response) => {
		try {
			const { actorId, page, pageSize } = req.query;

			const data = await this.actorService.findAllMovieByActorId(
				Number(actorId),
				Number(page),
				Number(pageSize)
			);
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully',
				data: data,
			});
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: 'Lỗi :' + error.message });
		}
	};
}
