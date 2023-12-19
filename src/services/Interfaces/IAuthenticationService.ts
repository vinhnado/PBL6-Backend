export interface IAuthenticationService {
	login(username: string, password: string): Promise<string>;
	register(
		email: string,
		dateOfBirth: Date,
		gender: string,
		username: string,
		password: string,
		isAdmin?: boolean
	): Promise<string>;
	forgotPassword: (
		email: string,
		token?: string | null,
		password?: string | null
	) => Promise<string>;
	changePassword: (
		userId: number,
		oldPassword: string,
		newPassword: string
	) => Promise<any>;
	activeUser: (email: string, token?: string | null) => Promise<string>;
	getAccessTokenByRefreshToken: (refreshToken: string) => Promise<any>;
	checkUsername: (username: string) => Promise<Boolean>;
	checkEmail: (email: string) => Promise<boolean>;
}
