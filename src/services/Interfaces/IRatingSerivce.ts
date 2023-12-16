import { Rating } from "../../models/Rating";

export interface IRatingService{
    addRating(userId: number, movieId: number, rating: number): Promise<boolean>;
    getRatingMovieOfUser(userId: number, movieId: number): Promise<number>;
}