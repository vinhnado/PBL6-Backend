import {
	Model,
	Table,
	Column,
	DataType,
	ForeignKey,
	BelongsTo,
	HasOne,
} from 'sequelize-typescript';
import { User } from './User';
import { SubcriptionType } from './SubcriptionType';

@Table({
	tableName: Subcription.SUBSCRIPTION_TABLE_NAME,
	timestamps: true,
	paranoid: true,
})
export class Subcription extends Model {
	private static SUBSCRIPTION_TABLE_NAME = 'Subcriptions' as string;
	private static SUBSCRIPTION_ID = 'subscription_id' as string;
	private static USER_ID = 'user_id' as string;
	private static SUBCRIPTION_TYPE_ID = 'subcription_type_id' as string;
	private static STATUS = 'status' as string;

	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		field: Subcription.SUBSCRIPTION_ID,
	})
	subscriptionId!: number;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		field: Subcription.USER_ID,
	})
	userId!: number;

	@BelongsTo(() => User)
	user!: User;

	@ForeignKey(() => SubcriptionType)
	@Column({
		type: DataType.INTEGER,
		field: Subcription.SUBCRIPTION_TYPE_ID,
	})
	subcriptionTypeId!: number;

	@BelongsTo(() => SubcriptionType)
	subcriptionType!: SubcriptionType;

	@Column({
		type: DataType.BOOLEAN,
		field: Subcription.STATUS,
	})
	status!: boolean;
}
