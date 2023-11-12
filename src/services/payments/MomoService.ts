import * as crypto from 'crypto';
import * as https from 'https';
import { Service } from 'typedi';

@Service()
export class MomoService {
    private accessKey: string;
    private secretKey: string;
    private partnerCode: string;
    private redirectUrl: string;
    private ipnUrl: string;
    private requestType: string;
    private amount: string;
    private lang: string;
  
    constructor(
      accessKey: string,
      secretKey: string,
      partnerCode: string,
      redirectUrl: string,
      ipnUrl: string,
      requestType: string,
      amount: string,
      lang: string
    ) {
      this.accessKey = accessKey;
      this.secretKey = secretKey;
      this.partnerCode = partnerCode;
      this.redirectUrl = redirectUrl;
      this.ipnUrl = ipnUrl;
      this.requestType = requestType;
      this.amount = amount;
      this.lang = lang;
    }
  
    generateSignature(orderInfo: string, extraData: string): string {
      const orderId = this.partnerCode + new Date().getTime();
      const requestId = orderId;
  
      const rawSignature = `accessKey=${this.accessKey}&amount=${this.amount}&extraData=${extraData}&ipnUrl=${this.ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${this.partnerCode}&redirectUrl=${this.redirectUrl}&requestId=${requestId}&requestType=${this.requestType}`;
  
      const signature = crypto.createHmac('sha256', this.secretKey)
        .update(rawSignature)
        .digest('hex');
  
      return signature;
    }
  
    async getPaymentUrl(orderInfo: string, extraData: string): Promise<void> {
      const requestId = this.partnerCode + new Date().getTime();
      const orderId = requestId;
  
      const signature = this.generateSignature(orderInfo, extraData);
  
      const requestBody = JSON.stringify({
        partnerCode: this.partnerCode,
        partnerName: "Test",
        storeId: "MomoTestStore",
        requestId: requestId,
        amount: this.amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: this.redirectUrl,
        ipnUrl: this.ipnUrl,
        lang: this.lang,
        requestType: this.requestType,
        autoCapture: true,
        extraData: extraData,
        orderGroupId: '',
        signature: signature
      });
  
      const options: https.RequestOptions = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/v2/gateway/api/create',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(requestBody)
        }
      };
      return new Promise((resolve, reject) => {
          const req = https.request(options, res => {
            let data = '';
      
            res.on('data', chunk => {
              data += chunk;
            });
      
            res.on('end', () => {
              const responseBody = JSON.parse(data);
              if (responseBody && responseBody.payUrl) {
                resolve(responseBody.payUrl);
              } else {
                reject(new Error('Failed to get payment URL'));
              }
            });
          });
      
          req.on('error', (e) => {
            reject(new Error(`Problem with request: ${e.message}`));
          });
      
          req.write(requestBody);
          req.end();
        });
  
    }
}
