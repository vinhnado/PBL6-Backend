import { Director } from '../models/Director';
import { DirecorRepository } from '../repository/DirectorRepository';
import { Inject, Service } from 'typedi';

@Service()
export class DirectorService {
	@Inject(() => DirecorRepository)
	private directorRepository!: DirecorRepository;

	findDirectortorInfomation = async (
		directorId: number,
		page: number,
		pageSize: number
	) => {
		try {
			return await this.directorRepository.findAllMovieByDirectorId(
				directorId,
				page,
				pageSize
			);
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
