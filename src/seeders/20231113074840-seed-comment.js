'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Lấy danh sách userId từ 1 đến 10
    const userIds = Array.from({ length: 10 }, (_, index) => index + 1);
    // Lấy danh sách episodeId từ 1 đến 450
    const episodeIds = Array.from({ length: 450 }, (_, index) => index + 1);

    const comments = [];
    for (const userId of userIds) {
      for (const episodeId of episodeIds) {
        comments.push({
          episode_id : episodeId,
          user_id : userId,
          content: getRandomContent(),
          num_like: Math.floor(Math.random() * 101),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
    await queryInterface.bulkInsert('comments', comments, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('comments', null, {});
  },
};

function getRandomContent() {
	const contentOptions = [
		'Phim này thực sự tuyệt vời!',
		'Tôi rất thích xem phim này.',
		'Nội dung quá tuyệt vời!',
		'Bất ngờ với sự thay đổi plot.',
		'Không thể chờ đợi để xem tập tiếp theo!',
		'Nó giữ tôi ở bờ ghế suốt thời gian.',
		'Kịch bản xuất sắc.',
		'Tôi sẽ giới thiệu phim này cho mọi người.',
		'Những nhân vật được phát triển rất tốt.',
		'Tôi yêu thích cách quay phim.',
		'Phim có tâm lý sâu sắc.',
		'Những cảnh quay rất ấn tượng.',
		'Điều này thực sự làm thay đổi quan điểm của tôi.',
		'Phim có độ dài vừa phải.',
		'Đây là một trong những bộ phim hay nhất mà tôi từng xem.',
		'Tình tiết hấp dẫn từ đầu đến cuối.',
		'Các diễn viên đã thể hiện xuất sắc.',
		'Cảm xúc của tôi được rung động bởi câu chuyện.',
		'Tôi sẽ xem lại phim này nhiều lần nữa.',
		'Phim này thực sự là một kiệt tác.',
		'Tôi rơi vào câu chuyện ngay từ phút đầu.',
		'Nó làm cho tôi suy nghĩ suốt nhiều ngày.',
		'Phim đã đáp ứng mọi kỳ vọng của tôi.',
		'Các tình tiết không lẻo lưu, hấp dẫn.',
		'Tôi không thể tin nổi vào mắt mình!',
		'Cốt truyện sáng tạo và độc đáo.',
		'Nếu bạn chưa xem, bạn đang bỏ lỡ rất nhiều.',
		'Tôi cảm thấy hạnh phúc khi xem xong phim.',
		'Nếu bạn muốn một bữa tiệc cảm xúc, hãy xem ngay!',
		'Cảm giác thăng trầm của câu chuyện làm tôi bất ngờ.',
		'Đây là một trong những tác phẩm nghệ thuật tuyệt vời nhất.',
		'Tôi muốn gửi lời khen đến đội ngũ làm phim.',
		'Phim này xứng đáng nhận nhiều giải thưởng.',
		'Tôi chẳng thể nghĩ ra điều gì tốt hơn.',
		'Phim đã đánh bại mọi dự đoán của tôi.',
		'Đây là một trong những phim không thể bỏ qua.',
		'Không còn từ nào để diễn đạt sự ấn tượng của tôi.',
		'Cốt truyện có chiều sâu và ý nghĩa.',
		'Tôi sẽ giữ mãi kỷ niệm về phim này.',
		'Các nhân vật đã làm tôi cảm thấy như thân quen.',
		'Tôi đều khóc và cười khi xem phim.',
		'Nhạc nền thật sự tuyệt vời.',
		'Cảm ơn đội ngũ làm phim đã tạo ra tác phẩm này.',
		'Không gì có thể so sánh với sự sáng tạo của phim.',
		'Mỗi tập đều khiến tôi muốn biết tập tiếp theo sẽ như thế nào.',
		'Phim này đã chạm đến trái tim tôi.',
		'Những hình ảnh đẹp như tranh.',
		'Không gian âm nhạc đưa tôi vào một thế giới mới.',
		'Cảm ơn đội ngũ diễn xuất đã tạo ra những nhân vật sống động.',
		'Nó không chỉ là một bộ phim, mà là một trải nghiệm.',
		'Phim đã làm tôi suy nghĩ về cuộc sống.',
		'Tình tiết quá bất ngờ, tôi không thể nghĩ ra.',
		'Nói chung, đây là một kiệt tác nghệ thuật.',
		'Phim đã khiến tôi không thể rời khỏi ghế.',
		'Cốt truyện rất lôi cuốn, tôi không thể dừng lại.',
		'Những chi tiết nhỏ làm cho phim trở nên sống động.',
		'Điều này thực sự là một trong những phim xuất sắc nhất.',
		'Nó đã chạm đến tâm hồn của tôi.',
		'Cảm xúc trong phim làm tôi muốn khóc và cười.',
		'Không có từ ngữ nào có thể diễn đạt được cảm xúc của tôi.',
		'Mỗi tình tiết đều khiến tôi bất ngờ.',
		'Phim đã đưa tôi đến một hành trình đầy thách thức và niềm vui.',
		'Không giới hạn đối với sự sáng tạo của đội ngũ làm phim.',
		'Cảnh quay đẹp như mơ, không gian mở rộng.',
		'Nó không chỉ là phim, mà là một tác phẩm nghệ thuật.',
		'Những giây phút khó quên được lưu giữ trong tâm trí tôi.',
	  ];

	const randomIndex = Math.floor(Math.random() * contentOptions.length);
	return contentOptions[randomIndex];
}
