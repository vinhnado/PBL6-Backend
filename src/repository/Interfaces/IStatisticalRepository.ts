import { Payment } from '../../models/Payment';
import { BaseInterface } from './BaseInterface';

export interface IStatisticalRepository extends BaseInterface {
    getRevenueStatistics(startDate: string, enđate: string, statisBy: string, rawUserId: string): Promise<any[]>
}
