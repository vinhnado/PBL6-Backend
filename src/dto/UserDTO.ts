import { User } from '../models/User';

export class UserDTO {
	dateOfBirth: Date;
	gender: string;
	email: string;
	avatarURL: string;
	createdAt: string;
	username: string;
	subscription: {
		closeAt: Date;
		updatedAt: Date;
		subscriptionType: string | null;
	};

	constructor(user: User) {
		this.dateOfBirth = user.dateOfBirth;
		this.gender = user.gender;
		this.email = user.email;
		this.avatarURL = user.avatarURL;
		this.createdAt = user.createdAt;
		this.username = user.account.username;
		this.subscription = {
			closeAt: user.subscription.closedAt,
			updatedAt: user.subscription.updatedAt,
			subscriptionType: user.subscription.subscriptionType.name,
		};
	}

	public static userToUserDTO(user: User): UserDTO {
		return new UserDTO(user);
	}
}
