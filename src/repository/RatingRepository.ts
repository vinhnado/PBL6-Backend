import { Movie } from '../models/Movie';
import { Genre } from '../models/Genre';
import Database from '../config/database';
import { Op, QueryTypes, literal, OrderItem, Sequelize } from 'sequelize';
import Container, { Service } from 'typedi';
import { BaseRepository } from './BaseRepository';
import { IRatingRepository } from './Interfaces/IRatingRepository';
import { Rating } from '../models/Rating';

const db = Database.getInstance();


@Service()
export class RatingRepository extends BaseRepository<Rating> implements IRatingRepository {
	
	constructor(){
		super(Rating);
	}
    getRatingOfMovie(movieId: number): Promise<Rating[]> {
        try {
           const ratings = this.model.findAll({
                where: {
                    movie_id: movieId,
                },
                attributes: {exclude: ['deletedAt']},
                order: [['createdAt', 'ASC']]
           }); 
           return ratings;
        } catch (error) {
            throw new Error('Method not implemented.');
        }
    }
}