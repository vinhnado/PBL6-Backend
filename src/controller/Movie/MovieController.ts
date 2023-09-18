import express, { Request, Response, Router } from 'express';
import { MovieService } from '../../services/Movie/MovieService';

const movieService = MovieService.getInstance();

class MovieController {
	getMovies = async (req: Request, res: Response) => {
		try {
			const movies = await movieService.getAllMovies1();
			return res.json(movies);
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: 'Lỗi khi lấy danh sách phim.' });
		}
	};

	getMovieById = async (req: Request, res: Response) => {
		const { id } = req.params;
		try {
			const movie = await movieService.getMovieById(Number(id));
			if (!movie) {
				return res.status(404).json({ error: 'Không tìm thấy phim.' });
			}
			return res.json(movie);
		} catch (error) {
			return res.status(500).json({ error: 'Lỗi khi lấy thông tin phim.' });
		}
	};
}

export default new MovieController();
