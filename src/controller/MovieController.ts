import { MovieService } from './../services/MovieService';
import express, { Request, Response, Router } from 'express';
import Container from 'typedi';
import { IMovieService } from '../services/Interfaces/IMovieService';

export class MovieController {
	private movieService: IMovieService;

	constructor() {
		this.movieService = Container.get(MovieService);
	}

	searchMovies = async (req: Request, res: Response) => {
		try {
			const options = {
				search: req.query.search,
				genre: req.query.genre,
				nation: req.query.nation,
				year: req.query.year,
				isSeries: req.query.isSeries,
				sort: req.query.sort,
			  };
			const page = Number(req.query.page) || 1; // Trang mặc định là 1
			const pageSize = Number(req.query.pageSize) || 5; // Số lượng kết quả trên mỗi trang mặc định là 10

			const movies = await this.movieService.searchMovies(
				options,
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
			const movie = await this.movieService.getMovieById(Number(id));
			if (!movie) {
				return res.status(404).json({ error: 'Can not find movie.' });
			}
			return res.json(movie);
		} catch (error) {
			return res.status(500).json({ error: 'Can not get movie.' });
		}
	};

	getAllMovies = async (req: Request, res: Response): Promise<void> => {
		try {
			const movies = await this.movieService.getAllMovies();
			res.json(movies);
		} catch (error) {
			res.status(500).json({ error: 'Không thể lấy danh sách phim' });
		}
	};

	deleteMovieById = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.query;
		try {
			await this.movieService.deleteMovieById(Number(id));
			res.status(204).json({ 
				status: true,
				message: "Delete successfully"
			});
		} catch (error) {
			res.status(500).json({ error: 'An error occurred while deleting the movie' });
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
			const newMovie = await this.movieService.createMovie(
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

	getMoviesTrending = async (req: Request, res: Response) => {
		try {

			const movies = await this.movieService.getMoviesTrending();
			return res.json(movies);
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: 'Err while get movies trending.' });
		}
	};

	getMoviesRecommender = async (req: Request, res: Response) => {
		try {

			const movies = await this.movieService.getMoviesRecommender();
			return res.json(movies);
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: 'Err while get movies recommender.' });
		}
	};

	getMoviesUpcoming = async (req: Request, res: Response) => {
		try {

			const movies = await this.movieService.getMoviesUpcoming();
			return res.json(movies);
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: 'Err while get movies upcoming .' });
		}
	};

	getMoviesForVip = async (req: Request, res: Response) => {
		try {

			const movies = await this.movieService.getMoviesForVip();
			return res.json(movies);
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: 'Err while get movies for vip.' });
		}
	};
}
