import { User } from '../models/User';
import { Account } from '../models/Account';
import Authentication from '../utils/Authentication';
import { UserRepository } from '../repository/UserRepository';
import { IAuthenticationService } from './Interfaces/IAuthenticationService';
import Container, { Inject, Service } from 'typedi';
import { IUserRepository } from '../repository/Interfaces/IUserRepository';
import { Subscription } from '../models/Subscription';
import { PaymentRepository } from '../repository/PaymentRepository';
import { Payment } from '../models/Payment';
import express, { Request } from 'express';
import { Op } from 'sequelize';
import { IPaymentRepository } from '../repository/Interfaces/IPaymentRepository';
import { IPaymentService } from './Interfaces/IPaymentService';

interface PaymentAttributes {
	type: string;
	price: number;
	orderInfo?: string | null;
	transactionId: string;
	status: string;
	userId: number;
}

@Service()
export class PaymentService implements IPaymentService {
	@Inject(() => PaymentRepository)
	private paymentRepository!: IPaymentRepository;

	addOrEditPayment = async (paymentData: Partial<Payment>) => {
		try {
			const { transactionId } = paymentData;
			console.log(paymentData);
			if (transactionId) {
				const paymentToUpdate = await this.paymentRepository.findOneByCondition(
					{
						transactionId: paymentData.transactionId,
					}
				);
				if (paymentToUpdate) {
					await paymentToUpdate.update(paymentData);
					return await this.paymentRepository.save(paymentToUpdate);
				}
			}
			const newPayment = Payment.build(paymentData);
			return await this.paymentRepository.save(newPayment);
		} catch (error: any) {
			console.log(error);
			throw new Error(`Failed to create or edit payment: ${error.message}`);
		}
	};

	deletePayment = async (paymentId: number) => {
		try {
			return await this.paymentRepository.delete(
				await this.findPaymentById(paymentId)
			);
		} catch (error: any) {
			throw new Error(`Failed to delete payment: ${error.message}`);
		}
	};

	findPaymentById = async (paymentId: number) => {
		try {
			return await this.paymentRepository.findById(paymentId);
		} catch (error: any) {
			throw new Error(`Failed to find payment: ${error.message}`);
		}
	};

	findPaymentByTransactionId = async (transactionId: string) => {
		try {
			return await this.paymentRepository.findOneByCondition({
				transactionId: transactionId,
			});
		} catch (error: any) {
			console.log(error);
		}
	};

	findAllPaymentByUserId = async (userId: number) => {
		try {
			return await this.paymentRepository.findByCondition({ user_id: userId });
		} catch (error: any) {
			throw new Error(`Failed to find payment: ${error.message}`);
		}
	};

	findOnePaymentNotCheckoutByUserId = async (userId: number) => {
		try {
			return await this.paymentRepository.findOnePaymentByCondition({
				user_id: userId,
				is_payment: false,
				// deleteAt: null
			});
		} catch (error: any) {
			throw new Error(`Failed to find payment: ${error.message}`);
		}
	};

	getPayments = async (req: Request) => {
		try {
			const status = req.query.status || null;
			const type = req.query.type || null;
			const userId = req.query.userId || null;
			const isPayment = req.query.isPayment || null;
			const subscriptionInfoId = req.query.subscriptionInfoId || null;
			const startDate = req.query.startDate || null;
			const endDate = req.query.endDate || null;
			const search = req.query.search || null;

			const page = req.query.page || 1;
			const pageSize = req.query.pageSize || 15;

			const whereCondition: any = {};
			if (status) {
				whereCondition['status'] = { [Op.iLike]: `%${status}%` };
			}

			if (search) {
				whereCondition['orderInfo'] = { [Op.iLike]: `%${search}%` };
			}

			if (type) {
				whereCondition['type'] = type;
			}

			if (userId) {
				whereCondition['userId'] = userId;
			}

			if (isPayment) {
				whereCondition['isPayment'] = isPayment;
			}

			if (subscriptionInfoId) {
				whereCondition['subscriptionInfoId'] = subscriptionInfoId;
			}

			if (!startDate && !endDate) {
				whereCondition['createdAt'] = {
					[Op.between]: [new Date(2020, 1, 1), new Date()],
				};
			}

			if (startDate && !endDate) {
				whereCondition['createdAt'] = {
					[Op.between]: [startDate, new Date()],
				};
			}

			if (!startDate && endDate) {
				whereCondition['createdAt'] = {
					[Op.between]: [new Date(2020, 1, 1), endDate],
				};
			}

			if (startDate && endDate) {
				whereCondition['createdAt'] = {
					[Op.between]: [startDate, endDate],
				};
			}

			return await this.paymentRepository.getPayments(
				whereCondition,
				Number(page),
				Number(pageSize)
			);
		} catch (error: any) {
			throw error;
		}
	};
}
