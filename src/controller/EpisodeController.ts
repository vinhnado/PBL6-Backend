import express, { Request, Response, Router } from 'express';
import { EpisodeService } from '../services/EpisodeService';

class EpisodeController{
    getEpisode = async (req: Request, res: Response) => {
		const { id } = req.params;
		try {
			const episode = await new EpisodeService().getEpisode(Number(id));
			if (!episode) {
				return res.status(404).json({ error: 'Không tìm thấy phim.' });
			}
			return res.json(episode);
		} catch (error) {
			return res.status(500).json({ error: 'Lỗi khi lấy thông tin phim.' });
		}
	};

    getAllEpisodeOfMovie = async (req: Request, res: Response) => {
		const { movie_id } = req.params;
		try {
			const episode = await new EpisodeService().getAllEpisodeOfMovie(Number(movie_id));
			if (!episode) {
				return res.status(404).json({ error: 'Không tìm thấy phim.' });
			}
			return res.json(episode);
		} catch (error) {
			return res.status(500).json({ error: 'Lỗi khi lấy thông tin tap phim.' });
		}
	};

}
export default new EpisodeController();