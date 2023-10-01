import express, { Request, Response, Router } from 'express';
import { MovieService } from '../../services/Movie/MovieService';

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
			const movies = await new MovieService().searchMovies(
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
			const movie = await new MovieService().getMovieById(Number(id));
			if (!movie) {
				return res.status(404).json({ error: 'Không tìm thấy phim.' });
			}
			return res.json(movie);
		} catch (error) {
			return res.status(500).json({ error: 'Lỗi khi lấy thông tin phim.' });
		}
	};

	getAllMovies = async (req: Request, res: Response): Promise<void> => {
		try {
			const movies = await new MovieService().getAllMovies();
			res.json(movies);
		} catch (error) {
			res.status(500).json({ error: 'Không thể lấy danh sách phim' });
		}
	};

	deleteMovieById = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;

		try {
			// Gọi service để xóa bộ phim dựa trên ID
			await new MovieService().deleteMovieById(parseInt(id, 10));

			res.status(204).send(); // Trả về mã trạng thái 204 (No Content) khi xóa thành công
		} catch (error) {
			res.status(500).json({ error: 'Loi trong qua trinh xoa' });
		}
	};

	createMovie = async (req: Request, res: Response): Promise<void> => {
		const {
			title,
			description,
			releaseDate,
			nation,
			posterURL,
			trailerURL,
			averageRating,
			episodeNum,
			level,
		} = req.body;

		try {
			// Gọi service để tạo bộ phim mới
			const newMovie = await new MovieService().createMovie(
				title,
				description,
				releaseDate,
				nation,
				posterURL,
				trailerURL,
				averageRating,
				episodeNum,
				level
			);

			res.status(201).json(newMovie); // Trả về mã trạng thái 201 (Created) khi tạo thành công và kèm theo bộ phim mới
		} catch (error) {
			res.status(500).json({ error: 'Không thể thêm mới phim' });
		}
	};
}

export default new MovieController();
