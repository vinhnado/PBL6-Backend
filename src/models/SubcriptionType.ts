import { Subcription } from './Subcription';
import {
	Model,
	Table,
	Column,
	DataType,
	ForeignKey,
	BelongsTo,
	HasMany,
	DeletedAt,
} from 'sequelize-typescript';

@Table({
	tableName: SubcriptionType.SUBSCRIPTION_TYPE_TABLE_NAME,
	timestamps: true,
	paranoid: true,
})
export class SubcriptionType extends Model {
	private static SUBSCRIPTION_TYPE_TABLE_NAME = 'SubcriptionTypes' as string;
	private static SUBSCRIPTION_TYPE_ID = 'subcription_type_id' as string;
	private static SUBCRIPTION_TYPE_NAME = 'name' as string;

	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		field: SubcriptionType.SUBSCRIPTION_TYPE_ID,
	})
	subcriptionId!: number;

	@ForeignKey(() => SubcriptionType)
	@Column({
		type: DataType.STRING(100),
		field: SubcriptionType.SUBCRIPTION_TYPE_NAME,
	})
	name!: number;

	@HasMany(() => Subcription)
	subcriptions!: Subcription[];

	@DeletedAt
	deletedAt!: Date;
}
