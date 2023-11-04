import { Inject, Service } from 'typedi';
import { S3Service } from './S3Service';
import { HomeRepository } from '../repository/HomeRepository';
import { IHomeRepository } from '../repository/Interfaces/IHomeRepository';
import { IHomeService } from './Interfaces/IHomeService';

@Service()
export class HomeService implements IHomeService {

	@Inject(() => HomeRepository)
	private homeRepository!: IHomeRepository;

	@Inject(() => S3Service)
	private s3Service!: S3Service;

    public async getMoviesByGenre(genreId: number ,page: number, pageSize: number, sortMovie?: string) {
        try {
            const sortFieldMap: { [key: string]: string } = {
                highRated: 'average_rating',
                newest: 'release_date',
                highFavorited: 'num_favorite',
            };
            if (sortMovie && sortFieldMap[sortMovie]) {
                sortMovie = sortFieldMap[sortMovie];
            } else {
                sortMovie = 'movieId';
            }

            let genres = await this.homeRepository.getMoviesByGenre(genreId, page, pageSize, sortMovie);
            for (const genre of genres) {
                for(const movie of genre.movies){
                    movie.posterURL = await this.s3Service.getObjectUrl(movie.posterURL);
                    movie.backgroundURL = await this.s3Service.getObjectUrl('movies/'.concat((movie.movieId).toString(),'/background.jpg'));
                }
            }
            return genres;
        } catch (error) {
			console.log(error);
            throw new Error('Error while get movies by genres.');
        }
    }
}