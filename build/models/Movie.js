"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Genre_1 = require("./Genre");
const MovieGenre_1 = require("./MovieGenre");
let Movie = class Movie extends sequelize_typescript_1.Model {
};
exports.Movie = Movie;
Movie.MOVIE_TABLE_NAME = 'Movie';
Movie.MOVIE_ID = 'movie_id';
Movie.MOVIE_TITLE = 'title';
Movie.MOVIE_DESCRIPTION = 'description';
Movie.MOVIE_RELEASE_DATE = 'release_date';
Movie.MOVIE_SERVER_URL = 'server_url';
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: Movie.MOVIE_ID,
    })
], Movie.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        field: Movie.MOVIE_TITLE,
    })
], Movie.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        field: Movie.MOVIE_DESCRIPTION,
    })
], Movie.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE(),
        field: Movie.MOVIE_RELEASE_DATE,
    })
], Movie.prototype, "release_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(1000),
        field: Movie.MOVIE_SERVER_URL,
    })
], Movie.prototype, "server_url", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Genre_1.Genre, () => MovieGenre_1.MovieGenre)
], Movie.prototype, "genres", void 0);
exports.Movie = Movie = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: Movie.MOVIE_TABLE_NAME,
        timestamps: false,
    })
], Movie);
