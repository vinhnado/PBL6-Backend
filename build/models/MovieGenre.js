"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieGenre = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Movie_1 = require("./Movie");
const Genre_1 = require("./Genre");
let MovieGenre = class MovieGenre extends sequelize_typescript_1.Model {
};
exports.MovieGenre = MovieGenre;
MovieGenre.MOVIEGENRE_TABLE_NAME = 'MovieGenres';
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Movie_1.Movie),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER(),
    })
], MovieGenre.prototype, "movieId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Genre_1.Genre),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER(),
    })
], MovieGenre.prototype, "genreId", void 0);
exports.MovieGenre = MovieGenre = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: MovieGenre.MOVIEGENRE_TABLE_NAME,
        timestamps: true,
    })
], MovieGenre);
