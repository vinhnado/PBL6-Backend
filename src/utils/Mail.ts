import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import { Service } from 'typedi';

@Service()
export class Mail {
	private transporter: nodemailer.Transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD,
			},
		});
	}

	sendEmail = async (
		to: string,
		subject: string,
		html: string
	): Promise<void> => {
		try {
			await this.transporter.sendMail({
				from: `"Fukin Website" <${process.env.EMAIL_USER}>`,
				to,
				subject,
				html,
			});
		} catch (error) {
			console.error('Error sending email:', error);
		}
	};
	forgotPassword = async (
		username: string,
		to: string,
		token: string
	): Promise<void> => {
		try {
			console.log(token);
			const replacements = {
				username: username,
				replaceLink:
					'https://example.com/reset-password?token=' + token + '&email=' + to,
			};
			let htmlContent = fs.readFileSync(
				'src/utils/ForgotPasswordMail.html',
				'utf8'
			);

			Object.entries(replacements).forEach(([key, value]) => {
				const regex = new RegExp(`{{${key}}}`, 'g');
				htmlContent = htmlContent.replace(regex, value);
			});

			return await this.sendEmail(to, 'Quên mật khẩu', htmlContent);
		} catch (error) {
			console.error('Error sending email:', error);
		}
	};

	activeUser = async (
		username: string,
		to: string,
		token: string
	): Promise<void> => {
		try {
			console.log(token);
			const replacements = {
				username: username,
				replaceLink: 'https://example.com/reset-password/' + token,
			};

			let htmlContent = fs.readFileSync(
				'src/utils/ForgotPasswordMail.html',
				'utf8'
			);

			Object.entries(replacements).forEach(([key, value]) => {
				const regex = new RegExp(`{{${key}}}`, 'g');
				htmlContent = htmlContent.replace(regex, value);
			});

			return await this.sendEmail(to, 'Xác nhận người dùng', htmlContent);
		} catch (error) {
			console.error('Error sending email:', error);
		}
	};
}

export default Mail;
