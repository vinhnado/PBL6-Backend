import { Inject, Service } from 'typedi';
import { Movie } from '../models/Movie';
import { IMovieService } from './Interfaces/IMovieService';
import { IMovieRepository } from '../repository/Interfaces/IMovieRepository';
import { MovieRepository } from '../repository/MovieRepository';
import { ISearchMovieOption } from '../repository/Interfaces/ISearchMovieOption';
import { S3Service } from './S3Service';
import { Op } from 'sequelize';
import Redis from 'ioredis';
import crypto from 'crypto'; // Import the built-in crypto library
import express, { Request, Response } from 'express';
import { MovieActor } from '../models/MovieActor';
import { MovieActorRepository } from '../repository/MovieActorRepository';
import { IMovieActorRepository } from '../repository/Interfaces/IMovieActorRepository';
import { MovieDirectorRepository } from '../repository/MovieDirectorRepository';
import { IMovieDirectorRepository } from '../repository/Interfaces/IMovieDirectorRepository';
import { IMovieGenreRepository } from '../repository/Interfaces/IMovieGenreRepository';
import { MovieGenreRepository } from '../repository/MovieGenreRepository';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { MovieDirector } from '../models/MovieDirector';
import { MovieGenre } from '../models/MovieGenre';

@Service()
export class MovieService implements IMovieService {
	@Inject(() => MovieRepository)
	private movieRepository!: IMovieRepository;

	@Inject(() => MovieActorRepository)
	private movieActorRepository!: IMovieActorRepository;

	@Inject(() => MovieDirectorRepository)
	private movieDirectorRepository!: IMovieDirectorRepository;

	@Inject(() => MovieGenreRepository)
	private movieGenreRepository!: IMovieGenreRepository;

	@Inject(() => S3Service)
	private s3Service!: S3Service;

	private redis: Redis; // Create a Redis client

	constructor() {
		this.redis = new Redis({
			host: 'redis',
			port: 6379,
		}); // Initialize the Redis client
	}

	public clearCache(){
		this.redis.flushall((err, reply) => {
			if (err) {
			  console.error(err);
			} else {
			  console.log('Cache cleared:', reply === 'OK');
			}
			this.redis.quit();
		});
	}

	static generateMD5Hash(input: string): string {
		return crypto.createHash('md5').update(input).digest('hex');
	}

	public async searchMovies(
		options: ISearchMovieOption,
		page: number,
		pageSize: number
	): Promise<Movie[]> {
		try {
			const cacheKey = MovieService.generateMD5Hash(
				`searchMovies:${JSON.stringify(options)}:${page}:${pageSize}`
			);
			const cachedResult = await this.redis.get(cacheKey);
			if (cachedResult) {
				return JSON.parse(cachedResult);
			}
			const { search, genre, nation, year, isSeries, sort, sortType } = options;

			const whereCondition: any = {};
			const whereConditionGenre: any = {};

			if (search) {
				whereCondition[Op.or] = [
					{ title: { [Op.iLike]: `%${search}%` } },
					{ description: { [Op.iLike]: `%${search}%` } },
				];
			} else {
				const search = '';
			}

			if (genre) {
				whereConditionGenre['genreId'] = genre;
			}

			if (nation) {
				whereCondition['nation'] = nation;
			}

			if (year) {
				whereCondition['release_date'] = {
					[Op.between]: [new Date(year, 0, 1), new Date(year, 11, 31)],
				};
			}

			if (isSeries !== undefined) {
				whereCondition['isSeries'] = isSeries;
			}

			const sortFieldMap = {
				highRated: 'average_rating',
				newest: 'release_date',
				highFavorited: 'num_favorite',
			};

			let sortField = 'movie_id';
			let sortBy = 'ASC';
			if (sort) {
				sortField = sortFieldMap[sort] || 'movieId';
			}
			if (sortType) {
				sortBy = sortType || 'ASC';
			}

			let movies = await this.movieRepository.searchMovies(
				whereCondition,
				whereConditionGenre,
				(page = page),
				(pageSize = pageSize),
				sortField,
				sortBy
			);
			for (const movie of movies) {
				movie.posterURL = await this.s3Service.getObjectUrl(movie.posterURL);
				movie.trailerURL = await this.s3Service.getObjectUrl(movie.trailerURL);
				movie.backgroundURL = await this.s3Service.getObjectUrl(
					'movies/'.concat(movie.movieId.toString(), '/background.jpg')
				);
			}

			await this.redis.set(cacheKey, JSON.stringify(movies), 'EX', 60);

			return movies;
		} catch (error: any) {
			throw new Error('Không thể lấy danh sách phim: ' + error.message);
		}
	}

