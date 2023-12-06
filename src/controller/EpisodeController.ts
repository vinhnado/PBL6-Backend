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

	createEpisode = async (req: Request, res: Response) => {
		try {
			const newEpisode = await this.episodeService.createEpisode(req);
			return res.status(200).json({
				message: "Successful",
				data: newEpisode
			})
		} catch (error) {
			res.status(500).json({
				message: "Server error"
			})
		}
	}

	updateEpisode = async (req: Request, res: Response) => {
		try {
			const [rowsAffected, updatedEpisode] = await this.episodeService.updateEpisode(req);
			if(rowsAffected==0){
				return res.status(200).json({ error: 'Nothing to updated'});
			}
			if(!updatedEpisode){
				return res.status(404).json({ error: 'Updated episode failed'});
			}
			return res.status(200).json({
				message: "Successful",
				data:{
					rowsAffected: rowsAffected,
					episodeUpdated: updatedEpisode
				}
			});
		} catch (error) {
			res.status(500).json({
				message: "Server error"
			})
		}
	}

	deleteEpisode = async (req: Request, res: Response) => {
		try {
			const rs = await this.episodeService.deleteEpisode(req);
			if(rs){
				return res.status(204).json();
			}else{
				return res.status(404).json({ 
					status: false,
					message: "Delete failed"
				});
			}
		} catch (error) {
			res.status(500).json({
				message: "Server error"
			})	
		}
	}

	getPresignUrlToUploadPosterAndMovie = async (req: Request, res: Response) => {
		try {
			const rs = await await this.episodeService.getPresignUrlToUploadPosterAndMovie(req);
			res.status(200).json({
				message: "Successful",
                data: rs
            });
		} catch (error) {
			res.status(500).json({
				message: "Server error"
			})	
		}
	}
 
}