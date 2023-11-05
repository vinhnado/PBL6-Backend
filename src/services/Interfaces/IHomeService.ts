import { Genre } from "../../models/Genre";
import { Home } from "../../models/Home";

export interface IHomeService {
	getMoviesByGenre(genreId: number ,page: number, pageSize: number, sortMovie?: string):Promise<Genre[]>;
	getHomePoster(): Promise<Home[]>;
}
