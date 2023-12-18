export interface IAuthenticationService {
	login(username: string, password: string): Promise<string>;
	register(
		email: string,
		dateOfBirth: Date,
		gender: string,
		username: string,
		password: string
	): Promise<string>;
}
