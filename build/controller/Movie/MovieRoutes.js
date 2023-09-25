"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("..//Base/BaseRouter"));
const MovieController_1 = __importDefault(require("./MovieController"));
class MovieRoutes extends BaseRouter_1.default {
    routes() {
        this.router.get('/', MovieController_1.default.searchMovies);
        this.router.get('/:id', MovieController_1.default.getMovieById);
    }
}
exports.default = new MovieRoutes().router;
