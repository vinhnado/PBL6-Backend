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
	private static SUBSCRIPTION_TYPE_TABLE_NAME = 'subscription_types' as string;
	private static SUBSCRIPTION_TYPE_ID = 'subscription_type_id' as string;
	private static SUBSCRIPTION_TYPE_NAME = 'name' as string;
	private static SUBSCRIPTION_TYPE_DURATION = 'duration' as string;
	private static SUBSCRIPTION_TYPE_PRICE = 'price' as string;
	private static SUBSCRIPTION_TYPE_DISCOUNT = 'discount' as string;

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

	@Column({
		type: DataType.INTEGER,
		field: SubscriptionType.SUBSCRIPTION_TYPE_DURATION,
		allowNull: true,
	})
	duration!: number;

	@Column({
		type: DataType.FLOAT,
		field: SubscriptionType.SUBSCRIPTION_TYPE_PRICE,
		allowNull: true,
	})
	price!: number;

	@Column({
		type: DataType.FLOAT,
		field: SubscriptionType.SUBSCRIPTION_TYPE_DISCOUNT,
		allowNull: true,
	})
	discount!: number;

	@HasMany(() => Subscription)
	subscriptions!: Subscription[];

	@DeletedAt
	deletedAt!: Date;
}
