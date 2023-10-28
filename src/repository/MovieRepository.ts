import { Movie } from '../models/Movie';
import { Genre } from '../models/Genre';
import { MovieGenre } from '../models/MovieGenre';
import { IMovieRepository } from './Interfaces/IMovieRepository';
import Database from '../config/database';
import { Op, QueryTypes, literal, OrderItem, Sequelize } from 'sequelize';
import { Actor } from '../models/Actor';
import { Director } from '../models/Director';
import { Episode } from '../models/Episode';
import Container, { Service } from 'typedi';
import { ISearchMovieOption } from './Interfaces/ISearchMovieOption';

const db = Database.getInstance();


@Service()
export class MovieRepository implements IMovieRepository {
	async searchMovies(options: ISearchMovieOption, page: number, pageSize: number) {
		const { search, genre, nation, year, isSeries, sort, sortType } = options;
	  
		const whereCondition: any = {};
		const whereConditionGenre: any = {};

		if (search) {
		  whereCondition[Op.or] = [
			{ 'title': { [Op.iLike]: `%${search}%` } },
			{ 'description': { [Op.iLike]: `%${search}%` } },
		  ];
		}else{
			const search='';
		}

		if(genre){
			whereConditionGenre['genreId'] = genre;
		}
	  
		if (nation) {
		  whereCondition['nation'] = nation;
		}
	  
		if (year) {
		  whereCondition['release_date'] = {
			[Op.between]: [new Date(year, 0, 1), new Date(year, 11, 31)],
		  };
		}
	  
		if (isSeries !== undefined) {
		  whereCondition['isSeries'] = isSeries;
		}
	  
		const sortFieldMap = {
			highRated: 'average_rating',
			newest: 'release_date',
			highViewed: 'highViewed',
			highFavorited: 'num_favorite',
		  };

		let sortField = 'movie_id';
		let sortBy = 'ASC';
		if(sort){
			sortField = sortFieldMap[sort] || 'movieId';;
		}
		if(sortType){
			sortBy = sortType || 'ASC';
		}
		const offset = (page - 1) * pageSize;
		// console.log(whereCondition);
	  
		const movies = await Movie.findAll({
		   attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] },
		  where: whereCondition,
			// where :
		  include: [
			{
				model: Genre,
				attributes: ['genre_id', 'name'],
				as: 'genres',
				//   required: true,
				where: whereConditionGenre, // Lọc theo ID thể loại
				through: { attributes: [] },
			},
			{
				model: Actor,
				attributes: ['actor_id', 'name'],
				through: { attributes: [] },
				// where: { name: { [Op.iLike]: search } },
			},
			{
				model: Director,
				attributes: ['director_id', 'name'],
				through: { attributes: [] },
			},
			{
				model: Episode,
				attributes: [
					'episode_id',
					'episode_no',
					'movie_url',
					'episodeTitle',
				],
			},

		  ],
		  order:[
			[`${sortField}`,`${sortBy}`]
		  ],
		  limit: pageSize, // Số lượng kết quả trên mỗi trang
		  offset: offset, // Vị trí bắt đầu
		});
	  
		return movies;
	  }


	async getMovieById(id: number): Promise<Movie | null> {
		try {
			const movie = await Movie.findByPk(id, {
				include: Genre,
			});

			return movie || null;
		} catch (error: any) {
			throw new Error('Không thể lấy thông tin phim: ' + error.message);
		}
	}

	async getAllMovies(): Promise<Movie[]> {
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
					},
					{
						model: Actor,
						attributes: ['actor_id', 'name'],
						through: { attributes: [] },
					},
					{
						model: Director,
						attributes: ['director_id', 'name'],
						through: { attributes: [] },
					},
					{
						model: Episode,
						attributes: [
							'episode_id',
							'episode_no',
							'movie_url',
							'episodeTitle',
						],
					},
				],
				order: [['release_date', 'DESC']],
			});
			return movies;
		} catch (error) {
			throw new Error('Could not fetch movies');
		}
	}

	async deleteMovieById(id: number): Promise<void> {
		try {
			const movieToDelete = await Movie.destroy({
				where: {
					movie_id: id,
				},
			});
		} catch (error) {
			throw new Error('Could not delete movie');
		}
	}

	async createMovie(
		title: string,
		description: string,
		releaseDate: Date,
		nation: string,
		posterURL: string,
		trailerURL: string,
		averageRating: string,
		episodeNum: number,
		level: number
	): Promise<Movie> {
		try {
			const newMovie = await Movie.create({
				title,
				description,
				releaseDate,
				nation,
				posterURL,
				trailerURL,
				averageRating,
				episodeNum,
				level,
			});

			return newMovie;
		} catch (error) {
			throw new Error('Could not create movie');
		}
	}
}

// Container.set({ id: 'MovieRepository', value: new MovieRepository() });
