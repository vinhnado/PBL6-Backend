import express, { Request, Response, Router } from 'express';
import { EpisodeService } from '../services/EpisodeService';
import { IEpisodeService } from '../services/Interfaces/IEpisodeService';
import Container from 'typedi';

export class EpisodeController{
	private episodeService: IEpisodeService;

	constructor() {
		this.episodeService = Container.get(EpisodeService);
	}
    getEpisode = async (req: Request, res: Response) => {
		const { id } = req.params;
		try {
			const episode = await this.episodeService.getEpisode(Number(id));
			if (!episode) {
				return res.status(404).json({ error: 'Can not find episode.' });
			}
			return res.json(episode);
		} catch (error) {
			return res.status(500).json({ error: 'Err while get episode.' });
		}
	};

}