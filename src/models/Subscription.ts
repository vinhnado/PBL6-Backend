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
import { SubscriptionInfo } from './SubscriptionInfo';

@Table({
	tableName: Subscription.SUBSCRIPTION_TABLE_NAME,
	timestamps: true,
	paranoid: true,
})
export class Subscription extends Model {
	private static SUBSCRIPTION_TABLE_NAME = 'subscriptions' as string;
	private static SUBSCRIPTION_ID = 'subscription_id' as string;
	private static SUBSCRIPTION_INFO_ID = 'subscription_info_id' as string;
	private static CLOSED_AT = 'closeAt' as string;

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
	closeAt!: Date;

	@ForeignKey(() => SubscriptionInfo)
	@Column({
		type: DataType.INTEGER,
		field: Subscription.SUBSCRIPTION_INFO_ID,
		defaultValue: 1,
	})
	subscriptionInfoId!: number;

	@BelongsTo(() => SubscriptionInfo)
	subscriptionInfo!: SubscriptionInfo;

	@DeletedAt
	deletedAt!: Date;
}
