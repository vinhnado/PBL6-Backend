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
const Actor_1 = require("../../models/Actor");
const Director_1 = require("../../models/Director");
const Episode_1 = require("../../models/Episode");
class MovieRepository {
    constructor() { }
    static getInstance() {
        if (!MovieRepository.instance) {
            MovieRepository.instance = new MovieRepository();
        }
        return MovieRepository.instance;
    }
    searchMovies(searchConditions, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { movie_id, title, genre, nation, year, isSeries } = searchConditions;
                const whereConditions = {};
                if (movie_id) {
                    whereConditions.movie_id = {
                        [sequelize_1.Op.eq]: movie_id,
                    };
                }
                if (title) {
                    whereConditions.title = {
                        [sequelize_1.Op.iLike]: `%${title}%`,
                    };
                }
                if (nation) {
                    whereConditions.nation = {
                        [sequelize_1.Op.eq]: nation,
                    };
                }
                if (year) {
                    whereConditions.year = {
                        [sequelize_1.Op.eq]: year,
                    };
                }
                const movies = yield Movie_1.Movie.findAll({
                    where: whereConditions,
                    offset: (page - 1) * pageSize,
                    limit: pageSize,
                    include: [
                        {
                            model: Genre_1.Genre,
                            attributes: ['genre_id', 'name'],
                            through: { attributes: [] },
                        },
                        {
                            model: Actor_1.Actor,
                            attributes: ['actor_id', 'name'],
                            through: { attributes: [] },
                        },
                        {
                            model: Director_1.Director,
                            attributes: ['director_id', 'name'],
                            through: { attributes: [] },
                        },
                        {
                            model: Episode_1.Episode,
                            attributes: [
                                'episode_id',
                                'episode_no',
                                'movie_url',
                                'episodeTitle',
                            ],
                        },
                    ],
                });
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
}
exports.MovieRepository = MovieRepository;
MovieRepository.db = database_1.default.getInstance();
MovieRepository.instance = null;
