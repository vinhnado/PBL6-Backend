import { Movie } from '../../models/Movie';

export interface IMovieService {
	searchMovies(
		searchConditions: any,
		page: number,
		pageSize: number
	): Promise<Movie[]>;
	getMovieById(id: number): Promise<Movie | null>;
}
