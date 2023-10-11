import express, { Request, Response, Router } from 'express';
import { MovieService } from '../services/MovieService';

const movieService = MovieService.getInstance();

class MovieController {
	searchMovies = async (req: Request, res: Response) => {
		try {
			const { title, genre, nation, year, isSeries, page, pageSize } =
				req.query;
			const searchConditions = {
				title,
				genre,
				nation,
				year,
				isSeries,
			};
			const movies = await movieService.searchMovies(
				searchConditions,
				Number(page),
				Number(pageSize)
			);
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
