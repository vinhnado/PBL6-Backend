import { Request, Response } from 'express';
import Container from 'typedi';
import { RatingService } from '../services/RatingService';
import { IStatisticalService } from '../services/Interfaces/IStatisticalService';
import { StatisticalService } from '../services/StatisticalService';

export class StatisticalController{
	private statisticalService: IStatisticalService;

	constructor() {
		this.statisticalService = Container.get(StatisticalService);
	}

    getRevenueStatistics = async (req: Request, res: Response) => {
        try {
            const revenueStatistics = await this.statisticalService.getRevenueStatistics(req);
            res.status(200).json({
                message: "successful",
                data: revenueStatistics
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Server Error",
            })
        }
    }    
}