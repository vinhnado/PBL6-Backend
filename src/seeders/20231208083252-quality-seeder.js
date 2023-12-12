'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const quanlitiesData = [];

		for (let i = 1; i <= 450; i++) {
			const quanlity = {
        episode_id: i,
        video_quality: '1080p',
        video_url: 'movies/1080p/'+i+'/movie_1080.mp4',
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			quanlitiesData.push(quanlity);
		}

    for (let i = 1; i <= 450; i++) {
			const quanlity4k = {
        episode_id: i,
        video_quality: '4k',
        video_url: 'movies/4k/'+i+'/movie_4k.webm',
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			quanlitiesData.push(quanlity4k);
		}
		await queryInterface.bulkInsert('qualities', quanlitiesData, {});

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('qualities', null, {});
  }
};
