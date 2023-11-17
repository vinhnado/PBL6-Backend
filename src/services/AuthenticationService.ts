import { User } from '../models/User';
import { Account } from '../models/Account';
import Authentication from '../utils/Authentication';
import { UserRepository } from '../repository/UserRepository';
import { IAuthenticationService } from './Interfaces/IAuthenticationService';
import Container, { Inject, Service } from 'typedi';
import { IUserRepository } from '../repository/Interfaces/IUserRepository';
import { Subscription } from '../models/Subscription';

@Service()
export class AuthenticationService implements IAuthenticationService {
	@Inject(() => UserRepository)
	private userRepository!: IUserRepository;

	async login(username: string, password: string): Promise<string> {
		const searchConditions = {
			username,
		};
		const user = await this.userRepository.findOneUser(searchConditions);

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
		gender: string,
		username: string,
		password: string
	): Promise<void> {
		try {
			const hashedPassword: string = await Authentication.passwordHash(
				password
			);
			const newSubscription = Subscription.build();
			const newAccount = Account.build({
				username: username,
				password: hashedPassword,
			});
			const newUser = User.build({
				email: email,
				dateOfBirth: dateOfBirth,
				gender: gender,
			});
			newUser.account = newAccount;
			newUser.subscription = newSubscription;
			await this.userRepository.createNewUser(
				newUser,
				newAccount,
				newSubscription
			);
		} catch (error: any) {
			throw new Error('Error register!' + error.message);
		}
	}
}
