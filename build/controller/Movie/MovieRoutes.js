"use strict";
// import express from 'express';
// import { MovieController } from './MovieController';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// const movieController = new MovieController();
// router.get('/movies', movieController.getMovies);
// router.get('/movies/:id', movieController.getMovieById);
// export default router;
const BaseRouter_1 = __importDefault(require("..//Base/BaseRouter"));
const MovieController_1 = __importDefault(require("./MovieController"));
class MovieRoutes extends BaseRouter_1.default {
    routes() {
        this.router.get('/movies', MovieController_1.default.getMovies);
        this.router.get('/movies/:id', MovieController_1.default.getMovieById);
    }
}
exports.default = new MovieRoutes().router;
