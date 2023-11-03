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
	private static SUBSCRIPTION_ID = 'subcription_id' as string;
	private static SUBCRIPTION_TYPE_ID = 'subcription_type_id' as string;
	private static CLOSED_AT = 'closedAt' as string;

	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		field: Subcription.SUBSCRIPTION_ID,
	})
	subcriptionId!: number;

	@Column({
		type: DataType.DATE,
		field: Subcription.CLOSED_AT,
	})
	closedAt!: Date;

	@ForeignKey(() => SubcriptionType)
	@Column({
		type: DataType.INTEGER,
		field: Subcription.SUBCRIPTION_TYPE_ID,
		defaultValue: 1,
	})
	subcriptionTypeId!: number;

	@BelongsTo(() => SubcriptionType)
	subcriptionType!: SubcriptionType;
}
