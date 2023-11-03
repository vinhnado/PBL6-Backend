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
import { BaseRepository } from './BaseRepository';

const db = Database.getInstance();


@Service()
export class MovieRepository extends BaseRepository<Movie> implements IMovieRepository {
	
	constructor(){
		super(Movie);
	}
	
	async searchMovies(whereCondition: any, whereConditionGenre: any, page: number, pageSize: number, sortField: string, sortBy: string) {
	
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

	/**
	 * Get movie by id_movie
	 * @param id 
	 * @returns Promise<Movie | null>
	 */
	async getMovieById(id: number): Promise<Movie | null> {
		try {
			const movie = await Movie.findByPk(id, {
				attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] },
				include: [
					{
						model: Genre,
						attributes: ['genre_id', 'name'],
						as: 'genres',
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
						attributes: ['episode_id', 'movie_id', 'title', 'release_date', 'num_view', 'duration', 'episode_no'],
					},
		
				  ],
			});

			return movie || null;
		} catch (error: any) {
			throw new Error('Can not get movie: ' + error.message);
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

	getMoviesTrending(): Promise<Movie[]> {
		throw new Error('Method not implemented.');
	}
	getMoviesRecommender(): Promise<Movie[]> {
		throw new Error('Method not implemented.');
	}
	getMoviesUpcoming(): Promise<Movie[]> {
		throw new Error('Method not implemented.');
	}
}

// Container.set({ id: 'MovieRepository', value: new MovieRepository() });
