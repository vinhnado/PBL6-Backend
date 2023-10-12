import { Account } from './Account';
import {
	Model,
	Table,
	Column,
	DataType,
	BelongsToMany,
	HasMany,
	HasOne,
	ForeignKey,
	DeletedAt,
	BelongsTo,
} from 'sequelize-typescript';
import { Movie } from './Movie';
import { MovieFavorite } from './MovieFavorite';
import { WatchHistory } from './WatchHistory';
import { WatchList } from './WatchList';

@Table({
	tableName: User.USER_TABLE_NAME,
	timestamps: true,
	paranoid: true,
})
export class User extends Model {
	private static USER_TABLE_NAME = 'Users' as string;
	private static USER_ID = 'user_id' as string;
	private static USER_DATE_OF_BIRTH = 'date_of_birth' as string;
	private static USER_GENDER = 'gender' as string;
	private static USER_EMAIL = 'email' as string;
	private static USER_AVATAR_URL = 'avatar_url' as string;

	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		field: User.USER_ID,
	})
	userId!: number;

	@Column({
		type: DataType.DATE(),
		field: User.USER_DATE_OF_BIRTH,
	})
	dateOfBirth!: Date;

	@Column({
		type: DataType.SMALLINT,
		field: User.USER_GENDER,
	})
	gender!: number;

	@Column({
		type: DataType.STRING(328),
		field: User.USER_EMAIL,
	})
	email!: string;

	@Column({
		type: DataType.STRING(255),
		field: User.USER_AVATAR_URL,
	})
	avatarURL!: string;

	@HasOne(() => Account, 'accountId')
	account!: Account;

	@BelongsToMany(() => Movie, () => MovieFavorite)
	movieFavorites!: Movie[];

	@BelongsToMany(() => Movie, () => WatchHistory)
	WatchHistories!: Movie[];

	@BelongsToMany(() => Movie, () => WatchList)
	watchLists!: Movie[];

	@DeletedAt
	deletedAt!: Date;
}
