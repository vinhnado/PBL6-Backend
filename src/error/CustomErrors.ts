export class UsernameValidError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'UsernameValidError';
	}
}

export class EmailValidError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'EmailValidError';
	}
}

export class OldPasswordError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'OldPasswordError';
	}
}

export class NotActiveAccountError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'NotActiveAccountError';
	}
}

export class TokenError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'TokenError';
	}
}

export class PasswordNotMatch extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'TokenError';
	}
}

export class NotFound extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'NotFound';
	}
}
