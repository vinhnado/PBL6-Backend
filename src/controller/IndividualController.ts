import Container, { Inject, Service } from 'typedi';
import { ActorService } from '../services/ActorService';
import { Request, Response } from 'express';
import { Actor } from '../models/Actor';
import { DirectorService } from '../services/DirectorSevice';

export class IndividualController {
	private actorService: ActorService;
	private direcrService: DirectorService;

	constructor() {
		this.actorService = Container.get(ActorService);
		this.direcrService = Container.get(DirectorService);
	}

	createOrUpdateActor = async (req: Request, res: Response) => {
		try {
			const { actorId, name, gender, dateOfBirth, description } = req.body;

			const data: Partial<Actor> = {};
			if (actorId !== undefined) data.actorId = actorId;
			if (name !== undefined) data.name = name;
			if (gender !== undefined) data.gender = gender;
			if (dateOfBirth !== undefined) data.dateOfBirth = dateOfBirth;
			if (description !== undefined) data.description = description;

			await this.actorService.createOrUpdate(data);

			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully',
			});
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: 'Lỗi :' + error.message });
		}
	};

	findActorInfomation = async (req: Request, res: Response) => {
		try {
			const { actorId, page, pageSize } = req.query;

			const data = await this.actorService.findActorInfomation(
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
