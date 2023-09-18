import express from 'express';
import { MovieController } from './MovieController';

const router = express.Router();

const movieController = new MovieController();

router.get('/movies', movieController.getMovies);
router.get('/movies/:id', movieController.getMovieById);

export default router;
