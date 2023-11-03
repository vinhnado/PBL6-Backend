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

	getMoviesByGenre = async (req: Request, res: Response) => {
		try {
			const page = Number(req.query.page) || 1; // Trang mặc định là 1
			const pageSize = Number(req.query.pageSize) || 5; // Số lượng kết quả trên mỗi trang mặc định là 10
			const genreId = Number(req.query.genreId);
			const sortMovie = req.query.sortMovie?.toString();

            return res.json(await this.homeService.getMoviesByGenre(genreId, page, pageSize, sortMovie));
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: 'Can not get movies by genres' });
		}
	};
}