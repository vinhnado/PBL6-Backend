import { Service } from "typedi";
import { Payment } from "../models/Payment";
import { BaseRepository } from "./BaseRepository";
import { IStatisticalRepository } from "./Interfaces/IStatisticalRepository";
import { Op, QueryTypes, literal, OrderItem, Sequelize } from 'sequelize';


@Service()
export class StatisticalRepository extends BaseRepository<Payment> implements IStatisticalRepository {
	
	constructor(){
		super(Payment);
	}

    getRevenueStatistics(startDate: string, endDate: string, statisBy: string, rawStringUserId: string): Promise<any[]> {
         try {
            const sequelize = this.model.sequelize;
            if(!sequelize){
                return this.model.findAll({
                });
            }
            return sequelize.query(`
            SELECT 
                ${this.getSelectExpression('payments', statisBy)} AS interval,
                SUM("payments"."price") AS total_price
            FROM 
                "payments"
            WHERE
                "payments"."createdAt" BETWEEN '${startDate}' AND '${endDate}' ${rawStringUserId}
                AND "payments"."is_payment" = true
            GROUP BY 
                interval
            ORDER BY 
                interval;
        `, {
            type: QueryTypes.SELECT,
            raw: true,
        });
         } catch (error) {
            console.log(error);
            throw(error);
         }
    }

    getSelectExpression(table: string, statisBy: string): string {
        switch (statisBy) {
            case 'year':
                return `EXTRACT(YEAR FROM "${table}"."createdAt")`;
            case 'month':
                return `DATE_TRUNC('month', "${table}"."createdAt")`;
            case 'week':
                return `EXTRACT(WEEK FROM "${table}"."createdAt")`;
            case 'day':
                return `DATE_TRUNC('day', "${table}"."createdAt")`;
            case 'paymentType':
                return `"${table}"."payment_type"`;
            default:
                throw new Error(`Invalid statisBy value: ${statisBy}`);
        }
    }
}