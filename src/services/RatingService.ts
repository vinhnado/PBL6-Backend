import { Inject, Service } from "typedi";
import { IRatingService } from "./Interfaces/IRatingSerivce";
import { IRatingRepository } from "../repository/Interfaces/IRatingRepository";
import { RatingRepository } from "../repository/RatingRepository";


@Service()
export class RatingService implements IRatingService {

	@Inject(() => RatingRepository)
	private ratingRepository!: IRatingRepository;
        
    async addRating(userId: number, movieId: number, rating: number): Promise<boolean> {
        try {
            const ratingRs = await this.ratingRepository.findByCondition({
                user_id: userId,
                movie_id: movieId
            });
            
            // if rating is already exist
            if(Array.isArray(ratingRs) && ratingRs.length > 0){
                return false;
            }
            
            await this.ratingRepository.addRating({
                userId: userId,
                movieId: movieId,
                rating: rating
            });

            return true;
        } catch (error) {
            throw(error);
        }
    }

}