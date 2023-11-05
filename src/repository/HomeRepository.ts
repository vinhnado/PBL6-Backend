import Database from '../config/database';
import { Op, QueryTypes, literal, OrderItem, Sequelize, ModelCtor } from 'sequelize';
import Container, { Service } from 'typedi';
import { IHomeRepository } from './Interfaces/IHomeRepository';
import { Genre } from '../models/Genre';
import { BaseRepository } from './BaseRepository';
import { Movie } from '../models/Movie';
import { Home } from '../models/Home';

const db = Database.getInstance();


@Service()
export class HomeRepository extends BaseRepository<Genre> implements IHomeRepository {

    private homeModel: ModelCtor<Home>;

    constructor(){
		super(Genre);
        this.homeModel = Home;
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
    
    async getHomePoster(): Promise<Home[]> {
        try {
            const homes = await this.homeModel.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'deletedAt']
                },
                include: [{
                    model: Movie,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'deletedAt', 'trailerURL']
                    },
                }],
            });
            return homes;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách homes:', error);
            throw error;
        }
    }
}
