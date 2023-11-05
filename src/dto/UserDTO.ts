import { Subscription } from '../models/Subscription';
import { User } from '../models/User';

export class UserDTO {
	dateOfBirth: Date;
	gender: string;
	email: string;
	avatarURL: string | null;
	createdAt: string;
	username: string;
	subscription: Subscription | null;

	constructor(user: User) {
		this.dateOfBirth = user.dateOfBirth;
		this.gender = user.gender;
		this.email = user.email;
		this.avatarURL = user.avatarURL;
		this.createdAt = user.createdAt;
		this.username = user.account.username;
		this.subscription = user.subscription;
	}

	public static userToUserDTO(user: User): UserDTO {
		return new UserDTO(user);
	}
}
