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
} from 'sequelize-typescript';

@Table({
	tableName: User.USER_TABLE_NAME,
	timestamps: true,
	paranoid: true,
})
export class User extends Model {
	private static USER_TABLE_NAME = 'Users' as string;
	private static USER_ID = 'user_id' as string;
	private static USER_DATE_OF_BIRTH = 'date_of_birth' as string;
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
	dateOfBirth!: string;

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

	@HasOne(() => Account)
	account!: Account;

	@DeletedAt
	deletedAt!: Date;
}