	public async getMovieById(id: number): Promise<Movie | null> {
		try {
			const cacheKey = `getMovieById:${id}`;
			const cachedResult = await this.redis.get(cacheKey);
			if (cachedResult) {
				// If cached data is available, return it
				return JSON.parse(cachedResult);
			}

			let movie = await this.movieRepository.getMovieById(id);
			
			if (movie) {
				movie.posterURL = await this.s3Service.getObjectUrl(movie.posterURL);
				movie.trailerURL = await this.s3Service.getObjectUrl(movie.trailerURL);
				movie.backgroundURL = await this.s3Service.getObjectUrl(
					'movies/'.concat(movie.movieId.toString(), '/background.jpg')
				);
				for (const episode of movie.episodes) {
					if (episode.posterURL) {
						episode.posterURL = await this.s3Service.getObjectUrl(
							episode.posterURL
						);
					} else {
						episode.posterURL = await this.s3Service.getObjectUrl(
							'default/poster_default.jpg'
						);
					}
				}

				for (const actor of movie.actors) {
					if (actor.avatar) {
						actor.avatar = await this.s3Service.getObjectUrl(actor.avatar);
					} else {
						actor.avatar = await this.s3Service.getObjectUrl(
							'default/actor/avatar_default.jpg'
						);
					}
				}

				for (const director of movie.directors) {
					if (director.avatar) {
						director.avatar = await this.s3Service.getObjectUrl(
							director.avatar
						);
					} else {
						director.avatar = await this.s3Service.getObjectUrl(
							'default/director/avatar_default.jpg'
						);
					}
				}
			}
			//Save movie to cache
			await this.redis.set(cacheKey, JSON.stringify(movie), 'EX', 60 * 5);
			return movie;
		} catch (error: any) {
			throw new Error('Can not get movie: ' + error.message);
		}
	}

	async getAllMovies(): Promise<Movie[]> {
		try {
			return await this.movieRepository.getAllMovies();
		} catch (error) {
			throw new Error('Could not fetch movies');
		}
	}

	async deleteMovieById(id: number): Promise<void> {
		try {
			const movie = await this.movieRepository.findById(id);
			return await this.movieRepository.delete(movie);
		} catch (error) {
			throw new Error('Could not delete movie');
		}
	}

	async createMovie(
		req: Request
	): Promise<Movie> {
		try {
			const posterURL = '';
			const trailerURL = '';
			const backgroundURL = '';
			const averageRating = 0.0;
			const episodeNum = 0;
			const {
				title,
				description,
				releaseDate,
				nation,
				level,
				isSeries
			} = req.body;
			const newMovie = await this.movieRepository.createMovie(
				title,
				description,
				releaseDate,
				nation,
				posterURL,
				trailerURL,
				averageRating,
				episodeNum,
				level,
				backgroundURL,
				isSeries
			);
			const actorIds = req.body.actorIds;
			const directorIds = req.body.directorIds;
			const genreIds = req.body.genreIds;
			if(actorIds){
				await this.movieActorRepository.addActorsForMovie(newMovie.movieId, actorIds);
			}
			if(directorIds){
				await this.movieDirectorRepository.addDirectorsForMovie(newMovie.movieId, directorIds);
			}
			if(genreIds){
				await this.movieGenreRepository.addGenresForMovie(newMovie.movieId, genreIds);
			}
			return newMovie;
		} catch (error) {
			throw new Error('Could not create movie');
		}
	}

	async updateMovie(req: Request, res: Response): Promise<Movie | null> {
		try {
			const { id } = req.params;
			const updatedData = req.body;
			const [rowsAffected, updatedMovies] = await this.movieRepository.updateMovie(parseInt(id), updatedData);

			if (rowsAffected > 0) {
				return updatedMovies[0]; // Return the first updated movie
			}
			return null;
		} catch (error) {
			throw new Error('Update movie failed');
		}
	}
	// service.ts

