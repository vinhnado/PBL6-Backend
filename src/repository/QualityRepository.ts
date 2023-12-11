import Container, { Service } from 'typedi';
import { BaseRepository } from './BaseRepository';
import { IRecommenderRepository } from './Interfaces/IRecommenderRepository';
import { WatchHistory } from '../models/WatchHistory';
import { WatchLater } from '../models/WatchLater';
import { MovieFavorite } from '../models/MovieFavorite';
import { IGenreRepository } from './Interfaces/IGenreRepository';
import { Quality } from '../models/Quality';

@Service()
export class QualityRepository extends BaseRepository<Quality> implements QualityRepository {
	
	constructor(){
		super(Quality);
	}
}