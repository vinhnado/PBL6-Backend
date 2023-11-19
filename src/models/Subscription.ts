import {
	Model,
	Table,
	Column,
	DataType,
	ForeignKey,
	BelongsTo,
	HasOne,
	DeletedAt,
} from 'sequelize-typescript';
import { SubscriptionType } from './SubscriptionType';

@Table({
	tableName: Subscription.SUBSCRIPTION_TABLE_NAME,
	timestamps: true,
	paranoid: true,
})
export class Subscription extends Model {
	private static SUBSCRIPTION_TABLE_NAME = 'subscriptions' as string;
	private static SUBSCRIPTION_ID = 'subscription_id' as string;
	private static SUBSCRIPTION_TYPE_ID = 'subscription_type_id' as string;
	private static CLOSED_AT = 'closedAt' as string;

	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		field: Subscription.SUBSCRIPTION_ID,
	})
	subscriptionId!: number;

	@Column({
		type: DataType.DATE,
		field: Subscription.CLOSED_AT,
	})
	closedAt!: Date;

	@ForeignKey(() => SubscriptionType)
	@Column({
		type: DataType.INTEGER,
		field: Subscription.SUBSCRIPTION_TYPE_ID,
		defaultValue: 1,
	})
	subscriptionTypeId!: number;

	@BelongsTo(() => SubscriptionType)
	subscriptionType!: SubscriptionType;

	@DeletedAt
	deletedAt!: Date;
}
