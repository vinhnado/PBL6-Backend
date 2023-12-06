import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface Payload {
	userId: number;
	role: number;
	username: string;
	subscriptionTypeId: number;
}

class Authentication {
	public static passwordHash(password: string): Promise<string> {
		return bcrypt.hash(password, 10);
	}

	public static async passwordCompare(
		text: string,
		encryptedText: string
	): Promise<boolean> {
		return await bcrypt.compare(text, encryptedText);
	}

	public static generateToken(
		id: number,
		role: number,
		username: string,
		subscriptionTypeId: number
	): string {
		const secretKey: string = process.env.JWT_SECRET_KEY || 'my-secret-key';
		const payload: Payload = {
			userId: id,
			role: role,
			username: username,
			subscriptionTypeId: subscriptionTypeId,
		};
		const option = { expiresIn: process.env.JWT_EXPIRES_IN };

		return jwt.sign(payload, secretKey, option);
	}

	public static validateToken(token: string): Payload | null {
		try {
			const secretKey: string = process.env.JWT_SECRET_KEY || 'my-secret-key';
			return jwt.verify(token, secretKey) as Payload;
		} catch (err) {
			return null;
		}
	}
}

export default Authentication;
