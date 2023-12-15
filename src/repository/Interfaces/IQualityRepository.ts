import { Quality } from '../../models/Quality';

export interface IQualityRepository {
	getQualityMovie(episodeId: number, videoQuality: string): Promise<Quality|null>;
}
