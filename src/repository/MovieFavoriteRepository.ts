import { Service } from 'typedi';
import { BaseRepository } from './BaseRepository';
import { MovieFavorite } from '../models/MovieFavorite';

@Service()
export class MovieFavoriteRepository extends BaseRepository<MovieFavorite> {
	constructor() {
		super(MovieFavorite);
	}
}
