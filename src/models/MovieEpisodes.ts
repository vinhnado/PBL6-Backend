import {
	Table,
	Column,
	Model,
	ForeignKey,
	DataType,
} from 'sequelize-typescript';
import { Movie } from './Movie';

@Table({
	tableName: MovieEpisodes.TABLE_NAME,
	timestamps: true,
    
})
export class MovieEpisodes extends Model {
	private static TABLE_NAME = 'MovieEpisodes' as string;
    private static EPISODE_ID  = 'episode_id' as string;
    private static MOVIE_ID  = 'movie_id' as string;
    private static EPISODE_TITLE  = 'episode_title' as string;
    private static RELEASE_DATE  = 'release_date' as string;
    private static POSTER_URL  = 'poster_url' as string;
    private static MOVIE_URL  = 'movie_id' as string;
    private static NUM_VIEW  = 'num_view' as string;
    private static TIME  = 'time' as string;
    private static EPISODE_NO  = 'episode_no' as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: MovieEpisodes.EPISODE_ID,
  })
  episodeId!: number;

  @ForeignKey(() => Movie)
  @Column({
    type: DataType.INTEGER,
    field: MovieEpisodes.MOVIE_ID,
  })
  movieId!: number;

  @Column({
    type: DataType.STRING(255),
    field: MovieEpisodes.EPISODE_TITLE,
  })
  episodeTitle!: string;

  @Column({
    type: DataType.DATE,
    field: MovieEpisodes.RELEASE_DATE,
  })
  releaseDate!: Date;

  @Column({
    type: DataType.STRING(255),
    field: MovieEpisodes.POSTER_URL,
  })
  posterUrl!: string;

  @Column({
    type: DataType.STRING(255),
    field: MovieEpisodes.MOVIE_URL,
  })
  movieUrl!: string;

  @Column({
    type: DataType.BIGINT,
    field: MovieEpisodes.NUM_VIEW,
  })
  numView!: number;

  @Column({
    type: DataType.SMALLINT,
    field: MovieEpisodes.TIME,
  })
  time!: string;

  @Column({
    type: DataType.SMALLINT,
    field: MovieEpisodes.EPISODE_NO,
  })
  episodeNo!: number;

    

}
