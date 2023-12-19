'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('directors', [
			{
				//1
				name: 'Tang Khê Xuyên',
				description:
					'Chow Yun-fat is a Hong Kong actor known for his roles in action films and crime dramas.',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'default/actor/avatar_default.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//2
				name: 'Quách Kính Minh',
				description:
					'Quách Kính Minh là biên kịch, đạo diễn, nhà văn theo thể loại giả tưởng người Trung Quốc. Trước khi trở thành nhà văn và doanh nhân, anh từng là thần tượng được giới trẻ yêu mến.',
				gender: 'Male',
				date_of_birth: new Date('1979-02-09'),
				avatar: 'default/actor/avatar_default.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//3
				name: 'Ôn Đức Quang',
				description:
					'Jet Li is a Chinese actor and martial artist known for his roles in martial arts films such as "Once Upon a Time in China" and "Hero."',
				gender: 'Male',
				date_of_birth: new Date('1963-04-26'),
				avatar: 'default/actor/avatar_default.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//4
				name: 'Guo Hu',
				description:
					'Guo Hu is a renowned Chinese actress who has appeared in many critically acclaimed films, including "Raise the Red Lantern" and "Farewell My Concubine."',
				gender: 'Female',
				date_of_birth: new Date('1965-12-31'),
				avatar: 'default/actor/avatar_default.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//5
				name: 'New Siwaj Sawatmaneekul',
				description:
					'Donnie Yen is a Hong Kong actor and martial artist famous for his roles in the "Ip Man" series and "Rogue One: A Star Wars Story."',
				gender: 'Male',
				date_of_birth: new Date('1963-07-27'),
				avatar: 'default/actor/avatar_default.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				// 6
				name: 'Shin-hyo Kang',
				description:
					'Zhou Xun is a Chinese actress known for her versatile acting and roles in films like "The Banquet" and "Perhaps Love."',
				gender: 'Female',
				date_of_birth: new Date('1974-10-18'),
				avatar: 'default/actor/avatar_default.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//7
				name: 'Sang-ho Yeon',
				description:
					'Jackie Chan is a Hong Kong actor, martial artist, and stuntman known for his action-comedy films, including "Rush Hour" and "Police Story."',
				gender: 'Male',
				date_of_birth: new Date('1954-04-07'),
				avatar: 'default/actor/avatar_default.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//8
				name: 'Tian Yi',
				description:
					'Li Bingbing is a Chinese actress who has appeared in a wide range of films, including "The Forbidden Kingdom" and "Resident Evil: Retribution."',
				gender: 'Female',
				date_of_birth: new Date('1973-02-27'),
				avatar: 'default/actor/avatar_default.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//10
				name: 'YI yong',
				description:
					'Andy Lau is a Hong Kong actor and singer known for his work in films like "Infernal Affairs" and "A Moment of Romance."',
				gender: 'Male',
				date_of_birth: new Date('1961-09-27'),
				avatar: 'default/actor/avatar_default.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//11
				name: 'Li Yu Lei',
				description:
					'Tang Wei is a Chinese actress recognized for her roles in "Lust, Caution" and "Finding Mr. Right."',
				gender: 'Female',
				date_of_birth: new Date('1979-10-07'),
				avatar: 'default/actor/avatar_default.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//12
				name: 'Ren Haitao',
				description:
					'Wu Jing is a Chinese actor, director, and martial artist known for his roles in "Wolf Warrior" and "The Wandering Earth."',
				gender: 'Male',
				date_of_birth: new Date('1974-04-03'),
				avatar: 'default/actor/avatar_default.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//13
				name: 'LinYi',
				description:
					'Fan Bingbing is a Chinese actress and producer famous for her roles in "X-Men: Days of Future Past" and "Cell Phone."',
				gender: 'Female',
				date_of_birth: new Date('1981-09-16'),
				avatar: 'default/actor/avatar_default.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				// 14
				name: 'Ongart Singlumpong',
				description:
					'Tony Leung Chiu-Wai is a Hong Kong actor acclaimed for his performances in films like "In the Mood for Love" and "Chungking Express."',
				gender: 'Male',
				date_of_birth: new Date('1962-06-27'),
				avatar: 'default/actor/avatar_default.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//15
				name: 'Guo Zheng Huan',
				description:
					'Vicki Zhao is a Chinese actress and director known for her work in films like "Mulan" and "Shaolin Soccer."',
				gender: 'Female',
				date_of_birth: new Date('1976-03-12'),
				avatar: 'default/actor/avatar_default.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//16
				name: 'Paek Seung Hwan',
				description:
					'Louis Koo is a Hong Kong actor and film producer recognized for his roles in "Election" and "Paradox."',
				gender: 'Male',
				date_of_birth: new Date('1970-10-21'),
				avatar: 'default/actor/avatar_default.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//17
				name: 'Shu Qi',
				description:
					'Shu Qi is a Taiwanese-Hong Kong actress known for her appearances in "The Transporter" and "If You Are the One."',
				gender: 'Female',
				date_of_birth: new Date('1976-04-16'),
				avatar: 'default/actor/avatar_default.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//18
				name: 'Yin Tao',
				description:
					'Stephen Chow is a Hong Kong actor, comedian, and filmmaker celebrated for his comedy films like "Kung Fu Hustle" and "Shaolin Soccer."',
				gender: 'Male',
				date_of_birth: new Date('1962-06-22'),
				avatar: 'default/actor/avatar_default.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//19
				name: 'Mai Guan Zhi',
				description:
					'Shu Qi is a Taiwanese-Hong Kong actress known for her appearances in "The Transporter" and "If You Are the One."',
				gender: 'Female',
				date_of_birth: new Date('1976-04-16'),
				avatar: 'default/actor/avatar_default.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//20
				name: 'Cúc Giác Lượng',
				description:
					'Huang Bo is a Chinese actor, director, and writer famous for his roles in "Crazy Alien" and "The Island."',
				gender: 'Male',
				date_of_birth: new Date('1974-08-26'),
				avatar: 'default/actor/avatar_default.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//21
				name: 'Kitamura Tayoharu',
				description:
					'Maggie Cheung is a Hong Kong actress recognized for her work in "In the Mood for Love" and "Hero."',
				gender: 'Female',
				date_of_birth: new Date('1964-09-20'),
				avatar: 'default/actor/avatar_default.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//22
				name: 'Liu Ren Zhi',
				description:
					'Maggie Cheung is a Hong Kong actress recognized for her work in "In the Mood for Love" and "Hero."',
				gender: 'Female',
				date_of_birth: new Date('1964-09-20'),
				avatar: 'default/actor/avatar_default.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Directors', null, {});
	},
};
