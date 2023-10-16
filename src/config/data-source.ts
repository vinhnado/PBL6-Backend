import { DataSource } from 'typeorm';
import * as path from 'path';
require('dotenv').config();

export const AppDataSource = new DataSource({
	type: 'postgres',
	url: process.env.DATABASE_URL,
	synchronize: true,
	logging: false,
	entities: [path.join(__dirname, '../models/*.ts')],
	migrations: [path.join(__dirname, '../migrations/*.ts')],
	subscribers: [],
});
