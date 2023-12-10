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

	createActor = async (req: Request, res: Response) => {
		try {
			const result = await this.actorService.createActor(req);

			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully',
				data: result
			});
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ message: "Server error!" });
		}
	};

	updateActor = async (req: Request, res: Response) => {
		try {
			const result = await this.actorService.updateActor(req);
			if(result) {
				return res.status(200).json({
					status: 'Ok!',
					message: 'Successfully',
					data: result
				});
			}
			return res.status(404).json({
				message: 'Failed, Actor not found',
			});

		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: 'Lỗi :' + error.message });
		}
	};

	getActorDetails = async (req: Request, res: Response) => {
		try {
			const { actorId } = req.params;

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

	deleteActor = async (req: Request, res: Response) => {
		try {
			const { actorId } = req.params;

			const rs = await this.actorService.deleteActorByActorId(Number(actorId));
			if(rs){
				return res.status(200).json({
					status: 'Ok!',
					message: 'Successfully',
				});
			}
			return res.status(404).json({
				message: 'Failed!, Actor not found!',
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getActors = async (req: Request, res: Response) => {
		try {
			let search = req.query.name ||'';
			let page = req.query.page||1;
			let pageSize = req.query.pageSize||10;

			const data = await this.actorService.getActors(
				String(search),
				Number(page),
				Number(pageSize)
			);
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully',
				data: {
					totalActors: data.count,
					totalPages: Math.floor(data.count/Number(pageSize)),
					actorsPerPage: Number(pageSize),
					actors: data.rows,
				},
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

	getDirectorDetails = async (req: Request, res: Response) => {
		try {
			const { directorId } = req.params;

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

	deleteDirector = async (req: Request, res: Response) => {
		try {
			const { directorId } = req.params;

			const rs = await this.directorService.deleteDirector(Number(directorId));
			if(rs){
				return res.status(200).json({
                    status: 'Ok!',
                    message: 'Successfully',
                });
			}
			return res.status(404).json({
				message: 'Failed!, Director not found!',
			});
		} catch (error: any) {
			throw(error);
		}
	};

	getDirectors = async (req: Request, res: Response) => {
		try {
			let search = req.query.name ||'';
			let page = req.query.page||1;
			let pageSize = req.query.pageSize||10;

			const data = await this.directorService.getDirectors(
				String(search),
				Number(page),
				Number(pageSize)
			);
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully',
				data: {
					totalDirectors: data.count,
					totalPages: Math.floor(data.count/Number(pageSize)),
					directorsPerPage: Number(pageSize),
					directors: data.rows,
				},
			});
		} catch (error: any) {
			return res.status(500).json({
				message: "Server error!"
			});
		}
	};
}
