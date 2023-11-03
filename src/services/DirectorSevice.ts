import { Director } from '../models/Director';
import { DirecorRepository } from '../repository/DirectorRepository';
import { Inject, Service } from 'typedi';
import { S3Service } from './S3Service';

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

	createOrUpdate = async (directorData: Partial<Director>) => {
		try {
			if (directorData.directorId) {
				const directorToUpdate = await this.directorRepository.findById(
					directorData.directorId
				);
				if (directorToUpdate) {
					await directorToUpdate.update(directorData);
					return await this.directorRepository.save(directorToUpdate);
				} else {
					throw new Error('director not found for the given ID');
				}
			} else {
				return await this.directorRepository.save(Director.build(directorData));
			}
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

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
			return await this.directorRepository.delete(director);
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	deleteActorByDirectorId = async (directorId: number) => {
		try {
			const director = await this.directorRepository.findById(directorId);
			return await this.directorRepository.delete(director);
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
	getAllDirector = async () => {
		try {
			return await this.directorRepository.findMany();
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	searchAllDirector = async (
		search: string,
		page: number,
		pageSize: number
	) => {
		try {
			const data = await this.directorRepository.searchAllDirector(
				search,
				page,
				pageSize
			);
			return data;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
