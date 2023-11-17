import { Genre } from '../../models/Genre';
import { Movie } from '../../models/Movie';
import { BaseInterface } from './BaseInterface';

export interface IGenreRepository extends BaseInterface {

	getAllGenre(): Promise<any>;
}
