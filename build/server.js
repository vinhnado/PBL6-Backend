"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const MovieRoutes_1 = __importDefault(require("./controller/Movie/MovieRoutes"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.databaseSync();
        this.routes();
    }
    databaseSync() {
        const movieRepository = database_1.default.getInstance();
        movieRepository.sequelize.sync({ force: false });
    }
    routes() {
        this.app.route('/').get((req, res) => {
            res.send('Welcome to new HELL!');
        });
        this.app.use('/api', MovieRoutes_1.default);
    }
}
const port = 8000;
const app = new App().app;
app.listen(port, () => {
    console.log(`✅ Server started successfully at Port: ${port}`);
});
