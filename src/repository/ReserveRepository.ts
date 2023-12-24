import Database from '../config/database';
import { Op, QueryTypes, literal, OrderItem, Sequelize } from 'sequelize';
import Container, { Service } from 'typedi';
import { BaseRepository } from './BaseRepository';
import { IReserveRepository } from './Interfaces/IReserveRepository';
import { Reserve } from '../models/Reserve';
import { Movie } from '../models/Movie';
import { User } from '../models/User';

const db = Database.getInstance();


@Service()
export class ResrveRepository extends BaseRepository<Reserve> implements IReserveRepository {
	
	constructor(){
		super(Reserve);
	}
    
    async getReserveMovieOfUser(userId: number): Promise<Reserve[]> {
        try {
            const reserves = await this.model.findAll({
                where:{
                    userId: userId
                },
            });
            
            return reserves;
        } catch (error) {
            console.log(error);
            throw(error);
        }
    }

    async getMoviesReserveOfUser(userId: number): Promise<Movie[]> {
        try {
            const reserveList = await User.findOne({
				where: { userId: userId },
				attributes: ['userId'],
				include: [
					{
						model: Movie,
						as: 'reserveList',
						attributes: {
							exclude: ['createdAt', 'updatedAt', 'deletedAt'],
						},
						through: { attributes: ['updatedAt'] },
					},
				],
			});
            if(!reserveList){
                return [];
            }
            return reserveList.reserveList;
        } catch (error) {
            console.log(error);
            throw(error);
        }
    }

    async addReserve(data: any): Promise<Reserve> {
        try {
            const rs = await this.model.create(data);
            
            return rs;
        } catch (error) {
            throw (error);
        }
    }

    
}