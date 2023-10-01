import { Movie } from '../../models/Movie';
import { MovieRepository } from '../../repository/Movie/MovieRepository';
import { IMovieService } from './IMovieService';

const movieRepository = MovieRepository.getInstance();

export class MovieService implements IMovieService {
	private static instance: MovieService | null = null;

	private constructor() {}

	public static getInstance(): MovieService {
		if (!MovieService.instance) {
			MovieService.instance = new MovieService();
		}
		return MovieService.instance;
	}

	public async searchMovies(
		searchConditions: any,
		page: number,
		pageSize: number
	): Promise<Movie[]> {
		try {
			return await movieRepository.searchMovies(
				searchConditions,
				page,
				pageSize
			);
		} catch (error: any) {
			throw new Error('Không thể lấy danh sách phim: ' + error.message);
		}
	}

	public async getMovieById(id: number): Promise<Movie | null> {
		try {
			return await movieRepository.getMovieById(id);
		} catch (error: any) {
			throw new Error('Không thể lấy thông tin phim: ' + error.message);
		}
	}

	async getAllMovies(): Promise<Movie[]> {
		try {
			const movies = await movieRepository.getAllMovies();
			return movies;
		} catch (error) {
			throw new Error('Could not fetch movies');
		}
	}

	async deleteMovieById(id: number): Promise<void> {
		try {
		  await movieRepository.deleteMovieById(id);
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
		  const newMovie = await movieRepository.createMovie(
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
}
