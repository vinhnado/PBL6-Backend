import { Movie } from '../../models/Movie';
import { MovieGenre } from '../../models/MovieGenre';
import { BaseInterface } from './BaseInterface';
import { ISearchMovieOption } from './ISearchMovieOption';

export interface IRecommenderRepository extends BaseInterface {

	getAllMovie(): Promise<any>;
    getDataMoviesOfUser(userId: number): Promise<Movie[]>;
    getMovieGenre(): Promise<MovieGenre[]>;
}
