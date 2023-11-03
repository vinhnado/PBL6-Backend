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
import { WatchLater } from './WatchLater';
<<<<<<< HEAD
=======
import { Subcription } from './Subcription';
>>>>>>> 8cdfaa5e3812436c87d47f8791c780454d85bf1d

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
		type: DataType.STRING(10),
		field: User.USER_GENDER,
	})
	gender!: string;

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

	@HasOne(() => Subcription, 'subcriptionId')
	subcription!: Subcription;

	@BelongsToMany(() => Movie, {
		through: () => MovieFavorite,
		as: 'movieFavoriteList',
	})
	movieFavoriteList!: Movie[];

	@BelongsToMany(() => Movie, {
		through: () => WatchHistory,
		as: 'watchHistoryList',
	})
	watchHistoryList!: Movie[];

	@BelongsToMany(() => Movie, {
		through: () => WatchLater,
<<<<<<< HEAD
		as: 'watchList',
	})
	WatchLaterList!: Movie[];
=======
		as: 'watchLaterList',
	})
	watchLaterList!: Movie[];
>>>>>>> 8cdfaa5e3812436c87d47f8791c780454d85bf1d

	@DeletedAt
	deletedAt!: Date;
}
