import {
	Table,
	Column,
	Model,
	ForeignKey,
	DataType,
	BelongsTo,
} from 'sequelize-typescript';
import { Movie } from './Movie';

@Table({
	tableName: MovieEpisode.TABLE_NAME,
	timestamps: true,
})
export class MovieEpisode extends Model {
	private static TABLE_NAME = 'MovieEpisodes' as string;
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
		field: MovieEpisode.EPISODE_ID,
	})
	episodeId!: number;

	@ForeignKey(() => Movie)
	@Column({
		type: DataType.INTEGER(),
		field: MovieEpisode.MOVIE_ID,
	})
	movieId!: number;

	@Column({
		type: DataType.STRING(255),
		field: MovieEpisode.EPISODE_TITLE,
	})
	episodeTitle!: string;

	@Column({
		type: DataType.DATE,
		field: MovieEpisode.RELEASE_DATE,
	})
	releaseDate!: Date;

	@Column({
		type: DataType.STRING(255),
		field: MovieEpisode.POSTER_URL,
	})
	posterUrl!: string;

	@Column({
		type: DataType.STRING(255),
		field: MovieEpisode.MOVIE_URL,
	})
	movieUrl!: string;

	@Column({
		type: DataType.BIGINT,
		field: MovieEpisode.NUM_VIEW,
	})
	numView!: number;

	@Column({
		type: DataType.SMALLINT,
		field: MovieEpisode.DURATION,
	})
	duration!: number;

	@Column({
		type: DataType.SMALLINT,
		field: MovieEpisode.EPISODE_NO,
	})
	episodeNo!: number;

	@BelongsTo(() => Movie)
	movie!: Movie;
}
