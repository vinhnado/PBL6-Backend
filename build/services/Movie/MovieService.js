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
exports.MovieService = void 0;
const MovieRepository_1 = require("../../repository/Movie/MovieRepository");
const movieRepository = MovieRepository_1.MovieRepository.getInstance();
class MovieService {
    constructor() { }
    static getInstance() {
        if (!MovieService.instance) {
            MovieService.instance = new MovieService();
        }
        return MovieService.instance;
    }
    getAllMovies() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield movieRepository.getAllMovies();
            }
            catch (error) {
                throw new Error('Không thể lấy danh sách phim: ' + error.message);
            }
        });
    }
    getAllMovies1() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield movieRepository.getAllMovies1();
            }
            catch (error) {
                throw new Error('Không thể lấy danh sách phim: ' + error.message);
            }
        });
    }
    getMovieById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield movieRepository.getMovieById(id);
            }
            catch (error) {
                throw new Error('Không thể lấy thông tin phim: ' + error.message);
            }
        });
    }
    getMoviesByGenre(genreName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield movieRepository.getMoviesByGenre(genreName);
            }
            catch (error) {
                throw new Error('Không thể lấy danh sách phim theo thể loại: ' + error.message);
            }
        });
    }
    createMovie(title, description, releaseDay, serverUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield movieRepository.createMovie(title, description, releaseDay, serverUrl);
            }
            catch (error) {
                throw new Error('Không thể tạo phim: ' + error.message);
            }
        });
    }
    updateMovie(id, title, description, releaseDay, serverUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield movieRepository.updateMovie(id, title, description, releaseDay, serverUrl);
            }
            catch (error) {
                throw new Error('Không thể cập nhật phim: ' + error.message);
            }
        });
    }
    deleteMovie(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield movieRepository.deleteMovie(id);
            }
            catch (error) {
                throw new Error('Không thể xóa phim: ' + error.message);
            }
        });
    }
}
exports.MovieService = MovieService;
MovieService.instance = null;
