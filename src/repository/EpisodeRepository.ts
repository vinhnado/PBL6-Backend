import { Service } from 'typedi';
import { Episode } from '../models/Episode';
import { BaseRepository } from './BaseRepository';
import { IEpisodeRepository } from './Interfaces/IEpisodeRepository';
import { Comment } from '../models/Comment';
import { SubComment } from '../models/SubComment';
import { User } from '../models/User';

@Service()
export class EpisodeRepository extends BaseRepository<Episode> implements IEpisodeRepository{

    constructor(){
		super(Episode);
	}

    async getEpisode(id: number): Promise<Episode | null> {
        try{
            const episode = await Episode.findByPk(id,{
                attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] },
                // include: [
                //     {
                //         model: Comment,
                //         attributes: { exclude: ['deletedAt'] },
                //         include: [
                //             {
                //                 model: User, // Assuming the model for subcomments is named 'Subcomment'
                //                 attributes: { exclude: ['deletedAt'] },
                //             },
                //             {
                //               model: SubComment, // Assuming the model for subcomments is named 'Subcomment'
                //               attributes: { exclude: ['deletedAt'] },
                //               include: [
                //                     {
                //                         model: User, // Assuming the model for subcomments is named 'Subcomment'
                //                         attributes: { exclude: ['deletedAt'] },
                //                     },
                //                 ],
                //             },
                //         ],
                //         limit: 10, // Limit the number of comments to 10
                //     },
                // ]
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

    async createEpisode(episode: Episode): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    async updateEpisode(episode: Episode): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    async getAllEpisodeOfMovie(movie_id: number): Promise<Episode[]> {
        try {
            const episodes = await Episode.findAll({
              where: {
                movie_id: movie_id,
              },
            });
            return episodes;
        } catch (error: any) {
            throw new Error('Can not get episodes of movie: ' + error.message);
          }
    }

}