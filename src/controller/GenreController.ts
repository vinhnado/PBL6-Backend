import express, { Request, Response, Router } from 'express';
import Container from 'typedi';
import { IGenreService } from '../services/Interfaces/IGenreService';
import { GenreService } from '../services/GenreService';

export class GenreController{
	private genreService: IGenreService;

	constructor() {
		this.genreService = Container.get(GenreService);
	}

    getAllGenres = async (req: Request, res: Response) => {
		try {
            const genres = await this.genreService.getAllGenres();
			return res.status(200).json(genres);
		} catch (error) {
			return res.status(500).json({ error: 'Err while get genres.' });
		}
	};
}