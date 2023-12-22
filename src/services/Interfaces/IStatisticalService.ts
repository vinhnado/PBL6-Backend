import { Request } from 'express';


export interface IStatisticalService
{
    getRevenueStatistics(req: Request): Promise<any[]>;
    getStatisticsMoviesByGenres(): Promise<any[]>;
    getStatisticsComments(): Promise<any> ; 
}