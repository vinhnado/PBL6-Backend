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
import {
	EmailValidError,
	OldPasswordError,
	UsernameValidError,
} from '../error/CustomErrors';

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

	login = async (username: string, password: string): Promise<any> => {
		const searchConditions = {
			username,
		};
		const user = await this.userRepository.findOneUser(searchConditions);

		if (!user) {
			throw new Error('User not found');
		}
		// check password
		let compare = await Authentication.passwordCompare(
			password,
			user.account.password
		);
		console.log(compare);

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
	};

	register = async (
		email: string,
		dateOfBirth: Date,
		gender: string,
		username: string,
		password: string,
		isAdmin: boolean = false
	) => {
		try {
			const check1 = await this.checkUsername(username);
			if (check1) {
				throw new UsernameValidError('Invalid Username');
			}
			if (await this.checkEmail(email)) {
				throw new EmailValidError('Invalid Email');
			}
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
			return 'Create user successfully';
		} catch (error: any) {
			if (
				error instanceof UsernameValidError ||
				error instanceof EmailValidError
			) {
				throw error;
			} else {
				throw new Error('Error registering user: ' + error.message);
			}
		}
	};

	forgotPassword = async (
		email: string,
		token: string | null = null,
		password: string | null = null
	) => {
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
	};

	changePassword = async (
		userId: number,
		oldPassword: string,
		newPassword: string
	) => {
		try {
			const searchConditions = {
				userId,
			};
			const user = await this.userRepository.findOneUser(searchConditions);

			if (!user) {
				throw new Error('Bad Request!');
			}
			// check password
			const compare = await Authentication.passwordCompare(
				oldPassword,
				user.account.password
			);
			if (compare) {
				let account = user.account;
				const hashedPassword: string = await Authentication.passwordHash(
					newPassword
				);
				account.update({ password: hashedPassword });
				return await this.accountRepository.save(account);
			} else {
				throw new OldPasswordError('Wrong old password');
			}
		} catch (error: any) {
			if (error instanceof OldPasswordError) {
				throw error;
			} else {
				throw new Error('Error change password: ' + error.message);
			}
		}
	};

	activeUser = async (email: string, token: string | null = null) => {
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
	};

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

	checkUsername = async (username: string): Promise<Boolean> => {
		try {
			const account = await this.accountRepository.findOneByCondition({
				username: username,
			});
			if (account) {
				return true;
			} else {
				return false;
			}
		} catch (error: any) {
			throw new Error('Error!' + error.message);
		}
	};

	checkEmail = async (email: string) => {
		try {
			const user = await this.userRepository.findOneByCondition({
				email: email,
			});
			if (user) {
				return true;
			} else {
				return false;
			}
		} catch (error: any) {
			throw new Error('Error!' + error.message);
		}
	};
}
