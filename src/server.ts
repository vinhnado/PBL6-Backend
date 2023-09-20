import express, { Application, Request, Response } from 'express';
import Database from './config/database';
import MovieRouter from './controller/Movie/MovieRoutes';

class App {
	public app: Application;

	constructor() {
		this.app = express();
		this.databaseSync();
		this.routes();
	}

	protected databaseSync(): void {
		const movieRepository = Database.getInstance();
		movieRepository.sequelize!.sync();
	}

	protected routes(): void {
		this.app.route('/').get((req: Request, res: Response) => {
			res.send('Welcome to new HELL!');
		});
		this.app.use('/api', MovieRouter);
	}
}

const port: number = 8000;
const app = new App().app;

app.listen(port, () => {
	console.log(`✅ Server started successfully at Port: ${port}`);
});
