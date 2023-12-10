import { Director } from '../models/Director';
import { DirecorRepository } from '../repository/DirectorRepository';
import { Inject, Service } from 'typedi';
import { S3Service } from './S3Service';
import { Request, Response } from 'express';

@Service()
export class DirectorService {
	@Inject(() => DirecorRepository)
	private directorRepository!: DirecorRepository;

	@Inject(() => S3Service)
	private s3Service!: S3Service;

	findDirectortorInfomation = async (directorId: number) => {
		try {
			let director = await this.directorRepository.findDirectorInfomation(
				directorId
			);
			director!.avatar = await this.s3Service.getObjectUrl(director!.avatar);
			director!.poster = await this.s3Service.getObjectUrl(director!.poster);
			console.log(director);
			for (const movie of director!.movies) {
				movie.posterURL = await this.s3Service.getObjectUrl(movie.posterURL);
				movie.trailerURL = await this.s3Service.getObjectUrl(movie.trailerURL);
				movie.backgroundURL = await this.s3Service.getObjectUrl(
					'movies/'.concat(movie.movieId.toString(), '/background.jpg')
				);
			}
			return director;
		} catch (error) {
			console.log(error);
			throw new Error('Cannot get all movie');
		}
	};

	createDirector =  async (req: Request) => {
		try {
			const { name, gender, dateOfBirth, description } = req.body;
			const directorData: Partial<Director> = {
				name, gender, dateOfBirth, description
			};

			return await this.directorRepository.save(Director.build(directorData));

		} catch (error: any) {
			throw(error);
		}
	}

	updateDirector = async (req: Request) => {
		const { name, gender, dateOfBirth, description } = req.body;
		const directorId = Number(req.params.directorId);
		const actorData: Partial<Director> = {
			name, gender, dateOfBirth, description
		};

		const directorToUpdate = await this.directorRepository.findById(
			directorId
		);

		if (directorToUpdate) {
			await directorToUpdate.update(actorData);
			await this.directorRepository.save(directorToUpdate);
			return directorToUpdate;
		} else {
			return null;
		}
	}

	findByDirectorId = async (directorId: number) => {
		try {
			return this.directorRepository.findById(directorId);
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	deleteDirector = async (directorId: number) => {
		try {
			const director = await this.directorRepository.findById(directorId);
			if(!director){
				return false;
			}
			await this.directorRepository.delete(director);
			return true;
		} catch (error: any) {
			throw(error);
		}
	};

	getAllDirector = async () => {
		try {
			return await this.directorRepository.findMany();
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getDirectors = async (
		search: string,
		page: number,
		pageSize: number
	) => {
		try {
			const directors = await this.directorRepository.searchAllDirector(
				search,
				page,
				pageSize
			);
			for (const director of directors.rows) {
				if (director!.avatar) {
					director!.avatar = await this.s3Service.getObjectUrl(director!.avatar);
				} else {
					director!.avatar = await this.s3Service.getObjectUrl(
						'default/director/default_avatar.jpg'
					);
				}
				if (director!.poster) {
					director!.poster = await this.s3Service.getObjectUrl(director!.poster);
				} else {
					director!.poster = await this.s3Service.getObjectUrl(
						'default/director/default_poster.jpg'
					);
				}
			}
			return directors;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
