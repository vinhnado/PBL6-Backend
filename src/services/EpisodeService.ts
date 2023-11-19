import { Inject, Service } from 'typedi';
import { Episode } from '../models/Episode';
import { EpisodeRepository } from '../repository/EpisodeRepository';
import { IEpisodeRepository } from '../repository/Interfaces/IEpisodeRepository';
import { IEpisodeService } from './Interfaces/IEpisodeService';
import { S3Service } from './S3Service';
import { Comment } from '../models/Comment';
import { CommentRepository } from '../repository/CommentRepository';
import { ICommentRepository } from '../repository/Interfaces/ICommentRepository';

@Service()
export class EpisodeService implements IEpisodeService {

	@Inject(() => EpisodeRepository)
	private movieRepository!: IEpisodeRepository;

	@Inject(() => S3Service)
	private s3Service!: S3Service;

	@Inject(() => CommentRepository)
	private commentRepository!: ICommentRepository;

	/**
	 * Get details a episode of movie by episode_id
	 *
	 * @param id number
	 * @returns Promise<Episode|null>
	 */
	async getEpisode(id: number): Promise<Episode | null> {
		try {
			let episode = await this.movieRepository.getEpisode(id);
			if (episode) {
				if (episode.posterURL) {
					episode.posterURL = await this.s3Service.getObjectUrl(
						episode.posterURL
					);
				} else {
					episode.posterURL = await this.s3Service.getObjectUrl(
						'default/poster_default.jpg'
					);
				}

				if (episode.movieURL) {
					episode.movieURL = await this.s3Service.getObjectUrl(
						episode.movieURL
					);
				} else {
					episode.movieURL = await this.s3Service.getObjectUrl(
						'default/movie_default.mp4'
					);
				}
			}
			return episode;
		} catch (error) {
			throw new Error('Can not get episode.');
		}
	}	async getCommentsOfEpisode(episodeId: number, page: number, pageSize:number): Promise<Comment[]> {
		try {
			let comments = await this.commentRepository.getCommentsByEpisodeId(episodeId, page, pageSize);
			let url = '';
			const userArr = new Map<number, string>();
			userArr.set(0, await this.s3Service.getObjectUrl('default/avatar.jpg'));
			for(let comment of comments){
				if(!comment.user.avatarURL){
					const id = Number(comment.user.getDataValue('user_id'));
					if (!userArr.has(id)) {
						const imageUrl = await this.s3Service.getObjectUrl(comment.user.getDataValue('avatar_url'));
						userArr.set(id, imageUrl);
					}
				}

				for(let subComment of comment.subcomments){
					if(!subComment.user.avatarURL){
						const id = Number(subComment.user.getDataValue('user_id'));
						if (!userArr.has(id)) {
							const imageUrl = await this.s3Service.getObjectUrl(subComment.user.getDataValue('avatar_url'));
							userArr.set(id, imageUrl);
						}
					}
				}
			}
			
			for(let comment of comments)
			{
				if(comment.user.getDataValue('avatar_url')){
					url = userArr.get(comment.user.getDataValue('user_id'))||'';

				}else{
					url = userArr.get(0)||'';
				}
				comment.user.setDataValue('avatar_url',url);

				for(let subComment of comment.subcomments){
					if(subComment.user.getDataValue('avatar_url')){
						url = userArr.get(comment.user.getDataValue('user_id'))||'';

					}else{
						url = userArr.get(0)||'';
					}
					subComment.user.setDataValue('avatar_url',url);
				}
			}
			return comments;
		} catch (error) {
			throw new Error('Err get comment of episode.');
		}
	}


}
