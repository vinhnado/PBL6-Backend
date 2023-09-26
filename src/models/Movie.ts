import { Episode } from './Episode';
import {
	Model,
	Table,
	Column,
	DataType,
	BelongsToMany,
	HasMany,
} from 'sequelize-typescript';
import { Genre } from './Genre';
import { MovieGenre } from './MovieGenre';
import { Actor } from './Actor';
import { MovieActor } from './MovieActor';
import { Director } from './Director';
import { MovieDirector } from './MovieDirector';

@Table({
	tableName: Movie.MOVIE_TABLE_NAME,
	timestamps: true,
})
export class Movie extends Model {
	private static MOVIE_TABLE_NAME = 'Movies' as string;
	private static MOVIE_ID = 'movie_id' as string;
	private static MOVIE_TITLE = 'title' as string;
	private static MOVIE_DESCRIPTION = 'description' as string;
	private static MOVIE_RELEASE_DATE = 'release_date' as string;
	private static MOVIE_NATION = 'nation' as string;
	private static MOVIE_POSTER_URL = 'poster_url' as string;
	private static MOVIE_TRAILER_URL = 'trailer_url' as string;
	private static MOVIE_AVERAGE_RATING = 'average_rating' as string;
	private static MOVIE_EPISODES = 'episodes' as string;
	private static MOVIE_LEVEL = 'level' as string;

	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		field: Movie.MOVIE_ID,
	})
	movieId!: number;

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
		type: DataType.STRING(50),
		field: Movie.MOVIE_NATION,
	})
	nation!: string;

	@Column({
		type: DataType.STRING(255),
		field: Movie.MOVIE_POSTER_URL,
	})
	posterURL!: string;
	@Column({
		type: DataType.STRING(255),
		field: Movie.MOVIE_TRAILER_URL,
	})
	trailerURL!: string;

	@Column({
		type: DataType.DECIMAL(3, 2),
		field: Movie.MOVIE_AVERAGE_RATING,
	})
	averageRating!: string;

	@Column({
		type: DataType.SMALLINT(),
		field: Movie.MOVIE_EPISODES,
	})
	episodeNum!: number;

	@Column({
		type: DataType.SMALLINT(),
		field: Movie.MOVIE_LEVEL,
	})
	level!: number;

	@BelongsToMany(() => Genre, () => MovieGenre)
	genres!: Genre[];

	@BelongsToMany(() => Actor, () => MovieActor)
	actors!: Actor[];

	@BelongsToMany(() => Director, () => MovieDirector)
	directors!: Director[];

	@HasMany(() => Episode)
	episodes!: Episode[];
}
