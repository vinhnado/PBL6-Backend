import { Service } from 'typedi';
import { BaseRepository } from './BaseRepository';
import { Payment } from '../models/Payment';
import { IPaymentRepository } from './Interfaces/IPaymentRepository';

@Service()
export class PaymentRepository extends BaseRepository<Payment> implements IPaymentRepository{
	constructor() {
		super(Payment);
	}
	
	async getPayments(whereCondition: any, page: number, pageSize: number): Promise<{
		payments: Payment[];
		totalCount: number;
	  }>{
		try {
			const offset = (page - 1) * pageSize;
			const {rows, count} = await this.model.findAndCountAll({
				attributes: { exclude: ['deletedAt'] },
				where: whereCondition,
				order:[
					[`createdAt`,`DESC`]
				  ],
				  limit: pageSize, // Số lượng kết quả trên mỗi trang
				  offset: offset, // Vị trí bắt đầu
			});
			return {
				payments: rows,
				totalCount: count,
			};
		}catch (error) {
			throw(error);
		}
	}

}
