import { Episode } from "../../models/Episode";

export interface IEpisodeService {
    getEpisode(id: number): Promise<Episode|null>;
}
