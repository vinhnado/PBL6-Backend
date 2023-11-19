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
			return res.status(200).json(episode);
		} catch (error) {
			return res.status(500).json({ error: 'Err while get episode.' });
		}
	};

	getCommentsOfEpisode = async (req: Request, res: Response) => {
		try {
			const episodeId = Number(req.params.id);
			
			const page = Number(req.query.page) || 1;
			const pageSize = Number(req.query.pageSize) || 10;

			const comments = await this.episodeService.getCommentsOfEpisode(episodeId, page, pageSize);
			if (!comments) {
				return res.status(404).json({ error: 'Can not find episode.' });
			}
			return res.status(200).json({
				message: "Successful",
				comments : comments
			});
		} catch (error) {
			return res.status(500).json({ error: 'Err while get episode.' });
		}
	}
}