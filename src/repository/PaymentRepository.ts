import { Service } from 'typedi';
import { BaseRepository } from './BaseRepository';
import { Payment } from '../models/Payment';

@Service()
export class PaymentRepository extends BaseRepository<Payment> {
	constructor() {
		super(Payment);
	}
}
