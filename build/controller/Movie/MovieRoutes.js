"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MovieController_1 = require("./MovieController");
const router = express_1.default.Router();
const movieController = new MovieController_1.MovieController();
router.get('/movies', movieController.getMovies);
router.get('/movies/:id', movieController.getMovieById);
exports.default = router;
