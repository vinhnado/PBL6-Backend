import { MovieService } from './../services/MovieService';
import express, { Request, Response, Router } from 'express';
import Container from 'typedi';
import { IMovieService } from '../services/Interfaces/IMovieService';
import { IRecommenderService } from '../services/Interfaces/IRecommenderService';
import { RecommenderSerivce } from '../services/RecommenderService';

export class MovieController {
	private movieService: IMovieService;
	private recommenderService: IRecommenderService;

	constructor() {
		this.movieService = Container.get(MovieService);
		this.recommenderService = Container.get(RecommenderSerivce)
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

	getAllMovies = async (req: Request, res: Response) => {
		try {
			const movies = await this.movieService.getAllMovies();
			return res.json(movies);
		} catch (error) {
			return res.status(500).json({ error: 'Không thể lấy danh sách phim' });
		}
	};

	deleteMovieById = async (req: Request, res: Response) => {
		const { id } = req.query;
		try {
			await this.movieService.deleteMovieById(Number(id));
			return res.status(204).json({ 
				status: true,
				message: "Delete successfully"
			});
		} catch (error) {
			return res.status(500).json({ error: 'An error occurred while deleting the movie' });
		}
	};

	createMovie = async (req: Request, res: Response): Promise<void> => {
		const {
			title,
			description,
			releaseDate,
			nation,
			level,
			isSeries
		} = req.body;

		try {
			// Gọi service để tạo bộ phim mới
			const newMovie = await this.movieService.createMovie(
				title,
				description,
				releaseDate,
				nation,
				level,
				isSeries
			);

			res.status(201).json(newMovie);
		} catch (error) {
			res.status(500).json({ error: 'Can not create new movie' });
		}
	};

	updateMovie =async (req: Request, res: Response) => {
		try {
			// Gọi service để tạo bộ phim mới
			const movieUpdate = await this.movieService.updateMovie(req, res);
			if (movieUpdate) {
				return res.status(200).json(movieUpdate);
			}
			return res.status(404).json({ error: 'Movie not found or not updated.' });
		} catch (error) {
			return res.status(500).json({ error: 'Internal server error.' });
		}
	}

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
	
	getMoviesRecommender1 = async (req: Request, res: Response) => {
		try {
			console.log("hello MovieController");
			const movies = await this.recommenderService.createMatrix();
			return res.json(movies);
		} catch (error) {
			console.log("Loi o controller");
		}
	}
}
