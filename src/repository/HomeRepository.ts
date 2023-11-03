import Database from '../config/database';
import { Op, QueryTypes, literal, OrderItem, Sequelize } from 'sequelize';
import Container, { Service } from 'typedi';
import { IHomeRepository } from './Interfaces/IHomeRepository';
import { Genre } from '../models/Genre';
import { BaseRepository } from './BaseRepository';
import { Movie } from '../models/Movie';

const db = Database.getInstance();


@Service()
export class HomeRepository extends BaseRepository<Genre> implements IHomeRepository {

    constructor(){
		super(Genre);
	}
    getMoviesByGenre(genreId: number ,page: number, pageSize: number, sortMovie?: string): Promise<Genre[]> {
        const whereCondition: any = {};
        if(genreId){
			whereCondition['genreId'] = genreId;
		}
        const offset = (page - 1) * pageSize;

        return this.model.findAll({
            where: whereCondition,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
            },
            include: [{
                model: Movie,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'deletedAt', 'trailerURL']
                },
                through: { attributes: [] },
            }],
            order:[
                ['genre_id','ASC'],
            ],
            limit: pageSize, // Số lượng kết quả trên mỗi trang
            offset: offset, // Vị trí bắt đầu
        });
    }
    
    getHomePoster(): Promise<string[]> {
        throw new Error('Method not implemented.');
    }
}
