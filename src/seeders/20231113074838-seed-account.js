'use strict';

// const generateRandomPassword = () => {
// 	// Generate a random password logic (you can replace this with your own logic)
// 	const characters =
// 		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
// 	const passwordLength = 8;
// 	let password = '';

// 	for (let i = 0; i < passwordLength; i++) {
// 		const randomIndex = Math.floor(Math.random() * characters.length);
// 		password += characters.charAt(randomIndex);
// 	}

// 	return password;
// };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('accounts', [
			{
				username: 'username1',
				password:
					'$2b$10$D69VoJEoIijwminkjAo.recens0qA/NXN1.PiVy.S8j6ou29G4WlW',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				username: 'username2',
				password:
					'$2b$10$D69VoJEoIijwminkjAo.recens0qA/NXN1.PiVy.S8j6ou29G4WlW',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				username: 'username3',
				password:
					'$2b$10$D69VoJEoIijwminkjAo.recens0qA/NXN1.PiVy.S8j6ou29G4WlW',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				username: 'username4',
				password:
					'$2b$10$D69VoJEoIijwminkjAo.recens0qA/NXN1.PiVy.S8j6ou29G4WlW',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				username: 'username5',
				password:
					'$2b$10$D69VoJEoIijwminkjAo.recens0qA/NXN1.PiVy.S8j6ou29G4WlW',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				username: 'username6',
				password:
					'$2b$10$D69VoJEoIijwminkjAo.recens0qA/NXN1.PiVy.S8j6ou29G4WlW',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				username: 'username7',
				password:
					'$2b$10$D69VoJEoIijwminkjAo.recens0qA/NXN1.PiVy.S8j6ou29G4WlW',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				username: 'username8',
				password:
					'$2b$10$D69VoJEoIijwminkjAo.recens0qA/NXN1.PiVy.S8j6ou29G4WlW',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				username: 'username9',
				password:
					'$2b$10$D69VoJEoIijwminkjAo.recens0qA/NXN1.PiVy.S8j6ou29G4WlW',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				username: 'username10',
				password:
					'$2b$10$D69VoJEoIijwminkjAo.recens0qA/NXN1.PiVy.S8j6ou29G4WlW',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('accounts', null, {});
	},
};
