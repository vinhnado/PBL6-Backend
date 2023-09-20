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
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const Movie_1 = require("../models/Movie");
const Genre_1 = require("../models/Genre");
const MovieGenre_1 = require("../models/MovieGenre");
const Actor_1 = require("../models/Actor");
const MovieActor_1 = require("../models/MovieActor");
dotenv_1.default.config();
class Database {
    constructor() {
        this.POSTGRES_DB = process.env.POSTGRES_DB;
        this.POSTGRES_HOST = process.env.POSTGRES_HOST;
        this.POSTGRES_PORT = process.env.POSTGRES_PORT;
        this.POSTGRES_USER = process.env.POSTGRES_USER;
        this.POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
        this.connectToPostgreSQL();
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    connectToPostgreSQL() {
        return __awaiter(this, void 0, void 0, function* () {
            this.sequelize = new sequelize_typescript_1.Sequelize({
                database: this.POSTGRES_DB,
                username: this.POSTGRES_USER,
                password: this.POSTGRES_PASSWORD,
                host: this.POSTGRES_HOST,
                port: this.POSTGRES_PORT,
                dialect: 'postgres',
                logging: false,
            });
            this.sequelize.addModels([Movie_1.Movie, Genre_1.Genre, MovieGenre_1.MovieGenre, Actor_1.Actor, MovieActor_1.MovieActor]);
            yield this.sequelize
                .authenticate()
                .then(() => {
                console.log('✅ PostgreSQL Connection has been established successfully.');
            })
                .catch((err) => {
                console.error('❌ Unable to connect to the PostgreSQL database:', err);
            });
        });
    }
}
Database.instance = null;
exports.default = Database;
