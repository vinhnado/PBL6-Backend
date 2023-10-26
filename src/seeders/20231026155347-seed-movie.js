'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Movies', [
      {
        movie_id:16,
        title: 'Movie 1',
        description: 'Description for Movie 1',
        release_date: new Date('2023-01-15'),
        nation: 'Country 1',
        poster_url: 'https://example.com/poster1.jpg',
        trailer_url: 'https://example.com/trailer1.mp4',
        average_rating: '7.5',
        episodes: 1,
        level: 1,
        num_favorite: 100,
        isSeries: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more movie records as needed
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
