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
import { MovieRepository } from '../repository/MovieRepository';
import { IMovieRepository } from '../repository/Interfaces/IMovieRepository';

@Service()
export class EpisodeService implements IEpisodeService {

	@Inject(() => EpisodeRepository)
	private episodeRepository!: IEpisodeRepository;

	@Inject(() => S3Service)
	private s3Service!: S3Service;

	@Inject(() => CommentRepository)
	private commentRepository!: ICommentRepository;
	
	@Inject(() => MovieRepository)
	private movieRepository!: IMovieRepository;

	hideEmail(email:string) {
		const atIndex = email.indexOf('@');
		
		if (atIndex > 1) {
		  const username = email.substring(0, atIndex);
		  const domain = email.substring(atIndex);
		  
		  // Hiển thị 3 ký tự đầu, sau đó thêm dấu sao và hiển thị 3 ký tự cuối
		  const hiddenUsername = username.substring(0, 4) + '*'.repeat(username.length - 3);
		  
		  return hiddenUsername + domain;
		}
		
		// Trường hợp không có ký tự @ trong email
		return email;
	  }

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
	}

	async getCommentsOfEpisode(episodeId: number, page: number, pageSize:number): Promise<Comment[]> {
		try {
			let comments = await this.commentRepository.getCommentsByEpisodeId(episodeId, page, pageSize);
			let url = '';
			const userArr = new Map<number, string>();
			userArr.set(0, await this.s3Service.getObjectUrl('default/avatar.jpg'));
			for(let comment of comments){
				if(comment.user.email){
					comment.user.setDataValue('email',this.hideEmail(comment.user.getDataValue('email')));
				}
				if(!comment.user.avatarURL){
					const id = Number(comment.user.getDataValue('user_id'));
					if (!userArr.has(id)) {
						const imageUrl = await this.s3Service.getObjectUrl(comment.user.getDataValue('avatar_url'));
						userArr.set(id, imageUrl);
					}
				}

				for(let subComment of comment.subcomments){
					if(subComment.user.email){
						subComment.user.setDataValue('email',this.hideEmail(subComment.user.getDataValue('email')));
					}
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
			} = req.body;
			const lastEpisode =await this.episodeRepository.getTheLastEpisodeOfMovie(movieId);
			let episodeNo = 1;
			if(lastEpisode.length !==0){
				episodeNo = lastEpisode[0].episodeNo+1
			}
			const formattedPosterURL = `movies/${movieId}/episodes/${episodeNo}/poster.jpg`;
			const formattedMovieURL = `movies/${movieId}/episodes/${episodeNo}/movie.mp4`;
			
			const episodeData = {
				movieId : movieId,
				title: title,
				description: description,
				releaseDate: releaseDate,
				duration: 0,
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
	async checkMovieIsSeries(movieId: number): Promise<boolean> {
		try {

			const movie = await this.movieRepository.findOneByCondition({
				movieId: movieId
			});
			console.log(movie.isSeries);
			
			return movie.isSeries;
		} catch (error) {
			console.log(error);
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
			const movieId = req.query.movieId;
			const episodeNo = req.query.episodeNo;
			const option = req.query.option;
			if(option==='onlyMovie'){
				const movie = await this.s3Service.generatePresignedUrlUpdate('movies/'+movieId+'/episode/'+episodeNo+'/movie.mp4','video/mp4');
				const presignedUrls: { key: string, value: string }[] = [
					{ key: 'movie', value: movie },
				];
				return presignedUrls;
			}else if(option==='onlyPoster'){
				const poster = await this.s3Service.generatePresignedUrlUpdate('movies/'+movieId+'/episode/'+episodeNo+'/poster.jpg','image/jpeg');
				const presignedUrls: { key: string, value: string }[] = [
					{ key: 'poster', value: poster },
				];
				return presignedUrls;
			}else{
				const poster = await this.s3Service.generatePresignedUrlUpdate('movies/'+movieId+'/episode/'+episodeNo+'/poster.jpg','image/jpeg');
				const movie = await this.s3Service.generatePresignedUrlUpdate('movies/'+movieId+'/episode/'+episodeNo+'/movie.mp4','video/mp4');
				const presignedUrls: { key: string, value: string }[] = [
					{ key: 'poster', value: poster },
					{ key: 'movie', value: movie },
				];
				return presignedUrls;
			}
		} catch (error) {
			console.log(error);
			throw(error);
		}
	}
}
