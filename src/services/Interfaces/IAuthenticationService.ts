export interface IAuthenticationService {
	login(username: string, password: string): Promise<string>;
	register(
		email: string,
		dateOfBirth: Date,
		gender: number,
		username: string,
		password: string
	): Promise<void>;
}
