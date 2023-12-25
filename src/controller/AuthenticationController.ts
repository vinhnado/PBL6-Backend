import { EmailValidError, UsernameValidError } from './../error/CustomErrors';
import { Request, Response } from 'express';
import Container, { Inject, Service } from 'typedi';
import { IAuthenticationService } from '../services/Interfaces/IAuthenticationService';
import { AuthenticationService } from '../services/AuthenticationService';
import { CloudHSM } from 'aws-sdk';

export class AuthenticationController {
	private authenticationService: IAuthenticationService;

	constructor() {
		this.authenticationService = Container.get(AuthenticationService);
	}

	login = async (req: Request, res: Response) => {
		try {
			const { username, password } = req.body;
			const token = await this.authenticationService.login(username, password);
			if (!token) {
				return res.status(400).json({
					status: 'Bad Request!',
					message: 'Wrong email or password!',
				});
			}
			const res_token = { type: 'Bearer', token: token };
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully login!',
				result: res_token,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				status: 'Internal server Error!',
				message: 'Internal server Error!',
			});
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
			if (error.name === 'UsernameValidError') {
				return res.status(400).json({
					status: 'Bad Request',
					message: error.message,
				});
			}
			if (error.name === 'EmailValidError') {
				return res.status(400).json({
					status: 'Bad Request',
					message: error.message,
				});
			}

			return res.status(500).json({
				status: 'Internal server Error!',
				message: 'Internal server Error!',
			});
		}
	};

	registerAdmin = async (req: Request, res: Response) => {
		try {
			console.log(req.payload.userId);
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
			if (error.name === 'UsernameValidError') {
				return res.status(400).json({
					status: 'Bad Request',
					message: error.message,
				});
			}
			if (error.name === 'EmailValidError') {
				return res.status(400).json({
					status: 'Bad Request',
					message: error.message,
				});
			}

			return res.status(500).json({
				status: 'Internal server Error!',
				message: 'Internal server Error!',
			});
		}
	};

	forgotPassword = async (req: Request, res: Response) => {
		try {
			const { email, token, password } = req.body;
			let data;
			if (token == null) {
				data = await this.authenticationService.forgotPassword(email);
			} else {
				data = await this.authenticationService.forgotPassword(
					email,
					token,
					password
				);
			}

			return res.status(200).json({
				status: 'Ok!',
				message: data,
			});
		} catch (error) {
			return res.status(500).json({
				status: 'Internal server Error!',
				message: 'Internal server Error!',
			});
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
			if (error.name === 'OldPasswordError') {
				return res.status(400).json({
					status: 'Bad Request',
					message: error.message,
				});
			}

			return res.status(500).json({
				status: 'Internal server Error!',
				message: 'Internal server Error!',
			});
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
			console.log(error);
			return res.status(500).json({
				status: 'Internal server Error!',
				message: 'Internal server Error!',
			});
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
			console.log(error);
			return res.status(500).json({
				status: 'Internal server Error!',
				message: 'Internal server Error!',
			});
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
			console.log(error);
			return res.status(500).json({
				status: 'Internal server Error!',
				message: 'Internal server Error!',
			});
		}
	};
}
