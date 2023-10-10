import { Episode } from "../../models/Episode";

export interface IEpisodeRepository{
    getEpisode(id: number):Promise<Episode|null>
    getEpisodes(searchCondition:any,page:Number,pageSize:Number):Promise<Episode>
    deleteEpisode(id: number):Promise<void>
    createEpisode(episode: Episode): Promise<boolean>
    updateEpisode(episode: Episode): Promise<boolean>
    getAllEpisodeOfMovie(movie_id: number): Promise<Episode[]>
}