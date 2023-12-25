export class CustomError extends Error {
	public statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.name = this.constructor.name;
		this.statusCode = statusCode;
	}
}

export class UsernameValidError extends CustomError {
	constructor(message: string) {
		super(message, 400); // Bad Request
	}
}

export class EmailValidError extends CustomError {
	constructor(message: string) {
		super(message, 400); // Bad Request
	}
}

export class OldPasswordError extends CustomError {
	constructor(message: string) {
		super(message, 400); // Bad Request
	}
}

export class NotActiveAccountError extends CustomError {
	constructor(message: string) {
		super(message, 401);
	}
}

export class TokenError extends CustomError {
	constructor(message: string) {
		super(message, 401);
	}
}

export class PasswordNotMatch extends CustomError {
	constructor(message: string) {
		super(message, 400);
	}
}

export class NotFound extends CustomError {
	constructor(message: string) {
		super(message, 404);
	}
}

export class NotEnoughSubscription extends CustomError {
	constructor(message: string) {
		super(message, 403);
	}
}
