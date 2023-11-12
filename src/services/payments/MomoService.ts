import * as crypto from 'crypto';
import * as https from 'https';
import { Service } from 'typedi';

@Service()
export class MomoService {
    private readonly partnerCode = 'MOMO';
    private readonly accessKey = 'F8BBA842ECF85';
    private readonly secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';

    public async getPaymentUrl(): Promise<string> {
        const requestId = this.partnerCode + Date.now();
        const orderId = requestId;
        const orderInfo = 'pay with MoMo';
        const redirectUrl = 'https://momo.vn/return';
        const ipnUrl = 'https://callback.url/notify';
        const amount = '50000';
        const requestType = 'captureWallet';
        const extraData = '';

        const rawSignature = `accessKey=${this.accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${this.partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

        const signature = crypto.createHmac('sha256', this.secretKey)
            .update(rawSignature)
            .digest('hex');

        const requestBody = JSON.stringify({
            partnerCode: this.partnerCode,
            accessKey: this.accessKey,
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            extraData: extraData,
            requestType: requestType,
            signature: signature,
            lang: 'en',
        });

        const options = {
            hostname: 'test-payment.momo.vn',
            port: 443,
            path: '/v2/gateway/api/create',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody),
            },
        };

        return new Promise<string>((resolve, reject) => {
            const req = https.request(options, (res) => {
                let body = '';
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    body += chunk;
                });
                res.on('end', () => {
                    try {
                        const payUrl = JSON.parse(body).payUrl;
                        resolve(payUrl);
                    } catch (error) {
                        reject(error);
                    }
                });
            });

            req.on('error', (e) => {
                reject(e);
            });

            req.write(requestBody);
            req.end();
        });
    }
}
