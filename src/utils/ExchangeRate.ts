import cron from 'node-cron';
import { PaymentController } from '../controller/PaymentController';

cron.schedule('*/10 * * * *', async () => {
	console.log('Cron job: Mỗi 10 phút...');
	await PaymentController.getExchangeRates();
});
