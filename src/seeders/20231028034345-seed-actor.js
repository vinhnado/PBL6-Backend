'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Actors', [
			{
				name: 'Chow Yun-fat',
				description:
					'Chow Yun-fat is a Hong Kong actor known for his roles in action films and crime dramas.',
				gender: 'Male',
				dateOfBirth: new Date('1955-05-18'),
				avatar: 'https://example.com/avatar/chow-yun-fat.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Zhang Ziyi',
				description:
					'Zhang Ziyi is a Chinese actress who gained international fame for her roles in "Crouching Tiger, Hidden Dragon" and "Memoirs of a Geisha."',
				gender: 'Female',
				dateOfBirth: new Date('1979-02-09'),
				avatar: 'https://example.com/avatar/zhang-ziyi.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Jet Li',
				description:
					'Jet Li is a Chinese actor and martial artist known for his roles in martial arts films such as "Once Upon a Time in China" and "Hero."',
				gender: 'Male',
				dateOfBirth: new Date('1963-04-26'),
				avatar: 'https://example.com/avatar/jet-li.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Gong Li',
				description:
					'Gong Li is a renowned Chinese actress who has appeared in many critically acclaimed films, including "Raise the Red Lantern" and "Farewell My Concubine."',
				gender: 'Female',
				dateOfBirth: new Date('1965-12-31'),
				avatar: 'https://example.com/avatar/gong-li.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Donnie Yen',
				description:
					'Donnie Yen is a Hong Kong actor and martial artist famous for his roles in the "Ip Man" series and "Rogue One: A Star Wars Story."',
				gender: 'Male',
				dateOfBirth: new Date('1963-07-27'),
				avatar: 'https://example.com/avatar/donnie-yen.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Zhou Xun',
				description:
					'Zhou Xun is a Chinese actress known for her versatile acting and roles in films like "The Banquet" and "Perhaps Love."',
				gender: 'Female',
				dateOfBirth: new Date('1974-10-18'),
				avatar: 'https://example.com/avatar/zhou-xun.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Jackie Chan',
				description:
					'Jackie Chan is a Hong Kong actor, martial artist, and stuntman known for his action-comedy films, including "Rush Hour" and "Police Story."',
				gender: 'Male',
				dateOfBirth: new Date('1954-04-07'),
				avatar: 'https://example.com/avatar/jackie-chan.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Li Bingbing',
				description:
					'Li Bingbing is a Chinese actress who has appeared in a wide range of films, including "The Forbidden Kingdom" and "Resident Evil: Retribution."',
				gender: 'Female',
				dateOfBirth: new Date('1973-02-27'),
				avatar: 'https://example.com/avatar/li-bingbing.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Andy Lau',
				description:
					'Andy Lau is a Hong Kong actor and singer known for his work in films like "Infernal Affairs" and "A Moment of Romance."',
				gender: 'Male',
				dateOfBirth: new Date('1961-09-27'),
				avatar: 'https://example.com/avatar/andy-lau.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Tang Wei',
				description:
					'Tang Wei is a Chinese actress recognized for her roles in "Lust, Caution" and "Finding Mr. Right."',
				gender: 'Female',
				dateOfBirth: new Date('1979-10-07'),
				avatar: 'https://example.com/avatar/tang-wei.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Wu Jing',
				description:
					'Wu Jing is a Chinese actor, director, and martial artist known for his roles in "Wolf Warrior" and "The Wandering Earth."',
				gender: 'Male',
				dateOfBirth: new Date('1974-04-03'),
				avatar: 'https://example.com/avatar/wu-jing.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Fan Bingbing',
				description:
					'Fan Bingbing is a Chinese actress and producer famous for her roles in "X-Men: Days of Future Past" and "Cell Phone."',
				gender: 'Female',
				dateOfBirth: new Date('1981-09-16'),
				avatar: 'https://example.com/avatar/fan-bingbing.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Tony Leung Chiu-Wai',
				description:
					'Tony Leung Chiu-Wai is a Hong Kong actor acclaimed for his performances in films like "In the Mood for Love" and "Chungking Express."',
				gender: 'Male',
				dateOfBirth: new Date('1962-06-27'),
				avatar: 'https://example.com/avatar/tony-leung-chiu-wai.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Vicki Zhao',
				description:
					'Vicki Zhao is a Chinese actress and director known for her work in films like "Mulan" and "Shaolin Soccer."',
				gender: 'Female',
				dateOfBirth: new Date('1976-03-12'),
				avatar: 'https://example.com/avatar/vicki-zhao.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Louis Koo',
				description:
					'Louis Koo is a Hong Kong actor and film producer recognized for his roles in "Election" and "Paradox."',
				gender: 'Male',
				dateOfBirth: new Date('1970-10-21'),
				avatar: 'https://example.com/avatar/louis-koo.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Shu Qi',
				description:
					'Shu Qi is a Taiwanese-Hong Kong actress known for her appearances in "The Transporter" and "If You Are the One."',
				gender: 'Female',
				dateOfBirth: new Date('1976-04-16'),
				avatar: 'https://example.com/avatar/shu-qi.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Stephen Chow',
				description:
					'Stephen Chow is a Hong Kong actor, comedian, and filmmaker celebrated for his comedy films like "Kung Fu Hustle" and "Shaolin Soccer."',
				gender: 'Male',
				dateOfBirth: new Date('1962-06-22'),
				avatar: 'https://example.com/avatar/stephen-chow.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Shu Qi',
				description:
					'Shu Qi is a Taiwanese-Hong Kong actress known for her appearances in "The Transporter" and "If You Are the One."',
				gender: 'Female',
				dateOfBirth: new Date('1976-04-16'),
				avatar: 'https://example.com/avatar/shu-qi.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Huang Bo',
				description:
					'Huang Bo is a Chinese actor, director, and writer famous for his roles in "Crazy Alien" and "The Island."',
				gender: 'Male',
				dateOfBirth: new Date('1974-08-26'),
				avatar: 'https://example.com/avatar/huang-bo.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Maggie Cheung',
				description:
					'Maggie Cheung is a Hong Kong actress recognized for her work in "In the Mood for Love" and "Hero."',
				gender: 'Female',
				dateOfBirth: new Date('1964-09-20'),
				avatar: 'https://example.com/avatar/maggie-cheung.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Actors', null, {});
	},
};
