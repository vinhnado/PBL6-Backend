import express from 'express';
import crypto from 'crypto';
import qs from 'qs';
import config from '../../config/config.json';
import dateFormat from "dateformat";
import { Service } from 'typedi';

@Service()
export class VNPayService {
    getPaymentUrl = async (req: express.Request): Promise<string> => {
        const tmnCode = process.env.VNP_TMN_CODE||'';
        const secretKey = process.env.VNP_HASH_SECRET||'';
        let vnpUrl = process.env.VNP_URL||'';
        const returnUrl = process.env.VNP_RETURN_URL||'';
    
        const date = new Date();
        const createDate = dateFormat(date, 'yyyymmddHHmmss');
        const orderId = dateFormat(date, 'HHmmss');
        const { amount, bankCode, orderDescription, orderType, language } = req.body;
    
        let locale = language || 'vn';
        const currCode = 'VND';
    
        let vnp_Params: any = {
            'vnp_Version': '2.1.0',
            'vnp_Command': 'pay',
            'vnp_TmnCode': tmnCode,
            'vnp_Locale': locale,
            'vnp_CurrCode': currCode,
            'vnp_TxnRef': orderId,
            'vnp_OrderInfo': orderDescription,
            'vnp_OrderType': orderType,
            'vnp_Amount': amount * 100,
            'vnp_ReturnUrl': returnUrl,
            'vnp_IpAddr': req.ip,
            'vnp_CreateDate': createDate
        };
    
        if (bankCode) {
            vnp_Params['vnp_BankCode'] = bankCode;
        }
    
        // Sort the parameters by key
        vnp_Params = Object.entries(vnp_Params)
            .sort(([key1], [key2]) => key1.localeCompare(key2))
            .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {});
    
        const signData = qs.stringify(vnp_Params, { encode: false });
        const hmac = crypto.createHmac('sha512', secretKey);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;
    
        vnpUrl += '?' + qs.stringify(vnp_Params, { encode: false });
        return vnpUrl;
    };
}



// app.post('/create_payment_url', (req, res) => {
//   try {
//     const paymentUrl = getPaymentUrl(req);
//     res.redirect(paymentUrl);
//   } catch (error) {
//     res.status(500).json({ message: 'Internal Server Error', error: error });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
