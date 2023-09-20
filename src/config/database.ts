import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { Movie } from '../models/Movie';
import { Genre } from '../models/Genre';
import { MovieGenre } from '../models/MovieGenre';
import { MovieEpisodes } from '../models/MovieEpisodes';
import { Director } from '../models/Directors';
import { MovieDirectors } from '../models/MovieDirectors ';

dotenv.config();

class Database {
	public sequelize: Sequelize | undefined;

	private POSTGRES_DB = process.env.POSTGRES_DB as string;
	private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
	private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;
	private POSTGRES_USER = process.env.POSTGRES_USER as string;
	private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;

	private static instance: Database | null = null;

	private constructor() {
		this.connectToPostgreSQL();
	}

	public static getInstance(): Database {
		if (!Database.instance) {
			Database.instance = new Database();
		}
		return Database.instance;
	}

	private async connectToPostgreSQL() {
		this.sequelize = new Sequelize({
			database: this.POSTGRES_DB,
			username: this.POSTGRES_USER,
			password: this.POSTGRES_PASSWORD,
			host: this.POSTGRES_HOST,
			port: this.POSTGRES_PORT,
			dialect: 'postgres',
			logging: false,
		});
		this.sequelize.addModels([Movie, Genre, MovieGenre,MovieEpisodes,Director,MovieDirectors]);

		await this.sequelize
			.authenticate()
			.then(() => {
				console.log(
					'✅ PostgreSQL Connection has been established successfully.'
				);
			})
			.catch((err) => {
				console.error('❌ Unable to connect to the PostgreSQL database:', err);
			});
	}
}

export default Database;
