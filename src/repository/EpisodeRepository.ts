import { Service } from 'typedi';
import { Episode } from '../models/Episode';
import { BaseRepository } from './BaseRepository';
import { IEpisodeRepository } from './Interfaces/IEpisodeRepository';

@Service()
export class EpisodeRepository extends BaseRepository<Episode> implements IEpisodeRepository{

    constructor(){
		super(Episode);
	}
    async getEpisode(id: number): Promise<Episode | null> {
        try{
            const episode = await Episode.findByPk(id,{
                attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] }
            });
            return episode || null;
        }catch (error: any) {
			throw new Error('Can not get Episode: ' + error.message);
		}
    }
    async getEpisodes(searchCondition: any, page: Number, pageSize: Number): Promise<Episode> {
        throw new Error('Method not implemented.');
    }
    async deleteEpisode(id: Number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    createEpisode(episode: Episode): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    async updateEpisode(episode: Episode): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    async getAllEpisodeOfMovie(movie_id: number): Promise<Episode[]> {
        try {
            const episodes = await Episode.findAll({
              where: {
                movie_id: movie_id, // Điều này tương ứng với trường movieId trong model Episode
              },
            });
            return episodes;
        } catch (error: any) {
            throw new Error('Không thể lấy thông tin tập phim: ' + error.message);
          }
    }

}