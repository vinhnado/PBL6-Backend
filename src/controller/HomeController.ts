import express, { Request, Response, Router } from 'express';
import Container from 'typedi';
import { IHomeService } from '../services/Interfaces/IHomeService';
import { HomeService } from '../services/HomeService';

export class HomeController {
	private homeService: IHomeService;

	constructor() {
		this.homeService = Container.get(HomeService);
	}

    getHomePosters = async (req: Request, res: Response) => {
		try {
            return res.json(await this.homeService.getHomePosters());
		} catch (error) {
			res.status(500).json({ error: 'Can not get home poster' });
		}
	};
}