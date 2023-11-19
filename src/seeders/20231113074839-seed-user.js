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
					user_id: 1,
					date_of_birth: new Date(),
					gender: true,
					email: 'user@gmail.com',
					subscription_id: 1,
					account_id: 1,
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
