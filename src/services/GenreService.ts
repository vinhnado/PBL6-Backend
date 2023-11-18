import { Inject, Service } from 'typedi';
import { S3Service } from './S3Service';
import { IGenreService } from './Interfaces/IGenreService';
import { GenreRepository } from '../repository/GenreRepository';
import { IGenreRepository } from '../repository/Interfaces/IGenreRepository';
import { Genre } from '../models/Genre';

@Service()
export class GenreService implements IGenreService {

	@Inject(() => GenreRepository)
	private genreRepository!: IGenreRepository;

	@Inject(() => S3Service)
	private s3Service!: S3Service;

    async getAllGenres(): Promise<Genre[]> {
        try {
            console.log('ok');
            
           return await this.genreRepository.getAllGenre();
        } catch (error) {
            console.log(error);
            throw new Error('Can not get genres.');
        }
    }
}