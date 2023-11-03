import { DirectorService } from './../services/DirectorSevice';
import Container, { Inject, Service } from 'typedi';
import { ActorService } from '../services/ActorService';
import { Request, Response } from 'express';
import { Actor } from '../models/Actor';
import { Director } from '../models/Director';

export class IndividualController {
	private actorService: ActorService;
	private directorService: DirectorService;

	constructor() {
		this.actorService = Container.get(ActorService);
		this.directorService = Container.get(DirectorService);
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
			const { actorId } = req.query;

			const data = await this.actorService.findActorInfomation(Number(actorId));
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

	getAllActor = async (req: Request, res: Response) => {
		try {
			const data = await this.actorService.getAllActor();
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully',
				data: data,
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	deleteActor = async (req: Request, res: Response) => {
		try {
			const { actorId } = req.query;

			await this.actorService.deleteActorByActorId(Number(actorId));
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully',
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	searchActor = async (req: Request, res: Response) => {
		try {
			const { search, page, pageSize } = req.query;
			const data = await this.actorService.searchActor(
				String(search),
				Number(page),
				Number(pageSize)
			);
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully',
				data: data,
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	createOrUpdateDirector = async (req: Request, res: Response) => {
		try {
			const { directorId, name, gender, dateOfBirth, description } = req.body;

			const data: Partial<Director> = {};
			if (directorId !== undefined) data.directorId = directorId;
			if (name !== undefined) data.name = name;
			if (gender !== undefined) data.gender = gender;
			if (dateOfBirth !== undefined) data.dateOfBirth = dateOfBirth;
			if (description !== undefined) data.description = description;

			await this.directorService.createOrUpdate(data);

			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully',
			});
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: 'Lỗi :' + error.message });
		}
	};

	findDirectortorInfomation = async (req: Request, res: Response) => {
		try {
			const { directorId } = req.query;

			const data = await this.directorService.findDirectortorInfomation(
				Number(directorId)
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

	getAllDirector = async (req: Request, res: Response) => {
		try {
			const data = await this.directorService.getAllDirector();
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully',
				data: data,
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	deleteDirector = async (req: Request, res: Response) => {
		try {
			const { directorId } = req.query;

			await this.directorService.deleteActorByDirectorId(Number(directorId));
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully',
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	searchDirector = async (req: Request, res: Response) => {
		try {
			const { search, page, pageSize } = req.query;
			const data = await this.directorService.searchAllDirector(
				String(search),
				Number(page),
				Number(pageSize)
			);
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully',
				data: data,
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
