import { Inject, Service } from 'typedi';
import { Episode } from '../models/Episode';
import { EpisodeRepository } from '../repository/EpisodeRepository';
import { IEpisodeRepository } from '../repository/Interfaces/IEpisodeRepository';
import { IEpisodeService } from './Interfaces/IEpisodeService';
import { S3Service } from './S3Service';

@Service()
export class EpisodeService implements IEpisodeService {

    @Inject(() => EpisodeRepository)
	private movieRepository!: IEpisodeRepository;

    @Inject(() => S3Service)
	private s3Service!: S3Service;

    async getEpisode(id: number): Promise<Episode|null> {
        try {
            let episode =await this.movieRepository.getEpisode(id);
            if(episode){
                episode.posterUrl = await this.s3Service.getObjectUrl(episode.posterUrl);
                episode.movieUrl = await this.s3Service.getObjectUrl(episode.movieUrl);
            }
            return episode;
        } catch (error) {
            throw new Error('Can not get episode.');
        }
    }
}