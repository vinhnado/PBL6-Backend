import { User } from '../models/User';

export class UserDTO {
	dateOfBirth: Date;
	gender: number;
	email: string;
	avatarURL: string | null;
	createdAt: string;
	username: string;

	constructor(
		dateOfBirth: Date,
		gender: number,
		email: string,
		avatarURL: string | null,
		createdAt: string,
		username: string
	) {
		this.dateOfBirth = dateOfBirth;
		this.gender = gender;
		this.email = email;
		this.avatarURL = avatarURL;
		this.createdAt = createdAt;
		this.username = username;
	}

	public static userToUserDTO(user: User): UserDTO {
		return new UserDTO(
			user.dateOfBirth,
			user.gender,
			user.email,
			user.avatarURL,
			user.createdAt,
			user.account.username
		);
	}
}
