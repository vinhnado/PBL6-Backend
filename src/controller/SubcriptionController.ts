import { Subcription } from './../models/Subcription';
import express, { Request, Response, Router } from 'express';
import Container from 'typedi';
import { SubcriptionService } from '../services/SubcriptionService';

export class SubcriptionController {
	private subcriptionService: SubcriptionService;

	constructor() {
		this.subcriptionService = Container.get(SubcriptionService);
	}

	updateSubcription = async (req: Request, res: Response) => {
		try {
			const { email, idUser } = req.body;

			await this.subcriptionService.createOrUpdateSubscription(1, new Date());
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully',
			});
		} catch (error) {
			res.status(500).json({ error: 'Can not' });
		}
	};

	createSubcriptionType = async (req: Request, res: Response) => {
		try {
			const { name } = req.body;
			await this.subcriptionService.createOrUpdateSubscriptionType(name);
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully',
			});
		} catch (error) {
			res.status(500).json({ error: 'Can not' });
		}
	};

	updateSubcriptionType = async (req: Request, res: Response) => {
		try {
			const { name, subcriptionTypeId } = req.body;
			await this.subcriptionService.createOrUpdateSubscriptionType(
				name,
				subcriptionTypeId
			);
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully',
			});
		} catch (error) {
			res.status(500).json({ error: 'Can not' });
		}
	};
}
