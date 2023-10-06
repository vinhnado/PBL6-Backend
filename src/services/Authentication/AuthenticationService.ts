import { User } from '../../models/User';
import { Account } from '../../models/Account';
import Authentication from '../../utils/Authentication';
import { UserRepository } from '../../repository/User/UserRepository';
import { IAuthenticationService } from './IAuthenticationService';

export class AuthenticationService implements IAuthenticationService {
	async login(username: string, password: string): Promise<string> {
		const searchConditions = {
			username,
		};
		const user = await new UserRepository().findOneUser(searchConditions);

		if (!user) {
			throw new Error('Bad Request!');
		}
		// check password
		let compare = await Authentication.passwordCompare(
			password,
			user.account.password
		);

		// generate token
		if (compare) {
			return Authentication.generateToken(
				user.userId,
				user.email,
				user.account.username
			);
		}
		return '';
	}

	async register(
		email: string,
		dateOfBirth: Date,
		gender: number,
		username: string,
		password: string
	): Promise<void> {
		try {
			const hashedPassword: string = await Authentication.passwordHash(
				password
			);
			const newUser = new User();
			const newAccount = new Account();
			newUser.email = email;
			newUser.dateOfBirth = dateOfBirth;
			newUser.gender = gender;
			newAccount.username = username;
			newAccount.password = hashedPassword;
			newUser.account = newAccount;
			await new UserRepository().save(newUser, newAccount);
		} catch (error) {
			console.log(error);
			throw new Error('Error register!');
		}
	}
}
