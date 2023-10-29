import {
	Table,
	Column,
	Model,
	ForeignKey,
	DataType,
	BelongsTo,
	DeletedAt,
} from 'sequelize-typescript';
import { Movie } from './Movie';

@Table({
	tableName: Episode.TABLE_NAME,
	timestamps: true,
	paranoid: true,
})
export class Episode extends Model {
	private static TABLE_NAME = 'Episodes' as string;
	private static EPISODE_ID = 'episode_id' as string;
	private static MOVIE_ID = 'movie_id' as string;
	private static EPISODE_TITLE = 'title' as string;
	private static RELEASE_DATE = 'release_date' as string;
	private static POSTER_URL = 'poster_url' as string;
	private static MOVIE_URL = 'movie_url' as string;
	private static NUM_VIEW = 'num_view' as string;
	private static DURATION = 'duration' as string;
	private static EPISODE_NO = 'episode_no' as string;

	@Column({
		type: DataType.INTEGER(),
		primaryKey: true,
		autoIncrement: true,
		field: Episode.EPISODE_ID,
	})
	episodeId!: number;

	@ForeignKey(() => Movie)
	@Column({
		type: DataType.INTEGER(),
		field: Episode.MOVIE_ID,
	})
	movieId!: number;

	@Column({
		type: DataType.STRING(255),
		field: Episode.EPISODE_TITLE,
	})
	episodeTitle!: string;

	@Column({
		type: DataType.DATE,
		field: Episode.RELEASE_DATE,
	})
	releaseDate!: Date;

	@Column({
		type: DataType.STRING(255),
		field: Episode.POSTER_URL,
	})
	posterUrl!: string;

	@Column({
		type: DataType.STRING(255),
		field: Episode.MOVIE_URL,
	})
	movieUrl!: string;

	@Column({
		type: DataType.BIGINT,
		field: Episode.NUM_VIEW,
	})
	numView!: number;

	@Column({
		type: DataType.SMALLINT,
		field: Episode.DURATION,
	})
	duration!: number;

	@Column({
		type: DataType.SMALLINT,
		field: Episode.EPISODE_NO,
	})
	episodeNo!: number;

	@DeletedAt
	deletedAt!: Date;

	@BelongsTo(() => Movie)
	movie!: Movie;

	getUrl(): string {
		return 'ok';
	}

}
