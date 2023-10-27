import { Movie } from '../../models/Movie';

export interface IHomeRepository {
	getHomePoster(): Promise<string[]>;
}
