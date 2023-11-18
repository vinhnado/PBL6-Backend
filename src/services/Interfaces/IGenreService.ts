import { Genre } from "../../models/Genre";

export interface IGenreService {
    getAllGenres(): Promise<Genre[]>;
}
