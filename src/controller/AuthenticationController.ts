import {
	EmailValidDuplicate,
	UsernameValidDuplicate,
	handleErrorController,
} from './../error/CustomErrors';
import { Request, Response } from 'express';
import Container, { Inject, Service } from 'typedi';
import { IAuthenticationService } from '../services/Interfaces/IAuthenticationService';
import { AuthenticationService } from '../services/AuthenticationService';
import { CloudHSM } from 'aws-sdk';
import passport from 'passport';

export class AuthenticationController {
	private authenticationService: IAuthenticationService;

	constructor() {
		this.authenticationService = Container.get(AuthenticationService);
	}

	login = async (req: Request, res: Response) => {
		try {
			const { username, password } = req.body;
			const token = await this.authenticationService.login(username, password);
			const res_token = { type: 'Bearer', token: token };
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully login!',
				result: res_token,
			});
		} catch (error) {
			handleErrorController(error, res);
		}
	};

	loginAdmin = async (req: Request, res: Response) => {
		try {
			const { username, password } = req.body;
			const token = await this.authenticationService.loginAdmin(username, password);
			const res_token = { type: 'Bearer', token: token };
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully login!',
				result: res_token,
			});
		} catch (error) {
			handleErrorController(error, res);
		}
	};

	register = async (req: Request, res: Response) => {
		try {
			const { email, dateOfBirth, gender, username, password } = req.body;

			await this.authenticationService.register(
				email,
				dateOfBirth,
				gender,
				username,
				password
			);

			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully registerd users!',
			});
		} catch (error: any) {
			handleErrorController(error, res);
		}
	};

	registerAdmin = async (req: Request, res: Response) => {
		try {
			const { email, dateOfBirth, gender, username, password } = req.body;

			await this.authenticationService.register(
				email,
				dateOfBirth,
				gender,
				username,
				password,
				true
			);

			return res.status(200).json({
				status: '200',
				message: 'Successfully registered admin!',
			});
		} catch (error: any) {
			handleErrorController(error, res);
		}
	};

	forgotPassword = async (req: Request, res: Response) => {
		try {
			const { email, token, password } = req.body;
			let data = await this.authenticationService.forgotPassword(
					email,
					token,
					password
				);

			return res.status(200).json({
				status: 'Ok!',
				message: data,
			});
		} catch (error) {
			handleErrorController(error, res);
		}
	};

	changePassword = async (req: Request, res: Response) => {
		try {
			const userId = req.payload.userId;
			const { oldPassword, newPassword } = req.body;
			await this.authenticationService.changePassword(
				userId,
				oldPassword,
				newPassword
			);

			return res.status(200).json({
				status: 'Ok!',
				message: 'Success',
			});
		} catch (error: any) {
			handleErrorController(error, res);
		}
	};

	activeUser = async (req: Request, res: Response) => {
		try {
			const { email, token } = req.body;
			let data = await this.authenticationService.activeUser(email, token);

			return res.status(200).json({
				status: 'Ok!',
				message: data,
			});
		} catch (error) {
			handleErrorController(error, res);
		}
	};

	getAccessToken = async (req: Request, res: Response) => {
		try {
			const { refreshToken } = req.body;
			const token =
				await this.authenticationService.getAccessTokenByRefreshToken(
					refreshToken
				);
			if (token === '') {
				return res.status(400).json({
					status: 'Bad Request!',
					message: 'Token hết hiệu lực hoặc không tồn tại',
				});
			}
			const res_token = { type: 'Bearer', token: token };
			return res.status(200).json({
				status: 'Ok!',
				message: 'Get new token successfully!',
				result: res_token,
			});
		} catch (error) {
			handleErrorController(error, res);
		}
	};

	validRegister = async (req: Request, res: Response) => {
		try {
			const { username, email } = req.query;
			if (username) {
				if (
					await this.authenticationService.checkUsername(username.toString())
				) {
					return res.status(409).json({
						status: 'Conflict',
						message: 'Username already exist',
					});
				} else {
					return res.status(200).json({
						status: 'Ok!',
						message: 'Can be use',
					});
				}
			} else if (email) {
				if (await this.authenticationService.checkEmail(email.toString())) {
					return res.status(409).json({
						status: 'Conflict!',
						message: 'Email already exist',
					});
				} else {
					return res.status(200).json({
						status: 'Ok!',
						message: 'Can be use',
					});
				}
			} else {
				return res.status(400).json({
					status: 'No Param',
					message: 'Check param please',
				});
			}
		} catch (error) {
			handleErrorController(error, res);
		}
	};

	googleLogin = async (req: Request, res: Response) => {
		try {
		passport.authenticate('google', { scope: ['profile', 'email'], session: false }, (err, user) => {
		if (err || !user) {
			return res.status(401).json({ error: 'Authentication failed' });
		}

		// Tại đây, bạn có thể tạo mã thông báo (token) và trả về cho người dùng
		// Ví dụ sử dụng JWT
		const token = 'your_generated_token_here';

		return res.json({ token });
    })(req, res);
		} catch (error) {
			handleErrorController(error, res);
		}
	};

	googleCallback = async (req: Request, res: Response) => {
		try {
			passport.authenticate('google', { failureRedirect: '/' })(req, res, () => {
    		const token = "await this.authenticationService.login(username, password)";
			const res_token = { type: 'Bearer', token: token };
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully login!',
				result: res_token,
			});
		});
		} catch (error) {
			handleErrorController(error, res);
		}
	};
}