	async getMoviesTrending(): Promise<Movie[]> {
		const cacheKey = 'moviesTrending';
		const cachedResult = await this.redis.get(cacheKey);
		if (cachedResult) {
			return JSON.parse(cachedResult);
		}
		try {
			let movies = await this.movieRepository.getMoviesTrending();
			for (const movie of movies) {
				movie.posterURL = await this.s3Service.getObjectUrl(movie.posterURL);
				movie.trailerURL = await this.s3Service.getObjectUrl(movie.trailerURL);
				movie.backgroundURL = await this.s3Service.getObjectUrl(
					'movies/'.concat(movie.movieId.toString(), '/background.jpg')
				);
			}
			await this.redis.set(cacheKey, JSON.stringify(movies), 'EX', 600);
			return movies;
		} catch (error) {
			throw new Error('Could not get movies trending.');
		}
	}

	async getMoviesRecommender(): Promise<Movie[]> {
		const cacheKey = 'moviesRecommender';
		const cachedResult = await this.redis.get(cacheKey);
		if (cachedResult) {
			return JSON.parse(cachedResult);
		}
		try {
			let movies = await this.movieRepository.getMoviesRecommender();
			for (const movie of movies) {
				movie.posterURL = await this.s3Service.getObjectUrl(movie.posterURL);
				movie.trailerURL = await this.s3Service.getObjectUrl(movie.trailerURL);
				movie.backgroundURL = await this.s3Service.getObjectUrl(
					'movies/'.concat(movie.movieId.toString(), '/background.jpg')
				);
			}
			await this.redis.set(cacheKey, JSON.stringify(movies), 'EX', 600);
			return movies;
		} catch (error) {
			throw new Error('Could not get movies Recommender.');
		}
	}

	async getMoviesUpcoming(): Promise<Movie[]> {
		const cacheKey = 'moviesUpcoming';
		const cachedResult = await this.redis.get(cacheKey);
		if (cachedResult) {
			return JSON.parse(cachedResult);
		}
		try {
			let movies = await this.movieRepository.getMoviesUpcoming();
			for (const movie of movies) {
				movie.posterURL = await this.s3Service.getObjectUrl(movie.posterURL);
				movie.trailerURL = await this.s3Service.getObjectUrl(movie.trailerURL);
				movie.backgroundURL = await this.s3Service.getObjectUrl(
					'movies/'.concat(movie.movieId.toString(), '/background.jpg')
				);
			}
			await this.redis.set(cacheKey, JSON.stringify(movies), 'EX', 600);
			return movies;
		} catch (error) {
			throw new Error('Could not get movies upcoming.');
		}
	}

	async getMoviesForVip(): Promise<Movie[]> {
		const cacheKey = 'moviesForVip';
		const cachedResult = await this.redis.get(cacheKey);
		if (cachedResult) {
			return JSON.parse(cachedResult);
		}
		try {
			let movies = await this.movieRepository.getMoviesForVip();
			for (const movie of movies) {
				movie.posterURL = await this.s3Service.getObjectUrl(movie.posterURL);
				movie.trailerURL = await this.s3Service.getObjectUrl(movie.trailerURL);
				movie.backgroundURL = await this.s3Service.getObjectUrl(
					'movies/'.concat(movie.movieId.toString(), '/background.jpg')
				);
			}
			await this.redis.set(cacheKey, JSON.stringify(movies), 'EX', 600);
			return movies;
		} catch (error) {
			throw new Error('Could not get movies for VIP privileges.');
		}
	}

	async getAllNations():Promise<string[]>
	{
		try {
			const nations = await this.movieRepository.getAllNations() as any;

			return nations;
		} catch (error) {
			throw new Error('Could not get nations of movies.');
		}
	}

	async getAllReleaseYears(): Promise<number[]>
	{
		try {
			return await this.movieRepository.getAllReleaseDates();
		} catch (error) {
			throw new Error('Could not get nations of movies.');
		}
	}

