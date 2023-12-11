import { Quality } from '../../models/Quality';

export interface IHomeRepository {
	getQualityMovie(episodeId: number, videoQuality: string): Promise<Quality>;
}
