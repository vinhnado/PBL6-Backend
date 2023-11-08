import { S3Service } from './../services/S3Service';
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
			console.log(req.payload.userId);
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

			const data = await this.userService.findAllMovieFavorite(
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

	getWatchHistoryList = async (req: Request, res: Response) => {
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

	getAllWatchLaterList = async (req: Request, res: Response) => {
		try {
			const { page, pageSize } = req.query;

			const data = await this.userService.findAllWatchLater(
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

	saveMovieFavorite = async (req: Request, res: Response) => {
		try {
			const { movieId } = req.query;
			await this.userService.saveMovieFavorite(
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

	saveWatchHistory = async (req: Request, res: Response) => {
		try {
			const { episodeId, duration } = req.query;
			await this.userService.saveWatchHistory(
				req.payload.userId,
				Number(episodeId),
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

	addWatchLater = async (req: Request, res: Response) => {
		try {
			const { movieId } = req.query;
			await this.userService.saveWatchLater(
				req.payload.userId,
				Number(movieId)
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

	deleteWatchHistory = async (req: Request, res: Response) => {
		try {
			const { episodeId } = req.query;
			await this.userService.deleteWatchHistory(
				req.payload.userId,
				Number(episodeId)
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

	deleteMovieFavorite = async (req: Request, res: Response) => {
		try {
			const { movieId } = req.query;
			await this.userService.deleteMovieFavorite(
				req.payload.userId,
				Number(movieId)
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

	deleteWatchLater = async (req: Request, res: Response) => {
		try {
			const { movieId } = req.query;
			await this.userService.deleteWatchLater(
				req.payload.userId,
				Number(movieId)
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

	getWatchHistory = async (req: Request, res: Response) => {
		try {
			const { movieId } = req.query;
			const data = await this.userService.getWatchHistory(
				req.payload.userId,
				Number(movieId)
			);
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully!',
				data: data,
			});
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: 'Lỗi khi tao moi' });
		}
	};
}
