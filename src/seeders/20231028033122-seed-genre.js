'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Genres', [
			{
				name: 'Hành động',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Hài kịch',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Khoa học viễn tưởng',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Tình cảm',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Kinh dị',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Phiêu lưu',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Hoạt hình',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Chính kịch',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Tội phạm',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Lãng mạn',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Thần thoại',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Viễn tây',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Võ thuật',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Thể thao',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Âm nhạc',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Gia đình',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Chính trị',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Tâm lý',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Cổ trang',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Kỳ ảo',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Genres', null, {});
	},
};
