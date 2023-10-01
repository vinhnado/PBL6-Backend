interface IAuthenticationService {
	login(email: string, password: string): Promise<string>;
	register(
		email: string,
		password: string,
		nama: string,
		username: string
	): Promise<void>;
}
