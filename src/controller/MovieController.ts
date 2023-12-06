import { MovieService } from './../services/MovieService';
import express, { Request, Response, Router } from 'express';
import Container from 'typedi';
import { IMovieService } from '../services/Interfaces/IMovieService';
import { IRecommenderService } from '../services/Interfaces/IRecommenderService';
import { RecommenderSerivce } from '../services/RecommenderService';
import { UserService } from '../services/UserService';

export class MovieController {
	private movieService: IMovieService;
	private recommenderService: IRecommenderService;
	private userService: UserService;

	constructor() {
		this.userService = Container.get(UserService);
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
			const newMovie = await this.movieService.createMovie(req);

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
	
	getMoviesRecommender = async (req: Request, res: Response) => {
		try {
			const page = Number(req.query.page) || 1; // Trang mặc định là 1
			const pageSize = Number(req.query.pageSize) || 5; // Số lượng kết quả trên mỗi trang mặc định là 10
			// const searchConditions = {
			// 	userId: req.payload.userId,
			// };
			// const user = await this.userService.findOneUser(searchConditions);
			const userId = Number(req.payload.userId);
			
			if(!userId){
				const movies = await this.movieService.getMoviesRecommender();
				return res.json(movies);
			}
			const movies = await this.recommenderService.getMoviesRecommend(userId,page,pageSize);
			return res.json(movies);
		} catch (error) {
			console.log(error);
			console.log("Err while get recommend movies");
		}
	}

	getAllNations = async (req: Request, res: Response) => {
		try {
			const nations = await this.movieService.getAllNations();
			return res.json(nations);
		} catch (error) {
			console.log("Err while get all nations");
		}
	}

	getAllReleaseYears = async (req: Request, res: Response) => {
		try {
			const years = await this.movieService.getAllReleaseYears();
			return res.json(years);
		} catch (error) {
			console.log("Err while get all released year");
		}
	}

	getPresignUrlToUpload = async (req: Request, res: Response) => {
		try {
			const movieId = Number(req.query.movieId);
			const url = await this.movieService.getPresignUrlToUploadMovie(movieId);
			return res.status(200).json(url);
		} catch (error) {
			console.log("Could not get presignUrl to upload movies.");
			return res.status(404).json({
				message: "Could not get presignUrl",
			});
		}
	}

 	addActorForMovie= async(req: Request, res: Response) => {
		try {
			const results =  await this.movieService.addActorForMovie(req);
			res.status(200).json({
				message: "successful",
				rowEffected:results
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				message: "Server Error!"
			});
		}
	}

	deleteActorOfMovie= async(req: Request, res: Response) => {
		try {
			const results =  await this.movieService.deleteActorOfMovie(req);
			res.status(200).json({
				message: "successful",
				rowEffected:results
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				message: "Server Error!"
			});
		}
	}

	addDirectorsForMovie= async(req: Request, res: Response) => {
		try {
			const results =  await this.movieService.addDirectorsForMovie(req);
			res.status(200).json({
				message: "successful",
				rowEffected:results
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				message: "Server Error!"
			});
		}
	}

	deleteDirectorsOfMovie= async(req: Request, res: Response) => {
		try {
			const results =  await this.movieService.deleteDirectorsOfMovie(req);
			res.status(200).json({
				message: "successful",
				rowEffected:results
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				message: "Server Error!"
			});
		}
	}

	addGenresForMovie= async(req: Request, res: Response) => {
		try {
			const results =  await this.movieService.addGenresForMovie(req);
			res.status(200).json({
				message: "successful",
				rowEffected:results
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				message: "Server Error!"
			});
		}
	}

	deleteGenresOfMovie= async(req: Request, res: Response) => {
		try {
			const results =  await this.movieService.deleteGenresOfMovie(req);
			res.status(200).json({
				message: "successful",
				rowEffected:results
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				message: "Server Error!"
			});
		}
	}
}
