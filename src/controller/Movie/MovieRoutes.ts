// import express from 'express';
// import { MovieController } from './MovieController';

// const router = express.Router();

// const movieController = new MovieController();

// router.get('/movies', movieController.getMovies);
// router.get('/movies/:id', movieController.getMovieById);

// export default router;

import BaseRoutes from '..//Base/BaseRouter';
import MovieController from './MovieController';
class MovieRoutes extends BaseRoutes {
	public routes(): void {
		this.router.get('/movies', MovieController.getMovies);
		this.router.get('/movies/:id', MovieController.getMovieById);
		this.router.get('/movies/genre/:genre', MovieController.getMovieByGenres);
	}
}

export default new MovieRoutes().router;
