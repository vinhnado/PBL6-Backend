'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Define an array of movie IDs and genre IDs to create random associations.
    const movieIds = Array.from({ length: 16 }, (_, i) => i + 1); // Movie IDs from 1 to 16
    const genreIds = Array.from({ length: 20 }, (_, i) => i + 1); // Genre IDs from 1 to 20

    // Create an array to store associations.
    const associations = [];

    // Iterate through movies and associate them with random genres.
    for (const movieId of movieIds) {
      // Determine the number of random genres to associate with each movie.
      const numGenres = Math.floor(Math.random() * 5) + 1; // Random number from 1 to 5.

      // Shuffle the genre IDs to select random ones.
      const shuffledGenres = genreIds.sort(() => Math.random() - 0.5);

      // Take the first `numGenres` shuffled genre IDs.
      const selectedGenres = shuffledGenres.slice(0, numGenres);

      // Create associations for the selected genres and movie.
      selectedGenres.forEach((genreId) => {
        associations.push({
          movie_id: movieId,
          genre_id: genreId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
    }

    // Insert associations into the MovieGenres table.
    return queryInterface.bulkInsert('MovieGenres', associations, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('MovieGenres', null, {});
  }
};
