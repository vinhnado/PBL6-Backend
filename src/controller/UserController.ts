import { UserService } from './../services/UserService';
import express, { Request, Response, Router } from 'express';
import { UserRepository } from '../repository/UserRepository';
import { User } from '../models/User';
import Container, { Inject, Service } from 'typedi';

@Service()
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

	addFavoriteMovie = async (req: Request, res: Response) => {
		try {
			const { movieId } = req.query;
			console.log(req.payload.userId);
			await new UserRepository().addFavoriteMovie(
				req.payload.userId,
				Number(movieId)
			);
			return res.status(200).json({
				status: 'Ok!',
				message: 'Successfully registerd users!',
			});
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: 'Lỗi khi tao moi' });
		}
	};

	save = async (req: Request, res: Response) => {
		try {
			const { email, dateOfBirth, gender } = req.body;
			const user = new User();
			user.email = email;
			user.dateOfBirth = dateOfBirth;
			user.gender = gender;
			await new UserRepository().save(user);
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
