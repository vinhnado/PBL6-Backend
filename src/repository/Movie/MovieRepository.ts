import { Movie } from '../../models/Movie';
import { Genre } from '../../models/Genre';
import { MovieGenre } from '../../models/MovieGenre';
import { IMovieRepository } from './IMovieRepository';
import Database from '../../config/database';
import { Op, QueryTypes, literal } from 'sequelize';
import { Actor } from '../../models/Actor';
import { Director } from '../../models/Director';
import { Episode } from '../../models/Episode';

const db = Database.getInstance();
export class MovieRepository implements IMovieRepository {
	async searchMovies(
		searchConditions: any,
		page: number,
		pageSize: number
	): Promise<Movie[]> {
		try {
			const { title, genre, nation, year, isSeries } = searchConditions;
			let genre_name: string;
			const whereConditions: { [key: string]: any } = {};

			if (title) {
				whereConditions.title = {
					[Op.iLike]: `%${title}%`,
				};
			}

			if (genre) {
				genre_name = genre;
			} else {
				genre_name = '';
			}

			if (nation) {
				whereConditions.nation = {
					[Op.eq]: nation,
				};
			}

			if (year) {
				whereConditions.release_date = {
					[Op.between]: [`${year}-01-01`, `${year}-12-31`],
				};
			}

			if (isSeries) {
				whereConditions.episodes =
					isSeries.toLowerCase() === 'true' ? { [Op.not]: 1 } : 1;
			}

			const movies = await Movie.findAll({
				where: whereConditions,
				offset: (page - 1) * pageSize,
				limit: pageSize,
				include: [
					{
						model: Genre,
						attributes: ['genre_id', 'name'],
						through: { attributes: [] },
						where: {
							name: {
								[Op.like]: `%${genre_name}%`,
							},
						},
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
		} catch (error: any) {
			throw new Error('Không thể lấy danh sách phim ' + error.message);
		}
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
			const movies = await Movie.findAll();
			return movies;
		} catch (error) {
			throw new Error('Could not fetch movies');
		}
	}

	async deleteMovieById(id: number): Promise<void> {
		try {
			const movieToDelete = await Movie.findByPk(id);

			if (!movieToDelete) {
				throw new Error('Movie not found');
			}

			await movieToDelete.destroy();
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
