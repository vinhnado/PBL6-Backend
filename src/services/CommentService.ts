import { Inject, Service } from "typedi";
import { ICommentService } from "./Interfaces/ICommentsService";
import { CommentRepository } from "../repository/CommentRepository";
import { ICommentRepository } from "../repository/Interfaces/ICommentRepository";
import { Request } from "express";
import { ParsedQs } from "qs";
import { Comment } from "../models/Comment";

@Service()
export class CommentService implements ICommentService {

	@Inject(() => CommentRepository)
	private commentRepository!: ICommentRepository;

    async deleteComment(req: Request): Promise<boolean> {
        try {
            const commentId = Number(req.params.commentId);
            
            const userId = Number(req.payload.userId);

            const comment = await this.commentRepository.findById(commentId);
            if (comment && comment.userId === userId) {
                await this.commentRepository.delete(comment);
                return true;
            }
            return false;
        } catch (error) {
            throw(error);
        }
    }

    async updateComment(req: Request): Promise<Comment | null> {
        try {
            const commentId = Number(req.params.commentId);
            const userId = Number(req.payload.userId);
            const updatedContent = req.body.content;
            
            const commentToUpdate = await this.commentRepository.findById(commentId);
            
            if(!commentToUpdate || userId !== commentToUpdate.userId){
                return null;
            }
            commentToUpdate.content = updatedContent;
            await this.commentRepository.save(commentToUpdate);
            return commentToUpdate;
        } catch (error) {
            throw(error);
        }
    }

    async addComment(req: Request): Promise<Comment | null> {
        try {
            
            if(!req.body.episodeId ){
                return null;
            }
            const userId = Number(req.payload.userId);
            
            if(!userId){
                return null;
            }
            const data: Partial<Comment> = {
                userId: userId,
                episodeId: req.body.episodeId,
                content: req.body.content || '',
                numLike: '0',
                createdAt: new Date(),
                updatedAt: new Date(),

            };
            const comment = await this.commentRepository.addComment(data);
            return comment;
        } catch (error) {
            console.error(error);
            throw(error);
        }
    }
}
