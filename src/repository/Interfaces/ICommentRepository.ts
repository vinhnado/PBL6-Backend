import { Comment } from "../../models/Comment";
import { BaseInterface } from "./BaseInterface"

export interface ICommentRepository extends BaseInterface{
    getCommentsByEpisodeId(episodeId: number): Promise<Comment[]>;
}