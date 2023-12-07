'use strict';
const getRandomDate = (start, end) => {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
};

const getRandomGender = () => {
	const genders = ['Male', 'Female'];
	return genders[Math.floor(Math.random() * genders.length)];
};

const generateRandomEmail = () => {
	const username = 'user' + Math.floor(Math.random() * 10000);
	return `${username}@example.com`;
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// const userData = [];
		// const subscriptionIds = [1, 2, 3, 4]; // Example subscription IDs
		// const accountIds = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Example account IDs

		// for (let i = 0; i < 9; i++) {
		//   const user = {
		//     date_of_birth: getRandomDate(new Date(1960, 0, 1), new Date(2005, 0, 1)),
		//     gender: getRandomGender(),
		//     email: generateRandomEmail(),
		//     avatar_url: `users/${i + 1}/avatar.jpg`,
		//     subscription_id: subscriptionIds[Math.floor(Math.random() * subscriptionIds.length)],
		//     account_id: i,
		//     createdAt: new Date(),
		//     updatedAt: new Date(),
		//   };
		//   userData.push(user);
		// }
		// return queryInterface.bulkInsert('Users', userData, {});
		queryInterface.bulkInsert(
			'users',
			[
				{
					date_of_birth: new Date(),
					gender: 'Male',
					email: 'user1@gmail.com',
					role: 0,
					subscription_id: 1,
					account_id: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					date_of_birth: new Date(),
					gender: 'Female',
					email: 'user2@gmail.com',
					role: 1,
					subscription_id: 2,
					account_id: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					date_of_birth: new Date(),
					gender: 'Male',
					email: 'user3@gmail.com',
					role: 2,
					subscription_id: 3,
					account_id: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					date_of_birth: new Date(),
					gender: 'Female',
					email: 'user4@gmail.com',
					role: 2,
					subscription_id: 4,
					account_id: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					date_of_birth: new Date(),
					gender: 'Male',
					email: 'user5@gmail.com',
					role: 2,
					subscription_id: 5,
					account_id: 5,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					date_of_birth: new Date(),
					gender: 'Female',
					email: 'user6@gmail.com',
					role: 2,
					subscription_id: 6,
					account_id: 6,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					date_of_birth: new Date(),
					gender: 'Male',
					email: 'user7@gmail.com',
					role: 2,
					subscription_id: 7,
					account_id: 7,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					date_of_birth: new Date(),
					gender: 'Female',
					email: 'user8@gmail.com',
					role: 2,
					subscription_id: 8,
					account_id: 8,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					date_of_birth: new Date(),
					gender: 'Male',
					email: 'user9@gmail.com',
					role: 2,
					subscription_id: 9,
					account_id: 9,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					date_of_birth: new Date(),
					gender: 'Female',
					email: 'user10@gmail.com',
					role: 2,
					subscription_id: 10,
					account_id: 10,
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
		await queryInterface.bulkDelete('Users', null, {});
	},
};
