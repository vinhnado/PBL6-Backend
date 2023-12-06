import { Comment } from "../../models/Comment";
import { Episode } from "../../models/Episode";
import { Request } from 'express';

export interface IEpisodeService {
    getEpisode(id: number): Promise<Episode|null>;
    getCommentsOfEpisode(episodeId: number, page: number, pageSize:number): Promise<Comment[]>;
    createEpisode(req: Request): Promise<Episode>;
    updateEpisode(req: Request): Promise<[number, Episode[]]>;
    deleteEpisode(req: Request): Promise<boolean>;
    getPresignUrlToUploadPosterAndMovie(req: Request): Promise<{ key: string, value: string }[]>;
    getPresignUrlToUploadMovie(req: Request): Promise<string>;
    getPresignUrlToUploadPoster(req: Request): Promise<string>;
}
