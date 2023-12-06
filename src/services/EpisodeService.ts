import { Inject, Service } from 'typedi';
import { Episode } from '../models/Episode';
import { EpisodeRepository } from '../repository/EpisodeRepository';
import { IEpisodeRepository } from '../repository/Interfaces/IEpisodeRepository';
import { IEpisodeService } from './Interfaces/IEpisodeService';
import { S3Service } from './S3Service';
import { Comment } from '../models/Comment';
import { CommentRepository } from '../repository/CommentRepository';
import { ICommentRepository } from '../repository/Interfaces/ICommentRepository';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export class EpisodeService implements IEpisodeService {

	@Inject(() => EpisodeRepository)
	private episodeRepository!: IEpisodeRepository;

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
			let episode = await this.episodeRepository.getEpisode(id);
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

	async createEpisode(req: Request): Promise<Episode> {
		try {
			const {
				movieId,
				title,
				description,
				releaseDate,
				duration,
				episodeNo,
			} = req.body;
			const formattedPosterURL = `movies/${movieId}/episodes/${episodeNo}/poster.jpg`;
			const formattedMovieURL = `movies/${movieId}/episodes/${episodeNo}/movie.mp4`;

			const episodeData = {
				movieId : movieId,
				title: title,
				description: description,
				releaseDate: releaseDate,
				duration: duration,
				episodeNo: episodeNo,
				numView:0,
				posterURL: formattedPosterURL,
				movieURL: formattedMovieURL,
			}
			const newEpisode = await this.episodeRepository.createEpisode(episodeData);
			
			return newEpisode;
		} catch (error) {
			throw(error);
		}
	}

	async  updateEpisode(req: Request): Promise<[number, Episode[]]>
	{
		try {
			const episodeId = Number(req.params.episodeId);
			const updatedData = req.body;
			return await this.episodeRepository.updateEpisode(episodeId, updatedData);
		} catch (error) {
			console.log(error);
			throw(error);			
		}
	}

	async deleteEpisode(req: Request): Promise<boolean>
	{
		try {
			const episodeId = req.params.episodeId;
			const episode = await this.episodeRepository.findById(Number(episodeId));
			if(episode){
				await this.episodeRepository.delete(episode);
				await this.episodeRepository.updateNumEpisodeInMovie(episode.movieId,-1);
				return true;
			}
			return false;
		} catch (error) {
			console.log(error);
			throw(error);
		}
	}

	async getPresignUrlToUploadPosterAndMovie(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>): Promise<{ key: string, value: string }[]> {
		try {
			const movieId = req.body.movieId;
			const episodeNo = req.body.episodeNo;
			const poster = await this.s3Service.generatePresignedUrlUpdate('movies/'+movieId+'/episode/'+episodeNo+'/poster.jpg','image/jpeg');
			const movie = await this.s3Service.generatePresignedUrlUpdate('movies/'+movieId+'/episode/'+episodeNo+'/movie.mp4','video/mp4');

			const presignedUrls: { key: string, value: string }[] = [
				{ key: 'poster', value: poster },
				{ key: 'movie', value: movie },
			  ];
		  
			return presignedUrls;
		} catch (error) {
			console.log(error);
			throw(error);
		}
	}
	
	async getPresignUrlToUploadMovie(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>): Promise<string> {
		try {
			const movieId = req.body.movieId;
			const episodeNo = req.body.episodeNo;
			const movie = await this.s3Service.generatePresignedUrlUpdate('movies/'+movieId+'/episode/'+episodeNo+'/movie.mp4','video/mp4');
			return movie;
		} catch (error) {
			console.log(error);
			throw(error);
		}	}

	async getPresignUrlToUploadPoster(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>): Promise<string> {
		try {
			const movieId = req.body.movieId;
			const episodeNo = req.body.episodeNo;
			const poster = await this.s3Service.generatePresignedUrlUpdate('movies/'+movieId+'/episode/'+episodeNo+'/poster.jpg','image/jpeg');
			return poster;
		} catch (error) {
			console.log(error);
			throw(error);
		}	}

}
