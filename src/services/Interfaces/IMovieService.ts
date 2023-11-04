import { Movie } from '../../models/Movie';

export interface IMovieService {
	searchMovies(
		searchConditions: any,
		page: number,
		pageSize: number
	): Promise<Movie[]>;
	getMovieById(id: number): Promise<Movie | null>;
	getAllMovies(): Promise<Movie[]>;
	deleteMovieById(id: number): Promise<void>;
	createMovie(
		title: string,
		description: string,
		releaseDate: Date,
		nation: string,
		posterURL: string,
		trailerURL: string,
		averageRating: string,
		episodeNum: number,
		level: number
	  ): Promise<Movie>;

	getMoviesTrending(): Promise<Movie[]>;
	getMoviesRecommender(): Promise<Movie[]>;
	getMoviesUpcoming(): Promise<Movie[]>;
	getMoviesForVip(): Promise<Movie[]>;
}
