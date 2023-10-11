import { Request, Response } from 'express';
import { AuthenticationService } from '../../services/Authentication/AuthenticationService';

class AuthenticationController {
	async login(req: Request, res: Response) {
		try {
			const { username, password } = req.body;
			const token = await new AuthenticationService().login(username, password);
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
	}

	async register(req: Request, res: Response) {
		try {
			const { email, dateOfBirth, gender, username, password } = req.body;

			await new AuthenticationService().register(
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
	}
}

export default new AuthenticationController();
