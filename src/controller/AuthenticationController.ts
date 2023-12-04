import { Request, Response } from 'express';
import Container, { Inject, Service } from 'typedi';
import { IAuthenticationService } from '../services/Interfaces/IAuthenticationService';
import { AuthenticationService } from '../services/AuthenticationService';

export class AuthenticationController {
	private authenticationService = Container.get(AuthenticationService);

	constructor() {
		this.authenticationService = Container.get(AuthenticationService);
	}

	login = async (req: Request, res: Response) => {
		try {
			const { username, password } = req.body;
			const token = await this.authenticationService.login(username, password);
			if (token === '') {
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
		} catch (error) {
			console.log(error);
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
			console.log(error);
			return res.status(500).json({
				status: 'Internal server Error!',
				message: 'Internal server Error!',
			});
		}
	};

	activeUser = async (req: Request, res: Response) => {
		try {
			const { email, token } = req.body;
			let data;
			if (token == null) {
				data = await this.authenticationService.activeUser(email);
			} else {
				data = await this.authenticationService.activeUser(email, token);
			}

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
}
