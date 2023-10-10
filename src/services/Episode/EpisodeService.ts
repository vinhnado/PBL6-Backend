import { Episode } from '../../models/Episode';
import { EpisodeRepository } from '../../repository/Episode/EpisodeRepository';

export class EpisodeService {
    async getEpisode(id: number): Promise<Episode | null> {
        try{
            const episode = await new EpisodeRepository().getEpisode(id)
            return episode || null;
        }catch (error: any) {
			throw new Error('Không thể lấy thông tin Episode: ' + error.message);
		}
    }

    async getAllEpisodeOfMovie(movie_id: number): Promise<Episode[]> {
        try{
            const episode = await new EpisodeRepository().getAllEpisodeOfMovie(movie_id)
            return episode;
        }catch (error: any) {
			throw new Error('Không thể lấy thông tin Episode Movie: ' + error.message);
		}
    }
}