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
}
