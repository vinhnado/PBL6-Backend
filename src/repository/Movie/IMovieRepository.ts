import { Movie } from '../../models/Movie';

export interface IMovieRepository {
	getAllMovies(): Promise<Movie[]>;
	getMovieById(id: number): Promise<Movie | null>;
	getMoviesByGenre(genreName: string): Promise<Movie[]>;
	createMovie(
		title: string,
		description: string,
		releaseDay: Date,
		serverUrl: string
	): Promise<Movie>;
	updateMovie(
		id: number,
		title: string,
		description: string,
		releaseDay: Date,
		serverUrl: string
	): Promise<boolean>;
	deleteMovie(id: number): Promise<boolean>;
}
