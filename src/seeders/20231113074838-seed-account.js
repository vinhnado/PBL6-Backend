'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// await queryInterface.bulkInsert('Account', [
		// 		{
		// 			username: 'user' + Math.floor(Math.random() * 10000),
		// 			password: '',
		// 			createdAt: new Date(),
		// 			updatedAt: new Date(),
		// 		},
		// 	]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('accounts', null, {});
	},
};
