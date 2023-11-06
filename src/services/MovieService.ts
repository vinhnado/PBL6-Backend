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

@Service()
export class MovieService implements IMovieService {
	@Inject(() => MovieRepository)
	private movieRepository!: IMovieRepository;

	@Inject(() => S3Service)
	private s3Service!: S3Service;

	private redis: Redis; // Create a Redis client

	constructor() {
		this.redis = new Redis({
			host: 'redis',
			port: 6379,
		}); // Initialize the Redis client
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
		title: string,
		description: string,
		releaseDate: Date,
		nation: string,
		posterURL: string,
		trailerURL: string,
		averageRating: string,
		episodeNum: number,
		level: number
	): Promise<Movie> {
		try {
			const newMovie = await this.movieRepository.createMovie(
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

			return newMovie;
		} catch (error) {
			throw new Error('Could not create movie');
		}
	}

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
}
