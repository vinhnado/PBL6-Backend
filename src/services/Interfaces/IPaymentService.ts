import { Request } from 'express';
import { Payment } from '../../models/Payment';

export interface IPaymentService {
	addOrEditPayment: (paymentData: Partial<Payment>) => Promise<void>;
	deletePayment: (paymentId: number) => Promise<void>;
	findPaymentById: (paymentId: number) => Promise<Payment | null>;
	findPaymentByTransactionId: (
		transactionId: string
	) => Promise<Payment | null>;
	findAllPaymentByUserId: (userId: number) => Promise<Payment[]>;
	getPayments: (
		req: Request
	) => Promise<{ payments: Payment[]; totalCount: number }>;
}