	async getPresignUrlToUploadMovie(movieId: number, option: string):  Promise<{ key: string, value: string }[]>
	{
		try {
			if(option === 'onlyPoster'){
				const poster = await this.s3Service.generatePresignedUrlUpdate('movies/'+movieId+'/poster.jpg','image/jpeg');
				const presignedUrls: { key: string, value: string }[] = [
					{ key: 'poster', value: poster },
				  ];
			  
				  return presignedUrls;
			}else if(option === 'onlyBackground'){
				const background = await this.s3Service.generatePresignedUrlUpdate('movies/'+movieId+'/background.jpg','image/jpeg');
				const presignedUrls: { key: string, value: string }[] = [
					{ key: 'background', value: background },
				  ];
				  return presignedUrls;	
			}else if(option === 'onlyTrailer'){
				const trailer = await this.s3Service.generatePresignedUrlUpdate('movies/'+movieId+'/trailer.mp4','video/mp4');
	
				const presignedUrls: { key: string, value: string }[] = [
					{ key: 'trailer', value: trailer },
				  ];
			  
				  return presignedUrls;
			}else if(option === 'posterAndBackground'){
				const poster = await this.s3Service.generatePresignedUrlUpdate('movies/'+movieId+'/poster.jpg','image/jpeg');
				const background = await this.s3Service.generatePresignedUrlUpdate('movies/'+movieId+'/background.jpg','image/jpeg');
	
				const presignedUrls: { key: string, value: string }[] = [
					{ key: 'poster', value: poster },
					{ key: 'background', value: background },
				  ];
			  
				  return presignedUrls;
			}else{
				const poster = await this.s3Service.generatePresignedUrlUpdate('movies/'+movieId+'/poster.jpg','image/jpeg');
				const background = await this.s3Service.generatePresignedUrlUpdate('movies/'+movieId+'/background.jpg','image/jpeg');
				const trailer = await this.s3Service.generatePresignedUrlUpdate('movies/'+movieId+'/trailer.mp4','video/mp4');
	
				const presignedUrls: { key: string, value: string }[] = [
					{ key: 'poster', value: poster },
					{ key: 'background', value: background },
					{ key: 'trailer', value: trailer },
				  ];
			  
				  return presignedUrls;
			}

		} catch (error) {
			throw(error);
		}
	}

	async addActorForMovie(req: Request): Promise<MovieActor[]> {
		try {
			const movieId = Number(req.body.movieId);
			const actorIds = req.body.actorIds;
			return await this.movieActorRepository.addActorsForMovie(movieId, actorIds);
		} catch (error) {
			throw(error);
		}
	}

	async deleteActorOfMovie(req: Request): Promise<number>
	{
		try {
			const movieId = Number(req.body.movieId);
			const actorIds = req.body.actorIds;
			return await this.movieActorRepository.deleteActorsOfMovie(movieId, actorIds);
		} catch (error) {
			throw(error);
		}
	}

	async addDirectorsForMovie(req: express.Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>): Promise<MovieDirector[]> {
		try {
			const movieId = Number(req.body.movieId);
			const directorIds = req.body.directorIds;
			return await this.movieDirectorRepository.addDirectorsForMovie(movieId, directorIds);
		} catch (error) {
			throw(error);
		}
	}
	async deleteDirectorsOfMovie(req: express.Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>): Promise<number> {
		try {
			const movieId = Number(req.body.movieId);
			const directorIds = req.body.directorIds;
			return await this.movieDirectorRepository.deleteDirectorsOfMovie(movieId, directorIds);
		} catch (error) {
			throw(error);
		} 
	}
	async addGenresForMovie(req: express.Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>): Promise<MovieGenre[]> {
		try {
			const movieId = Number(req.body.movieId);
			const genreIds = req.body.genreIds;
			return await this.movieGenreRepository.addGenresForMovie(movieId, genreIds);
		} catch (error) {
			throw(error);
		}
	}
	async deleteGenresOfMovie(req: express.Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>): Promise<number> {
		try {
			const movieId = Number(req.body.movieId);
			const genreIds = req.body.genreIds;
			return await this.movieGenreRepository.deleteGenresOfMovie(movieId, genreIds);
		} catch (error) {
			throw(error);
		}
	}
	// async updatePosterMovie()
}
