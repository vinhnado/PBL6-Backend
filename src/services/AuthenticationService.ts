import { AccountRepository } from './../repository/AccountRepository';
import { User } from '../models/User';
import { Account } from '../models/Account';
import Authentication from '../utils/Authentication';
import { UserRepository } from '../repository/UserRepository';
import { IAuthenticationService } from './Interfaces/IAuthenticationService';
import Container, { Inject, Service } from 'typedi';
import { IUserRepository } from '../repository/Interfaces/IUserRepository';
import { Subscription } from '../models/Subscription';
import Mail from '../utils/Mail';
import { Token } from '../utils/Token';

// const sleep = (millis: number) => {
// 	var stop = new Date().getTime();
// 	while (new Date().getTime() < stop + millis) {}
// };
@Service()
export class AuthenticationService implements IAuthenticationService {
	@Inject(() => UserRepository)
	private userRepository!: IUserRepository;

	@Inject(() => AccountRepository)
	private accountRepository!: AccountRepository;

	@Inject(() => Mail)
	private mail!: Mail;

	@Inject(() => Token)
	private token!: Token;

	async login(username: string, password: string): Promise<any> {
		// console.log('Before sleep');
		// sleep(10000); // Wait for one second
		// console.log('After sleep');

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
			return {
				accessToken: Authentication.generateAccessToken(
					user.userId,
					user.role,
					user.account.username,
					user.subscription.subscriptionTypeId
				),
				refreshToken: Authentication.generateRefreshToken(
					user.account.username
				),
			};
		}
		return null;
	}

	async register(
		email: string,
		dateOfBirth: Date,
		gender: string,
		username: string,
		password: string,
		isAdmin: boolean = false
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
			if (isAdmin) {
				newUser.role = 1;
			}
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

	async forgotPassword(
		email: string,
		token: string | null = null,
		password: string | null = null
	) {
		try {
			const searchConditions = {
				email,
			};
			if (token == null) {
				const user = await this.userRepository.findOneUser(searchConditions);
				await this.mail.forgotPassword(
					user.account.username,
					user.email,
					await this.token.generateToken(email)
				);
				return 'Hãy kiểm tra email';
			} else {
				const data = await this.token.verifyToken(token);
				console.log(data);
				if (data != null && data?.email == email && password) {
					const account = (
						await this.userRepository.findOneUser(searchConditions)
					).account;
					const hashedPassword: string = await Authentication.passwordHash(
						password
					);
					account.update({ password: hashedPassword });
					await this.accountRepository.save(account);
					return 'Thành công';
				} else {
					return 'Token hết hiệu lực hoặc không tồn tại';
				}
			}
		} catch (error: any) {
			throw new Error('Error!' + error.message);
		}
	}

	async activeUser(email: string, token: string | null = null) {
		try {
			const searchConditions = {
				email,
			};
			if (token == null) {
				const user = await this.userRepository.findOneUser(searchConditions);
				await this.mail.activeUser(
					user.account.username,
					user.email,
					await this.token.generateToken(email)
				);
				return 'Hãy kiểm tra email';
			} else {
				const data = await this.token.verifyToken(token);
				console.log(data);
				if (data != null && data?.email == email) {
					const user = await this.userRepository.findOneUser(searchConditions);
					user.update({ active: true });
					await this.userRepository.save(user);
					return 'Thành công';
				} else {
					return 'Token hết hiệu lực hoặc không tồn tại';
				}
			}
		} catch (error: any) {
			throw new Error('Error!' + error.message);
		}
	}

	getAccessTokenByRefreshToken = async (refreshToken: string) => {
		try {
			const payload = Authentication.validateToken(refreshToken);
			if (!payload) {
				return '';
			}
			const searchConditions = {
				username: payload.username,
			};
			const user = await this.userRepository.findOneUser(searchConditions);
			if (user) {
				return {
					accessToken: Authentication.generateAccessToken(
						user.userId,
						user.role,
						user.account.username,
						user.subscription.subscriptionTypeId
					),
				};
			} else {
				return '';
			}
		} catch (error: any) {
			throw new Error('Error!' + error.message);
		}
	};
}
