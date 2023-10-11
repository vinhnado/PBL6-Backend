import {
	Table,
	Column,
	Model,
	ForeignKey,
	DataType,
	DeletedAt,
} from 'sequelize-typescript';
import { Movie } from './Movie';
import { User } from './User';

@Table({
	tableName: WatchList.WATCHLIST_TABLE_NAME,
	timestamps: true,
	paranoid: true,
})
export class WatchList extends Model {
	private static WATCHLIST_TABLE_NAME = 'WatchList' as string;
	private static WATCHLIST_USER_ID = 'user_id' as string;
	private static MWATCHLIST_MOVIE_ID = 'movie_id' as string;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER(),
		field: WatchList.WATCHLIST_USER_ID,
	})
	userId!: number;

	@ForeignKey(() => Movie)
	@Column({
		type: DataType.INTEGER(),
		field: WatchList.MWATCHLIST_MOVIE_ID,
	})
	movieId!: number;
	
	@DeletedAt
	deletedAt!: Date;
}
