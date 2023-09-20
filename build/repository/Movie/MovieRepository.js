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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieRepository = void 0;
const Movie_1 = require("../../models/Movie");
const Genre_1 = require("../../models/Genre");
const database_1 = __importDefault(require("../../config/database"));
const sequelize_1 = require("sequelize");
class MovieRepository {
    constructor() { }
    static getInstance() {
        if (!MovieRepository.instance) {
            MovieRepository.instance = new MovieRepository();
        }
        return MovieRepository.instance;
    }
    getAllMovies() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movies = yield Movie_1.Movie.findAll({
                    include: Genre_1.Genre, // Kèm theo thông tin về Genre
                });
                return movies;
            }
            catch (error) {
                throw new Error('Không thể lấy danh sách phim: ' + error.message);
            }
        });
    }
    getAllMovies1() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `
            SELECT
            "Movie".movie_id,
            "Movie".title,
            "Movie".description,
            "Movie".release_date,
            "Movie".server_url,
            "Genre".genre_id,
            "Genre".name AS genre_name
        FROM
            "Movie"
        JOIN
            "MovieGenre" ON "Movie".movie_id = "MovieGenre"."movieId"
        JOIN
            "Genre" ON "MovieGenre"."genreId" = "Genre".genre_id;
`;
                const movies = yield ((_a = MovieRepository.db.sequelize) === null || _a === void 0 ? void 0 : _a.query(sql, {
                    type: sequelize_1.QueryTypes.SELECT,
                }));
                return movies;
            }
            catch (error) {
                throw new Error('Không thể lấy danh sách phim: ' + error.message);
            }
        });
    }
    getMovieById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movie = yield Movie_1.Movie.findByPk(id, {
                    include: Genre_1.Genre,
                });
                return movie || null;
            }
            catch (error) {
                throw new Error('Không thể lấy thông tin phim: ' + error.message);
            }
        });
    }
    getMoviesByGenre(genreName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const genre = yield Genre_1.Genre.findOne({
                    where: { name: genreName },
                    include: Movie_1.Movie, // Kèm theo thông tin về các phim thuộc thể loại này
                });
                if (!genre) {
                    return [];
                }
                const movies = genre.movies;
                return movies;
            }
            catch (error) {
                throw new Error('Không thể lấy danh sách phim theo thể loại: ' + error.message);
            }
        });
    }
    createMovie(title, description, releaseDay, serverUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movie = yield Movie_1.Movie.create({
                    title,
                    description,
                    releaseDay,
                    serverUrl,
                });
                return movie;
            }
            catch (error) {
                throw new Error('Không thể tạo phim: ' + error.message);
            }
        });
    }
    updateMovie(id, title, description, releaseDay, serverUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedRows = yield Movie_1.Movie.update({
                    title,
                    description,
                    releaseDay,
                    serverUrl,
                }, {
                    where: { id },
                });
                return updatedRows[0] > 0; // Trả về true nếu có ít nhất một dòng đã được cập nhật
            }
            catch (error) {
                throw new Error('Không thể cập nhật phim: ' + error.message);
            }
        });
    }
    deleteMovie(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedRows = yield Movie_1.Movie.destroy({
                    where: { id },
                });
                return deletedRows > 0; // Trả về true nếu có ít nhất một dòng đã bị xóa
            }
            catch (error) {
                throw new Error('Không thể xóa phim: ' + error.message);
            }
        });
    }
}
exports.MovieRepository = MovieRepository;
MovieRepository.db = database_1.default.getInstance();
MovieRepository.instance = null;
