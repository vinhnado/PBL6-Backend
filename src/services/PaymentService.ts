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

interface PaymentAttributes {
	type: string;
	price: number;
	orderInfo?: string | null;
	transactionId: string;
	status: string;
	userId: number;
}

@Service()
export class PaymentService {
	@Inject(() => PaymentRepository)
	private paymentRepository!: PaymentRepository;

	addOrEditPayment = async (paymentData: Partial<Payment>) => {
		try {
			const { transactionId } = paymentData;
			console.log(transactionId);
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

	findAllPaymentByUserId = async (userId: number) => {
		try {
			return await this.paymentRepository.findByCondition({ user_id: userId });
		} catch (error: any) {
			throw new Error(`Failed to find payment: ${error.message}`);
		}
	};
}
