'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'SubcriptionTypes',
			[
				{
					name: 'Guest',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Standard',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Vip 1',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Vip 2',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
