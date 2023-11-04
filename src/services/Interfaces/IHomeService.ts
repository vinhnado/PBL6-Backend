import { Genre } from "../../models/Genre";

export interface IHomeService {
	getMoviesByGenre(genreId: number ,page: number, pageSize: number, sortMovie?: string):Promise<Genre[]>;
}
