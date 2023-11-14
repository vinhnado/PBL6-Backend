'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      // Generate seed data
      const seedData = [];
      for (let movie_id = 1; movie_id <= 45; movie_id++) {
        // Each movie will have at least one actor
        const actor_id = Math.floor(Math.random() * 20) + 1;
        const createdAt = new Date();
        const updatedAt = new Date();
        seedData.push({ movie_id, actor_id, createdAt, updatedAt });
      }
    await queryInterface.bulkInsert('MovieActors', seedData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MovieActors', null, {});
  }
};
