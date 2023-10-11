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
	tableName: WatchHistory.WATCHHISTORY_TABLE_NAME,
	timestamps: true,
	paranoid: true,
})
export class WatchHistory extends Model {
	private static WATCHHISTORY_TABLE_NAME = 'WatchHistory' as string;
	private static WATCHHISTORY_USER_ID = 'user_id' as string;
	private static WATCHHISTORY_MOVIE_ID = 'movie_id' as string;
	private static WATCHHISTORY_DURATION = 'duration' as string;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER(),
		field: WatchHistory.WATCHHISTORY_USER_ID,
	})
	userId!: number;

	@ForeignKey(() => Movie)
	@Column({
		type: DataType.INTEGER(),
		field: WatchHistory.WATCHHISTORY_MOVIE_ID,
	})
	movieId!: number;

    @Column({
		type: DataType.INTEGER(),
		field: WatchHistory.WATCHHISTORY_DURATION,
	})
	duration!: number;
	
	@DeletedAt
	deletedAt!: Date;
}
