import { Service } from "typedi";
import { Comment } from "../models/Comment";
import { SubComment } from "../models/SubComment";
import { User } from "../models/User";
import { BaseRepository } from "./BaseRepository";
import { ICommentRepository } from "./Interfaces/ICommentRepository";

@Service()
export class CommentRepository extends BaseRepository<Comment> implements ICommentRepository{

    constructor(){
		super(Comment);
	}

    getCommentsByEpisodeId(episodeId: number, page: number, pageSize:number): Promise<Comment[]> {
        try {
            const offset = (page - 1) * pageSize;
            return this.model.findAll({ 
		        attributes: { exclude: ['deletedAt', 'user_id'] },
                where: {episode_id: episodeId},
                include: [
                    {
                        model: User, // Assuming the model for subcomments is named 'Subcomment'
                        attributes: ['user_id', 'gender', 'avatar_url'],
                    },
                    {
                        model: SubComment,
                        attributes: { exclude: ['deletedAt'] },
                        //   required: true,
                        include:[
                            {
                                model: User,
                                attributes: ['user_id', 'gender', 'avatar_url'],
                            },
                        ]
                    },
                ],
                limit: pageSize, // Số lượng kết quả trên mỗi trang
                offset: offset, // Vị trí bắt đầu
             });
        } catch (error: any) {
			throw new Error('Can not get comments: ' + error.message);
        }
    }

}
