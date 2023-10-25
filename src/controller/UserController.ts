import { UserService } from './../services/UserService';
import { Request, Response } from 'express';

import Container from 'typedi';

export class UserController {
	private userService: UserService;

	constructor() {
		this.userService = Container.get(UserService);
	}

	getUser = async (req: Request, res: Response) => {
		try {
			const { username, email, idUser } = req.query;
			const searchConditions = {
				username,
				email,
				idUser,
			};
			const user = await this.userService.findOneUser(searchConditions);
			return res.json(user);
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: 'Lỗi khi tìm kiếm user' });
		}
	};

	getSelfInfo = async (req: Request, res: Response) => {
		try {
			const searchConditions = {
				userId: req.payload.userId,
			};
			const user = await this.userService.findOneUser(searchConditions);
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
			console.log(this.userService);
			const users = await this.userService.searchUsers(
				searchConditions,
				Number(page),
				Number(pageSize)
			);
			// return res.json(users);
			return res.json({
				status: 'success',
				data: users,
				page: page,
				pageSize: pageSize,
			}) as any;
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: 'Lỗi khi lấy danh sách user' });
		}
	};

	getFavoriteMovieList = async (req: Request, res: Response) => {
		try {
			const { page, pageSize } = req.query;

			const data = await this.userService.findAllFavoriteMovie(
				req.payload.userId,
				Number(page),
				Number(pageSize)
			);
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully',
				data: data,
			});
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: 'Lỗi :' + error.message });
		}
	};

	getAllWatchHistory = async (req: Request, res: Response) => {
		try {
			const { page, pageSize } = req.query;

			const data = await this.userService.findAllWatchHistory(
				req.payload.userId,
				Number(page),
				Number(pageSize)
			);
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully',
				data: data,
			});
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: 'Lỗi :' + error.message });
		}
	};

	getAllWatchList = async (req: Request, res: Response) => {
		try {
			const { page, pageSize } = req.query;

			const data = await this.userService.findAllWatchList(
				req.payload.userId,
				Number(page),
				Number(pageSize)
			);
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully',
				data: data,
			});
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: 'Lỗi :' + error.message });
		}
	};

	addFavoriteMovie = async (req: Request, res: Response) => {
		try {
			const { movieId } = req.query;
			await this.userService.saveFavoriteMovie(
				req.payload.userId,
				Number(movieId)
			);
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully',
			});
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: 'Lỗi khi tao moi' });
		}
	};

	addWatchHistory = async (req: Request, res: Response) => {
		try {
			const { movieId, duration } = req.query;
			console.log(req.payload.userId);
			await this.userService.addWatchHistory(
				req.payload.userId,
				Number(movieId),
				Number(duration)
			);
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully!',
			});
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: 'Lỗi khi tao moi' });
		}
	};

	addWatchList = async (req: Request, res: Response) => {
		try {
			const { movieId } = req.query;
			console.log(req.payload.userId);
			await this.userService.addWatchList(req.payload.userId, Number(movieId));
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully!',
			});
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: 'Lỗi khi tao moi' });
		}
	};
}
