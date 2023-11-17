import { Movie } from '../models/Movie';
import { Genre } from '../models/Genre';
import Database from '../config/database';
import { Op, QueryTypes, literal, OrderItem, Sequelize } from 'sequelize';
import Container, { Service } from 'typedi';
import { BaseRepository } from './BaseRepository';
import { IRecommenderRepository } from './Interfaces/IRecommenderRepository';
import { WatchHistory } from '../models/WatchHistory';
import { WatchLater } from '../models/WatchLater';
import { MovieFavorite } from '../models/MovieFavorite';
import { MovieGenre } from '../models/MovieGenre';

const db = Database.getInstance();


@Service()
export class RecommenderRepository extends BaseRepository<Movie> implements IRecommenderRepository {
	
	constructor(){
		super(Movie);
	}

    /**
     * Get all movies and genres to calculate maxtrix
     * 
     * @returns Promise<Movie[]> 
     */
    async getAllMovie(): Promise<any> {
		try {
			const movies = await Movie.findAndCountAll({
				attributes: ['movie_id', 'title'],
				include:{
					model: Genre,
					through: { attributes: [] },
					attributes: ['genre_id', 'name'],
				},
				order: [['movie_id', 'ASC']],
			});
            
			return movies;
		} catch (error) {
			throw new Error('Could not get movies and genres');
		}
    }

	async getMovieGenre(): Promise<MovieGenre[]> {
		try {
			const movies = await MovieGenre.findAll({
				attributes: ['movie_id', 'genre_id'],
				order: [['movie_id', 'ASC']],
			});
            
			return movies;
		} catch (error) {
			throw new Error('Could not get movies and genres');
		}
	}

    /**
     * Get data movies of user include watching history, favorite, rating movie of user
     * 
     * @returns Promise<Movie[]> 
     */
    async getDataMoviesOfUser(userId: number): Promise<Movie[]> {
		try {
			const movies = await Movie.findAll({
				attributes: {
					exclude: ['deletedAt', 'updatedAt', 'createdAt'],
				},
				include: [
					{
						model: Genre,
						attributes: ['genre_id', 'name'],
						through: { attributes: [] },
				        order: [['genre_id', 'ASC']],
					},
                    {
						model: MovieFavorite,
					},
                    {
						model: WatchLater,
					},
				],
				order: [['movie_id', 'ASC']],
			});
			return movies;
		} catch (error) {
			throw new Error('Could not get movies and genres');
		}
    }
}
