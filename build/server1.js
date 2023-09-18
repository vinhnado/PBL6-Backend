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
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database")); // Thay đổi đường dẫn đến tệp Database của bạn
const Movie_1 = require("./models/Movie"); // Thay đổi đường dẫn đến tệp Movie của bạn
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const db = new database_1.default();
// Kiểm tra xem sequelize đã được khởi tạo thành công
if (db.sequelize) {
    // Đã có sequelize, bạn có thể sử dụng nó
    const sequelize = db.sequelize;
    sequelize.sync();
    // Định nghĩa tuyến đường để lấy danh sách phim
    app.get('/movies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const movies = yield Movie_1.Movie.findByPk(1);
            res.json(movies);
        }
        catch (error) {
            res
                .status(500)
                .json({ error: 'Lỗi trong quá trình truy vấn cơ sở dữ liệu.' });
        }
    }));
}
else {
    // Nếu sequelize không được khởi tạo, bạn có thể xử lý lỗi tại đây hoặc đưa ra thông báo
    console.error('Lỗi trong quá trình khởi tạo sequelize.');
}
app.listen(port, () => {
    console.log(`Server đang lắng nghe trên cổng ${port}`);
});
