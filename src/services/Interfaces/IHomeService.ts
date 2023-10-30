import { Genre } from "../../models/Genre";

export interface IHomeService {
	getHomePosters():any;
	getMoviesByGenre(genreId: number ,page: number, pageSize: number, sortMovie?: string):Promise<Genre[]>;
}
