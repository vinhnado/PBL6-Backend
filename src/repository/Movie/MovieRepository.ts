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
	private static instance: MovieRepository | null = null;

	private constructor() {}

	public static getInstance(): MovieRepository {
		if (!MovieRepository.instance) {
			MovieRepository.instance = new MovieRepository();
		}
		return MovieRepository.instance;
	}

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
}
