import express from 'express';
import Database from './config/database'; // Thay đổi đường dẫn đến tệp Database của bạn
import { Movie } from './models/Movie'; // Thay đổi đường dẫn đến tệp Movie của bạn

const app = express();
const port = process.env.PORT || 3000;

const db = new Database();

// Kiểm tra xem sequelize đã được khởi tạo thành công
if (db.sequelize) {
	// Đã có sequelize, bạn có thể sử dụng nó
	const sequelize = db.sequelize;
	sequelize.sync();

	// Định nghĩa tuyến đường để lấy danh sách phim
	app.get('/movies', async (req, res) => {
		try {
			const movies = await Movie.findByPk(1);

			res.json(movies);
		} catch (error) {
			res
				.status(500)
				.json({ error: 'Lỗi trong quá trình truy vấn cơ sở dữ liệu.' });
		}
	});
} else {
	// Nếu sequelize không được khởi tạo, bạn có thể xử lý lỗi tại đây hoặc đưa ra thông báo
	console.error('Lỗi trong quá trình khởi tạo sequelize.');
}

app.listen(port, () => {
	console.log(`Server đang lắng nghe trên cổng ${port}`);
});
