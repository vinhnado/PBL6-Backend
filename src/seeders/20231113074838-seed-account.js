'use strict';

const generateRandomPassword = () => {
	// Generate a random password logic (you can replace this with your own logic)
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const passwordLength = 8;
	let password = '';
  
	for (let i = 0; i < passwordLength; i++) {
	  const randomIndex = Math.floor(Math.random() * characters.length);
	  password += characters.charAt(randomIndex);
	}
  
	return password;
  };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const accounts = [];
    
    for (let i = 0; i < 10; i++) {
      accounts.push({
        username: 'user' + Math.floor(Math.random() * 10000),
        password: generateRandomPassword(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Account', accounts);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Account', null, {});
  }
};
