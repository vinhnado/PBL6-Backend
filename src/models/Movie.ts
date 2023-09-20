import {
	Model,
	Table,
	Column,
	DataType,
	BelongsToMany,
} from 'sequelize-typescript';
import { Genre } from './Genre';
import { MovieGenre } from './MovieGenre';

@Table({
	tableName: Movie.MOVIE_TABLE_NAME,
	timestamps: false,
})
export class Movie extends Model {
	public static MOVIE_TABLE_NAME = 'Movie' as string;
	public static MOVIE_ID = 'movie_id' as string;
	public static MOVIE_TITLE = 'title' as string;
	public static MOVIE_DESCRIPTION = 'description' as string;
	public static MOVIE_RELEASE_DATE = 'release_date' as string;
	public static MOVIE_SERVER_URL = 'server_url' as string;

	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		field: Movie.MOVIE_ID,
	})
	id!: number;

	@Column({
		type: DataType.STRING(100),
		field: Movie.MOVIE_TITLE,
	})
	title!: string;

	@Column({
		type: DataType.STRING(255),
		field: Movie.MOVIE_DESCRIPTION,
	})
	description!: string;

	@Column({
		type: DataType.DATE(),
		field: Movie.MOVIE_RELEASE_DATE,
	})
	releaseDate!: Date;

	@Column({
		type: DataType.STRING(1000),
		field: Movie.MOVIE_SERVER_URL,
	})
	server_url!: string;

	@BelongsToMany(() => Genre, () => MovieGenre)
	genres!: Genre[];
}
