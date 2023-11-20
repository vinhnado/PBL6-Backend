import { Comment } from "../../models/Comment";
import { Request } from 'express';

export interface ICommentService {
    addComment(req: Request): Promise<Comment|null>;
    deleteComment(req: Request): Promise<boolean>;
    updateComment(req: Request): Promise<Comment|null>;
}
