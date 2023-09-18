import { Movie } from '../../models/Movie';
import { Genre } from '../../models/Genre';
import { MovieGenre } from '../../models/MovieGenre';
import { IMovieRepository } from './IMovieRepository';
import Database from '../../config/database';
import { QueryTypes } from 'sequelize';

const db = new Database();

export class MovieRepository implements IMovieRepository {
	private static instance: MovieRepository | null = null;

	private constructor() {}

	public static getInstance(): MovieRepository {
		if (!MovieRepository.instance) {
			MovieRepository.instance = new MovieRepository();
		}
		return MovieRepository.instance;
	}

	async getAllMovies(): Promise<Movie[]> {
		try {
			const movies = await Movie.findAll({
				include: Genre, // Kèm theo thông tin về Genre
			});
			return movies;
		} catch (error: any) {
			throw new Error('Không thể lấy danh sách phim: ' + error.message);
		}
	}

	async getAllMovies1(): Promise<Movie[]> {
		try {
			const sql = `
            SELECT
            "Movie".movie_id,
            "Movie".title,
            "Movie".description,
            "Movie".release_date,
            "Movie".server_url,
            "Genre".genre_id,
            "Genre".name AS genre_name
        FROM
            "Movie"
        JOIN
            "MovieGenre" ON "Movie".movie_id = "MovieGenre"."movieId"
        JOIN
            "Genre" ON "MovieGenre"."genreId" = "Genre".genre_id;
`;

			const movies: any = await db.sequelize?.query(sql, {
				type: QueryTypes.SELECT,
			});
			return movies;
		} catch (error: any) {
			throw new Error('Không thể lấy danh sách phim: ' + error.message);
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

	async getMoviesByGenre(genreName: string): Promise<Movie[]> {
		try {
			const genre = await Genre.findOne({
				where: { name: genreName },
				include: Movie, // Kèm theo thông tin về các phim thuộc thể loại này
			});

			if (!genre) {
				return [];
			}

			const movies = genre.movies;
			return movies;
		} catch (error: any) {
			throw new Error(
				'Không thể lấy danh sách phim theo thể loại: ' + error.message
			);
		}
	}

	async createMovie(
		title: string,
		description: string,
		releaseDay: Date,
		serverUrl: string
	): Promise<Movie> {
		try {
			const movie = await Movie.create({
				title,
				description,
				releaseDay,
				serverUrl,
			});
			return movie;
		} catch (error: any) {
			throw new Error('Không thể tạo phim: ' + error.message);
		}
	}

	async updateMovie(
		id: number,
		title: string,
		description: string,
		releaseDay: Date,
		serverUrl: string
	): Promise<boolean> {
		try {
			const updatedRows = await Movie.update(
				{
					title,
					description,
					releaseDay,
					serverUrl,
				},
				{
					where: { id },
				}
			);
			return updatedRows[0] > 0; // Trả về true nếu có ít nhất một dòng đã được cập nhật
		} catch (error: any) {
			throw new Error('Không thể cập nhật phim: ' + error.message);
		}
	}

	async deleteMovie(id: number): Promise<boolean> {
		try {
			const deletedRows = await Movie.destroy({
				where: { id },
			});
			return deletedRows > 0; // Trả về true nếu có ít nhất một dòng đã bị xóa
		} catch (error: any) {
			throw new Error('Không thể xóa phim: ' + error.message);
		}
	}
}
