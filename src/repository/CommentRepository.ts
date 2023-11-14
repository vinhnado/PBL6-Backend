import { Comment } from "../models/Comment";
import { SubComment } from "../models/SubComment";
import { BaseRepository } from "./BaseRepository";
import { ICommentRepository } from "./Interfaces/ICommentRepository";

export class CommentRepository extends BaseRepository<Comment> implements ICommentRepository{

    constructor(){
		super(Comment);
	}

    getCommentsByEpisodeId(episodeId: number): Promise<Comment[]> {
        try {
            return this.model.findAll({ 
		        attributes: { exclude: ['deletedAt'] },
                where: {episode_id: episodeId},
                include: [
                    {
                        model: SubComment,
                        attributes: { exclude: ['deletedAt'] },
                        //   required: true,
                    },
                ]
             });
        } catch (error: any) {
			throw new Error('Can not get comments: ' + error.message);
        }
    }

}
