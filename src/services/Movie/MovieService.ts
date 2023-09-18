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

	public async getAllMovies(): Promise<Movie[]> {
		try {
			return await movieRepository.getAllMovies();
		} catch (error: any) {
			throw new Error('Không thể lấy danh sách phim: ' + error.message);
		}
	}

	public async getAllMovies1(): Promise<Movie[]> {
		try {
			return await movieRepository.getAllMovies1();
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

	async getMoviesByGenre(genreName: string): Promise<Movie[]> {
		try {
			return await movieRepository.getMoviesByGenre(genreName);
		} catch (error: any) {
			throw new Error(
				'Không thể lấy danh sách phim theo thể loại: ' + error.message
			);
		}
	}

	async createMovie(
		title: string,
		description: string,
		releaseDay: Date,
		serverUrl: string
	): Promise<Movie> {
		try {
			return await movieRepository.createMovie(
				title,
				description,
				releaseDay,
				serverUrl
			);
		} catch (error: any) {
			throw new Error('Không thể tạo phim: ' + error.message);
		}
	}

	async updateMovie(
		id: number,
		title: string,
		description: string,
		releaseDay: Date,
		serverUrl: string
	): Promise<boolean> {
		try {
			return await movieRepository.updateMovie(
				id,
				title,
				description,
				releaseDay,
				serverUrl
			);
		} catch (error: any) {
			throw new Error('Không thể cập nhật phim: ' + error.message);
		}
	}

	async deleteMovie(id: number): Promise<boolean> {
		try {
			return await movieRepository.deleteMovie(id);
		} catch (error: any) {
			throw new Error('Không thể xóa phim: ' + error.message);
		}
	}
}
