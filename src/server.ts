import 'reflect-metadata';
import express, { Application, Request, Response } from 'express';
import Database from './config/database';
import UserRouter from './route/UserRoutes';
import MovieRouter from './route/MovieRoutes';
import AuthenticationRouter from './route/AuthenticationRoutes';
import cors from 'cors';
import HomeRouter from './route/HomeRoutes';
import IndividualRouter from './route/IndividualRoutes';
import EpisodeRouter from './route/EpisodeRoutes';
import SubscriptionRouter from './route/SubscriptionRoutes';
import PaymentRoutes from './route/PaymentRoutes';
import GenreRoutes from './route/GenreRoutes';

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
		movieRepository
			.sequelize!.sync({ force: true })
			.then(() => {
				console.log('✅ Cơ sở dữ liệu đã được đồng bộ hóa.');
			})
			.catch((error) => {
				console.error('❌ Lỗi đồng bộ hóa cơ sở dữ liệu:', error);
			});
	}

	private routes(): void {
		this.app.route('/').get((req: Request, res: Response) => {
			res.send('Test API!!!');
		});
		this.app.use('/api/movies', MovieRouter);
		this.app.use('/api/auth', AuthenticationRouter);
		this.app.use('/api/user', UserRouter);
		this.app.use('/api/home', HomeRouter);
		this.app.use('/api/individual', IndividualRouter);
		this.app.use('/api/episode', EpisodeRouter);
		this.app.use('/api/subscription', SubscriptionRouter);
		this.app.use('/api/payments', PaymentRoutes);
		this.app.use('/api/genres', GenreRoutes);
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
