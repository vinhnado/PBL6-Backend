import express, { Request, Response, Router } from 'express';
import { UserRepository } from '../../repository/User/UserRepository';

class UserController {
	getUser = async (req: Request, res: Response) => {
		try {
			const { username, email, idUser } = req.query;
			const searchConditions = {
				username,
				email,
				idUser,
			};
			const user = await new UserRepository().findOneUser(searchConditions);
			return res.json(user);
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: 'Lỗi khi tìm kiếm user' });
		}
	};
	searchUsers = async (req: Request, res: Response) => {
		try {
			const { username, email, gender, page, pageSize } = req.query;
			const searchConditions = {
				username,
				email,
				gender,
			};
			const users = await new UserRepository().searchUsers(
				searchConditions,
				Number(page),
				Number(pageSize)
			);
			return res.json(users);
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: 'Lỗi khi lấy danh sách user' });
		}
	};
	addFavoriteMovie = async (req: Request, res: Response) => {
		try {
			const {movieId} = req.query;
			console.log(req.payload.userId)
			await new UserRepository().addFavoriteMovie(req.payload.userId, Number(movieId))
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully registerd users!',
			});
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: 'Lỗi khi tao moi' });
		}
	};
}

export default new UserController();
