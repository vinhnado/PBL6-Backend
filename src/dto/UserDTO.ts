import { SubscriptionType } from './../models/SubscriptionType';
import { SubscriptionInfo } from './../models/SubscriptionInfo';
import { User } from '../models/User';

export class UserDTO {
	dateOfBirth: Date;
	gender: string;
	email: string;
	avatarURL: string;
	createdAt: string;
	username: string;
	active: boolean;
	role: number;
	subscription: {
		closeAt: Date;
		updatedAt: Date;
		subscriptionType: string | null;
		duration: string | null;
	};

	constructor(user: User) {
		this.dateOfBirth = user.dateOfBirth;
		this.gender = user.gender;
		this.email = user.email;
		this.avatarURL = user.avatarURL;
		this.createdAt = user.createdAt;
		this.active = user.active;
		this.username = user.account.username;
		this.role = user.role;
		this.subscription = {
			closeAt: user.subscription.closeAt,
			updatedAt: user.subscription.updatedAt,
			subscriptionType:
				user.subscription.subscriptionInfo.subscriptionType.name,
			duration: user.subscription.subscriptionInfo.duration.time.toString(),
		};
	}

	public static userToUserDTO(user: User): UserDTO {
		return new UserDTO(user);
	}
}
