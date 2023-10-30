import { Movie } from '../../models/Movie';
import { BaseInterface } from './BaseInterface';
import { ISearchMovieOption } from './ISearchMovieOption';

export interface IMovieRepository extends BaseInterface {
	searchMovies(	
		whereCondition: any,
		whereConditionGenre: any,
		page: number,
		pageSize: number,
		sortField: string,
		sortBy: string
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
}
