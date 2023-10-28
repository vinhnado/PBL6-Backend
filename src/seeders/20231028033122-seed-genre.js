'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Genres', [
      {
        genre_id: 1,
        name: 'Hành động',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre_id: 2,
        name: 'Hài kịch',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre_id: 3,
        name: 'Khoa học viễn tưởng',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre_id: 4,
        name: 'Tình cảm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre_id: 5,
        name: 'Kinh dị',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre_id: 6,
        name: 'Phiêu lưu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre_id: 7,
        name: 'Hoạt hình',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre_id: 8,
        name: 'Chính kịch',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre_id: 9,
        name: 'Tội phạm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre_id: 10,
        name: 'Lãng mạn',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre_id: 11,
        name: 'Thần thoại',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre_id: 12,
        name: 'Viễn tây',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre_id: 13,
        name: 'Võ thuật',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre_id: 14,
        name: 'Thể thao',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre_id: 15,
        name: 'Âm nhạc',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre_id: 16,
        name: 'Gia đình',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre_id: 17,
        name: 'Chính trị',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre_id: 18,
        name: 'Tâm lý',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre_id: 19,
        name: 'Cổ trang',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre_id: 20,
        name: 'Kỳ ảo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('genres', null, {});
  }
};
