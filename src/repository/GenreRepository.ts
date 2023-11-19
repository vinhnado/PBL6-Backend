import { Genre } from '../models/Genre';
import Database from '../config/database';
import { Op, QueryTypes, literal, OrderItem, Sequelize } from 'sequelize';
import Container, { Service } from 'typedi';
import { BaseRepository } from './BaseRepository';
import { IRecommenderRepository } from './Interfaces/IRecommenderRepository';
import { WatchHistory } from '../models/WatchHistory';
import { WatchLater } from '../models/WatchLater';
import { MovieFavorite } from '../models/MovieFavorite';
import { IGenreRepository } from './Interfaces/IGenreRepository';

const db = Database.getInstance();


@Service()
export class GenreRepository extends BaseRepository<Genre> implements IGenreRepository {
	
	constructor(){
		super(Genre);
	}

    async getAllGenre(): Promise<Genre[]> {
        return await this.model.findAll({
            attributes: ['genre_id', 'name'],
            order: [['genre_id', 'ASC']]
        });
    }
}
