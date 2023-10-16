import { Inject, Service } from 'typedi';
import { Movie } from '../models/Movie';
import { IMovieService } from './Interfaces/IMovieService';
import { IMovieRepository } from '../repository/Interfaces/IMovieRepository';
import { MovieRepository } from '../repository/MovieRepository';

@Service()
export class MovieService implements IMovieService {
	@Inject(() => MovieRepository)
	private movieRepository!: IMovieRepository;

	public async searchMovies(
		searchConditions: any,
		page: number,
		pageSize: number
	): Promise<Movie[]> {
		try {
			return await this.movieRepository.searchMovies(
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
			return await this.movieRepository.getMovieById(id);
		} catch (error: any) {
			throw new Error('Không thể lấy thông tin phim: ' + error.message);
		}
	}

	async getAllMovies(): Promise<Movie[]> {
		try {
			const movies = await this.movieRepository.getAllMovies();
			return movies;
		} catch (error) {
			throw new Error('Could not fetch movies');
		}
	}

	async deleteMovieById(id: number): Promise<void> {
		try {
			await this.movieRepository.deleteMovieById(id);
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
}
