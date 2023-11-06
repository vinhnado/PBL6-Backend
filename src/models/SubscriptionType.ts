import { Subscription } from './Subscription';
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
	tableName: SubscriptionType.SUBSCRIPTION_TYPE_TABLE_NAME,
	timestamps: true,
	paranoid: true,
})
export class SubscriptionType extends Model {
	private static SUBSCRIPTION_TYPE_TABLE_NAME = 'SubscriptionTypes' as string;
	private static SUBSCRIPTION_TYPE_ID = 'subscription_type_id' as string;
	private static SUBSCRIPTION_TYPE_NAME = 'name' as string;

	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		field: SubscriptionType.SUBSCRIPTION_TYPE_ID,
	})
	subscriptionId!: number;

	@ForeignKey(() => SubscriptionType)
	@Column({
		type: DataType.STRING(100),
		field: SubscriptionType.SUBSCRIPTION_TYPE_NAME,
	})
	name!: string;

	@HasMany(() => Subscription)
	subscriptions!: Subscription[];

	@DeletedAt
	deletedAt!: Date;
}
