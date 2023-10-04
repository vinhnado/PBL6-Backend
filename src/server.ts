import express, { Application, Request, Response } from 'express';
import Database from './config/database';
import MovieRouter from './controller/Movie/MovieRoutes';

class App {
	public app: Application;

	constructor() {
		this.app = express();
		this.databaseSync();
		this.plugins();
		this.routes();
	}

	private databaseSync(): void {
		const movieRepository = Database.getInstance();
		movieRepository.sequelize!.sync({ force: true });
	}

	private routes(): void {
		this.app.route('/').get((req: Request, res: Response) => {
			res.send('Test API!!!');
		});
		this.app.use('/api/movies', MovieRouter);
		this.app.use('/api/auth', MovieRouter);
		this.app.use('/api/user', MovieRouter);
	}

	private plugins(): void {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}
}

const port: number = 8000;
const app = new App().app;

app.listen(port, () => {
	console.log(`✅ Server started successfully at Port: ${port}`);
});
