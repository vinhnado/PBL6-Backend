import { Subscription } from '../models/Subscription';
import express, { Request, Response, Router } from 'express';
import Container from 'typedi';
import { SubscriptionService } from '../services/SubscriptionService';

export class SubscriptionController {
	private subscriptionService: SubscriptionService;

	constructor() {
		this.subscriptionService = Container.get(SubscriptionService);
	}

	updateSubscription = async (req: Request, res: Response) => {
		try {
			const { subscriptionTypeId, userId, closedAt } = req.body;

			await this.subscriptionService.updateSubscription(
				Number(userId),
				new Date(closedAt),
				Number(subscriptionTypeId)
			);
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully',
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: 'Can not' });
		}
	};

	createSubscriptionType = async (req: Request, res: Response) => {
		try {
			const { name } = req.body;
			await this.subscriptionService.createOrUpdateSubscriptionType(name);
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully',
			});
		} catch (error) {
			res.status(500).json({ error: 'Can not' });
		}
	};

	updateSubscriptionType = async (req: Request, res: Response) => {
		try {
			const { name, subcriptionTypeId } = req.body;
			await this.subscriptionService.createOrUpdateSubscriptionType(
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
	getAllSubscriptionType = async (req: Request, res: Response) => {
		try {
			const data = await this.subscriptionService.getAllSubscriptionType();
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully',
				data: data,
			});
		} catch (error) {
			res.status(500).json({ error: 'Can not' });
		}
	};

	deleteSubscriptionType = async (req: Request, res: Response) => {
		try {
			const { subscriptionTypeId } = req.query;
			await this.subscriptionService.deleteSupscriptionType(
				Number(subscriptionTypeId)
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
