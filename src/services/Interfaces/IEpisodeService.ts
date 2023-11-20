import { Comment } from "../../models/Comment";
import { Episode } from "../../models/Episode";

export interface IEpisodeService {
    getEpisode(id: number): Promise<Episode|null>;
    getCommentsOfEpisode(episodeId: number, page: number, pageSize:number): Promise<Comment[]>;
}
