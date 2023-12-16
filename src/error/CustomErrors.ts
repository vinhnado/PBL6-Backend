export namespace CustomErrors {
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
}
