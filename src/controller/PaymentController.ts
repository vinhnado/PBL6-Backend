import { Request, Response } from 'express';
import Container from 'typedi';
import { VNPayService } from '../services/payments/VNPayService';

export class PaymentController {
	private vnPayService: VNPayService;

	constructor() {
		this.vnPayService = Container.get(VNPayService);
	}

    getVNPayPaymentURL =  async (req: Request, res: Response) => {
        try {
            const paymentUrl = await this.vnPayService.getPaymentUrl(req);
            res.redirect(paymentUrl);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error: error });
        }
    }
}
