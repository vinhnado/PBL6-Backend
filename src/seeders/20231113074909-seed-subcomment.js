'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const commentIds = Array.from({ length: 500 }, (_, index) => index + 1); // Assume you have 10 comments
    const subComments = [];
    for (const commentId of commentIds) {
      const numSubComments = getRandomNumber(0,5);

      for (let i = 0; i < numSubComments; i++) {
        subComments.push({
          parent_id: commentId,
          user_id: getRandomNumber(1, 10), 
          content: getRandomSentence(),
          num_like: getRandomNumber(0, 100),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert('sub_comments', subComments, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sub_comments', null, {});
  }
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomSentence() {
  const sentences = [
    "Quả thực là tuyệt vời!",
    "Cảm ơn bạn đã chia sẻ!",
    "Phần này thật hấp dẫn.",
    "Tôi đã xem đi xem lại nhiều lần.",
    "Ý tưởng tuyệt vời!",
    "Cảm ơn đoạn hội thoại này.",
    "Hóng chờ tập kế tiếp.",
    "Nhân vật chính quá đẹp trai!",
    "Cảnh quay này làm tôi xúc động.",
    "Hài hước quá đi!",
    "Bạn nên xem nếu chưa xem.",
    "Tuyệt vời, tôi thích cách bạn nghĩ.",
    "Kịch bản rất sáng tạo.",
    "Đây là tình huống khó khăn thực sự.",
    "Nhân vật phụ này thật đáng yêu.",
    "Tôi muốn có thêm nhiều như vậy!",
    "Cảm ơn bạn đã làm tôi cười.",
    "Nghệ thuật quay phim tuyệt vời.",
    "Câu chuyện rất gần gũi.",
    "Chúc mừng đoàn làm phim!",
    "Thích cách biểu đạt ý tưởng.",
    "Bạn thực sự làm rơi nước mắt tôi.",
    "Điểm nhấn của bộ phim!",
    "Sự giao thoa giữa các nhân vật rất tốt.",
    "Nhạc nền đẹp mắt.",
    "Không ngờ tới cái kết này.",
    "Thích cách quay mắt của diễn viên.",
    "Mọi tình tiết đều hợp lý.",
    "Cám ơn đã chia sẻ cảm xúc của bạn.",
    "Chất lượng hình ảnh rất tốt.",
    "Tôi đồng cảm với nhân vật này.",
    "Phim đã tạo ra ấn tượng mạnh mẽ.",
    "Cảnh này làm tôi ngạc nhiên.",
    "Bạn đã chọn âm nhạc tuyệt vời.",
    "Không gì làm tôi phải than phiền.",
    "Đề xuất xem phim vào buổi tối.",
    "Tôi không thể tin được vào mắt mình.",
    "Cảnh nào cũng đều tuyệt vời.",
    "Diễn viên chính diễn xuất rất tốt.",
    "Phát triển nhân vật rất chi tiết.",
    "Sự gián đoạn tốt được thể hiện.",
    "Cảnh hành động rất phấn khích.",
    "Không có gì để phàn nàn.",
    "Cảm ơn bạn đã tạo ra bộ phim này.",
    "Tình tiết rất hấp dẫn.",
    "Tôi đã thấy mình trong nhân vật này.",
    "Chúc mừng vì công sức của bạn.",
    "Tình huống này quá đặc sắc.",
    "Mọi thứ đều hài hòa.",
    "Thật khó tin vào kết quả cuối cùng.",
  ];
  const randomIndex = getRandomNumber(0, sentences.length - 1);
  return sentences[randomIndex];
}