'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert(
			'subscriptions',
			[
				{
					subscription_type_id: 1,
					closedAt: new Date(),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					subscription_type_id: 2,
					closedAt: new Date(),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					subscription_type_id: 3,
					closedAt: new Date(),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					subscription_type_id: 4,
					closedAt: new Date(),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					subscription_type_id: 5,
					closedAt: new Date(),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					subscription_type_id: 6,
					closedAt: new Date(),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					subscription_type_id: 7,
					closedAt: new Date(),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					subscription_type_id: 8,
					closedAt: new Date(),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					subscription_type_id: 9,
					closedAt: new Date(),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					subscription_type_id: 10,
					closedAt: new Date(),
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
		await queryInterface.bulkDelete('subscriptions', null, {});
	},
};
