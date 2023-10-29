import { Inject, Service } from 'typedi';
import { Movie } from '../models/Movie';
import { IMovieService } from './Interfaces/IMovieService';
import { IMovieRepository } from '../repository/Interfaces/IMovieRepository';
import { MovieRepository } from '../repository/MovieRepository';
import { ISearchMovieOption } from '../repository/Interfaces/ISearchMovieOption';
import { S3Service } from './S3Service';


@Service()
export class MovieService implements IMovieService {

	@Inject(() => MovieRepository)
	private movieRepository!: IMovieRepository;

	@Inject(() => S3Service)
	private s3Service!: S3Service;


	public async searchMovies(
		options: ISearchMovieOption,
		page: number,
		pageSize: number
	): Promise<Movie[]> {
		try {
			let movies = await this.movieRepository.searchMovies(
				options,
				page=page,
				pageSize=pageSize
			);
			for (const movie of movies) {
				movie.posterURL = await this.s3Service.getObjectUrl(movie.posterURL);
				movie.trailerURL = await this.s3Service.getObjectUrl(movie.trailerURL);
				movie.backgroundURL = await this.s3Service.getObjectUrl('movies/'.concat((movie.movieId).toString(),'/background.jpg'));
			  }
		  
			return movies;
		} catch (error: any) {
			throw new Error('Không thể lấy danh sách phim: ' + error.message);
		}
	}

	public async getMovieById(id: number): Promise<Movie | null> {
		try {
			let movie = await this.movieRepository.getMovieById(id);
			if(movie){
				movie.posterURL = await this.s3Service.getObjectUrl(movie.posterURL);
				movie.trailerURL = await this.s3Service.getObjectUrl(movie.trailerURL);
				movie.backgroundURL = await this.s3Service.getObjectUrl('movies/'.concat((movie.movieId).toString(),'/background.jpg'));
				for (const episode of movie.episodes) {
					episode.posterUrl = await this.s3Service.getObjectUrl(episode.posterUrl);
					episode.movieUrl = await this.s3Service.getObjectUrl(episode.movieUrl);
				}
			}
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
			console.log(id);
			
			const movie = await this.movieRepository.findById(id);
			console.log(movie);
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
}
