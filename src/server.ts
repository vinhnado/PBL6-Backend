import 'reflect-metadata';
import express, { Application, Request, Response } from 'express';
import Database from './config/database';
import UserRouter from './route/UserRoutes';
import MovieRouter from './route/MovieRoutes';
import AuthenticationRouter from './route/AuthenticationRoutes';
import cors from 'cors';
import HomeRoutes from './route/HomeRoutes';
import IndividualRouter from './route/IndividualRoutes';

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
		movieRepository.sequelize!.sync({ alter: true });
	}

	private routes(): void {
		this.app.route('/').get((req: Request, res: Response) => {
			res.send('Test API!!!');
		});
		this.app.use('/api/movies', MovieRouter);
		this.app.use('/api/auth', AuthenticationRouter);
		this.app.use('/api/user', UserRouter);
		this.app.use('/api/home', HomeRoutes);
		this.app.use('/api/individual', IndividualRouter);
		// this.app.use('/api/episode', EpisodeRoutes);
	}

	private plugins(): void {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));

		// Enable CORS for all routes
		this.app.use(cors()); // Use the cors middleware here
	}
}

const port: number = 8000;
const app = new App().app;

app.listen(port, () => {
	console.log(`✅ Server started successfully at Port: ${port}`);
});
