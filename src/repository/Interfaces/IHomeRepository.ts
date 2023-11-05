import { Genre } from '../../models/Genre';
import { Home } from '../../models/Home';
import { Movie } from '../../models/Movie';

export interface IHomeRepository {
	getHomePoster(): Promise<Home[]>;
	getMoviesByGenre(genre_id: number ,page: number, pageSize: number, sortMovie?: string): Promise<Genre[]>;
}
