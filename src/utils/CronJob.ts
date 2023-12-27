import * as cron from 'node-cron';
import { PaymentController } from '../controller/PaymentController';
import axios from 'axios';
import xml2js from 'xml2js';
import { PaypalService } from '../services/payments/PaypalService';

class CronJob {
	constructor() {
		// Lập lịch cho công việc cần chạy vào mỗi ngày lúc 2 giờ sáng
		cron.schedule('*/10 * * * *', async () => {
			console.log('Cron job: Mỗi 10 phút...');
			await CronJob.getExchangeRates();
		});

		console.log('Cron job scheduled to run daily');
	}

	static getExchangeRates = async () => {
		try {
			// Gửi yêu cầu để lấy dữ liệu từ URL
			const response = await axios.get(
				'https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx?b=10'
			);

			// Kiểm tra xem yêu cầu có thành công không (status code 200)
			if (response.status === 200) {
				// Parse XML từ nội dung của trang web
				const xmlData = response.data;
				const parser = new xml2js.Parser();
				const result = await parser.parseStringPromise(xmlData);

				// Lấy danh sách các Exrate
				const exrateList = result.ExrateList.Exrate as Array<any>;

				// Tìm tỷ giá cho VND và USD
				exrateList.forEach((exrate) => {
					const currencyCode = exrate.$.CurrencyCode;
					if (currencyCode === 'VND' || currencyCode === 'USD') {
						console.log(exrate.$.Transfer.replace(/,/g, ''));
						PaypalService.transferRate = parseFloat(
							exrate.$.Transfer.replace(/,/g, '')
						);
					}
				});
			} else {
				console.log(
					`Yêu cầu không thành công. Status code: ${response.status}`
				);
				return 1;
			}
		} catch (error) {
			console.error('Lỗi khi thực hiện yêu cầu:', error);
		}
	};
}

export default CronJob;
