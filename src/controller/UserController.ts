import { User } from '../models/User';
import { AuthenticationService } from '../services/AuthenticationService';
import { S3Service } from './../services/S3Service';
import { UserService } from './../services/UserService';
import { Request, Response } from 'express';

import Container from 'typedi';

export class UserController {
	private userService: UserService;
	private authenticationService: AuthenticationService;

	constructor() {
		this.userService = Container.get(UserService);
		this.authenticationService = Container.get(AuthenticationService);
	}

	getUser = async (req: Request, res: Response) => {
		try {
			const { username, email, userId } = req.query;
			const searchConditions = {
				username,
				email,
				userId,
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
			let { username, email, gender } = req.query;
			const page = Number(req.query.page) || 1; // Trang mặc định là 1
			const pageSize = Number(req.query.pageSize) || 10; // Số lượng kết quả trên mỗi trang mặc định là 10

			const searchConditions = {
				username,
				email,
				gender,
			};
			const { users, totalCount } = await this.userService.searchUsers(
				searchConditions,
				Number(page),
				Number(pageSize)
			);
			// return res.json(users);
			return res.json({
				status: 'success',
				totalCount: totalCount,
				page: page,
				pageSize: pageSize,
				totalPage: Math.ceil(totalCount / pageSize),
				data: users,
			}) as any;
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: 'Lỗi khi lấy danh sách user' });
		}
	};

	createOrUpdateUser = async (req: Request, res: Response) => {
		try {
			const { userId, email, dateOfBirth, gender, username, password } =
				req.body;

			const data: Partial<User> = {};
			if (userId) {
				if (userId !== undefined) data.userId = userId;
				if (email !== undefined) data.email = email;
				if (dateOfBirth !== undefined) data.dateOfBirth = dateOfBirth;
				if (gender !== undefined) data.gender = gender;
				await this.userService.updateUser(data);
			} else {
				await this.authenticationService.register(
					email,
					dateOfBirth,
					gender,
					username,
					password
				);
			}
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully',
			});
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: 'Lỗi :' + error.message });
		}
	};

	deleteUser = async (req: Request, res: Response) => {
		try {
			const { userId } = req.query;
			await this.userService.deleteUser(Number(userId));
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully',
			});
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: 'Lỗi :' + error.message });
		}
	};

	getFavoriteMovieList = async (req: Request, res: Response) => {
		try {
			const data = await this.userService.findAllMovieFavorite(
				req.payload.userId
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
			const data = await this.userService.findAllWatchHistory(
				req.payload.userId
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
			const data = await this.userService.findAllWatchLater(req.payload.userId);
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
