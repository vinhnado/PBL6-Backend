"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieController = void 0;
const MovieService_1 = require("../../services/Movie/MovieService");
const movieService = MovieService_1.MovieService.getInstance();
class MovieController {
    constructor() {
        this.getMovies = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const movies = yield movieService.getAllMovies1();
                return res.json(movies);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ error: 'Lỗi khi lấy danh sách phim.' });
            }
        });
        this.getMovieById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const movie = yield movieService.getMovieById(Number(id));
                if (!movie) {
                    return res.status(404).json({ error: 'Không tìm thấy phim.' });
                }
                return res.json(movie);
            }
            catch (error) {
                return res.status(500).json({ error: 'Lỗi khi lấy thông tin phim.' });
            }
        });
    }
}
exports.MovieController = MovieController;
