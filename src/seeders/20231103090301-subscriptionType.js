'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'subscription_types',
			[
				{
					name: 'Guest',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Standard',
					duration: 1,
					price: 100,
					discount: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Standard',
					duration: 3,
					price: 100,
					discount: 0.05,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Standard',
					duration: 6,
					price: 100,
					discount: 0.1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Standard',
					duration: 12,
					price: 100,
					discount: 0.2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Vip 1',
					duration: 1,
					price: 150,
					discount: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Vip 1',
					duration: 3,
					price: 150,
					discount: 0.05,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Vip 1',
					duration: 6,
					price: 150,
					discount: 0.1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Vip 1',
					duration: 12,
					price: 150,
					discount: 0.2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Vip 2',
					duration: 1,
					price: 200,
					discount: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Vip 2',
					duration: 3,
					price: 200,
					discount: 0.05,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Vip 2',
					duration: 6,
					price: 200,
					discount: 0.1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Vip 2',
					duration: 12,
					price: 200,
					discount: 0.2,
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
		await queryInterface.bulkDelete('SubscriptionTypes', null, {});
	},
};
