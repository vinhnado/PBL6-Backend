'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const episodesData = [];

    for (let movieId = 1; movieId <= 16; movieId++) {
      for (let episodeNo = 1; episodeNo <= 5; episodeNo++) {
        episodesData.push({
          movie_id: movieId,
          title: 'Tập '.concat(episodeNo),
          release_date: new Date(),
          poster_url: 'movies/episodes/'.concat(episodeNo,'/poster.ipg'),
          movie_url: 'movies/episodes/'.concat(episodeNo,'/movie.mp4'),
          num_view: Math.floor(Math.random() * (10000 + 1)),
          duration: Math.floor(Math.random() * (100 - 1 + 1))+1,
          episode_no: episodeNo,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert('Episodes', episodesData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Episodes', null, {});
  }
};
