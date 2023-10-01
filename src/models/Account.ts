import {
	Model,
	Table,
	Column,
	DataType,
	BelongsToMany,
	BelongsTo,
	ForeignKey,
} from 'sequelize-typescript';
import { User } from './User';

@Table({
	tableName: Account.ACCOUNT_TABLE_NAME,
	timestamps: true,
})
export class Account extends Model {
	private static ACCOUNT_TABLE_NAME = 'Account' as string;
	private static ACCOUNT_ID = 'account_id' as string;
	private static ACCOUNT_USER_ID = 'user_id' as string;
	private static ACOUNT_USERNAME = 'username' as string;
	private static ACCOUNT_PASSWORD = 'password' as string;

	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		field: Account.ACCOUNT_ID,
	})
	accountId!: number;

	@Column({
		type: DataType.STRING(100),
		field: Account.ACOUNT_USERNAME,
	})
	username!: string;

	@Column({
		type: DataType.STRING(100),
		field: Account.ACCOUNT_PASSWORD,
	})
	password!: string;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		field: Account.ACCOUNT_USER_ID,
	})
	userId!: number;

	@BelongsTo(() => User)
	user!: User;
}
