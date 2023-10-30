import { Genre } from '../../models/Genre';
import { Movie } from '../../models/Movie';

export interface IHomeRepository {
	getHomePoster(): Promise<string[]>;
	getMoviesByGenre(genre_id: number ,page: number, pageSize: number, sortMovie?: string): Promise<Genre[]>;
}
