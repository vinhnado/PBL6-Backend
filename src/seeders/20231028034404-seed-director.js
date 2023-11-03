'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Directors', [
			{
				name: 'Zhang Yimou',
				description:
					'Zhang Yimou is a renowned Chinese film director known for his work on films such as "Hero" and "House of Flying Daggers."',
				gender: 'Male',
				date_of_birth: new Date('1950-04-14'),
				avatar: 'https://example.com/avatar/zhang-yimou.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Ang Lee',
				description:
					'Ang Lee is a Taiwanese-American film director celebrated for his films "Brokeback Mountain" and "Crouching Tiger, Hidden Dragon."',
				gender: 'Male',
				date_of_birth: new Date('1954-10-23'),
				avatar: 'https://example.com/avatar/ang-lee.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Feng Xiaogang',
				description:
					'Feng Xiaogang is a Chinese film director and screenwriter best known for his comedies and dramas like "A World Without Thieves" and "Youth."',
				gender: 'Male',
				date_of_birth: new Date('1958-03-18'),
				avatar: 'https://example.com/avatar/feng-xiaogang.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Wong Kar-wai',
				description:
					'Wong Kar-wai is a Hong Kong filmmaker recognized for his visually stunning films including "In the Mood for Love" and "Chungking Express."',
				gender: 'Male',
				date_of_birth: new Date('1958-07-17'),
				avatar: 'https://example.com/avatar/wong-kar-wai.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Jia Zhangke',
				description:
					'Jia Zhangke is a Chinese film director and screenwriter acclaimed for his art-house films such as "Still Life" and "A Touch of Sin."',
				gender: 'Male',
				date_of_birth: new Date('1970-05-20'),
				avatar: 'https://example.com/avatar/jia-zhangke.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Chen Kaige',
				description:
					'Chen Kaige is a Chinese film director known for his work on "Farewell My Concubine" and "The Promise."',
				gender: 'Male',
				date_of_birth: new Date('1952-08-12'),
				avatar: 'https://example.com/avatar/chen-kaige.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Zhangke Jia',
				description:
					'Zhangke Jia is a Chinese film director and screenwriter acclaimed for his art-house films such as "Still Life" and "A Touch of Sin."',
				gender: 'Male',
				date_of_birth: new Date('1970-05-20'),
				avatar: 'https://example.com/avatar/zhangke-jia.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'John Woo',
				description:
					'John Woo is a Hong Kong film director known for his action films like "Hard Boiled" and "The Killer."',
				gender: 'Male',
				date_of_birth: new Date('1946-09-22'),
				avatar: 'https://example.com/avatar/john-woo.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Wong Kar-wai',
				description:
					'Wong Kar-wai is a Hong Kong filmmaker recognized for his visually stunning films including "In the Mood for Love" and "Chungking Express."',
				gender: 'Male',
				date_of_birth: new Date('1958-07-17'),
				avatar: 'https://example.com/avatar/wong-kar-wai.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Chen Kaige',
				description:
					'Chen Kaige is a Chinese film director known for his work on "Farewell My Concubine" and "The Promise."',
				gender: 'Male',
				date_of_birth: new Date('1952-08-12'),
				avatar: 'https://example.com/avatar/chen-kaige.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Zhangke Jia',
				description:
					'Zhangke Jia is a Chinese film director and screenwriter acclaimed for his art-house films such as "Still Life" and "A Touch of Sin."',
				gender: 'Male',
				date_of_birth: new Date('1970-05-20'),
				avatar: 'https://example.com/avatar/zhangke-jia.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Stephen Chow',
				description:
					'Stephen Chow is a Hong Kong actor, comedian, and filmmaker celebrated for his comedy films like "Kung Fu Hustle" and "Shaolin Soccer."',
				gender: 'Male',
				date_of_birth: new Date('1962-06-22'),
				avatar: 'https://example.com/avatar/stephen-chow.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Jing Wong',
				description:
					'Jing Wong is a Hong Kong filmmaker known for his action and comedy films, including "God of Gamblers" and "From Beijing with Love."',
				gender: 'Male',
				date_of_birth: new Date('1955-02-03'),
				avatar: 'https://example.com/avatar/jing-wong.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Yimou Zhang',
				description:
					'Yimou Zhang is a Chinese film director known for his work on films such as "Hero" and "House of Flying Daggers."',
				gender: 'Male',
				date_of_birth: new Date('1950-04-14'),
				avatar: 'https://example.com/avatar/zhang-yimou.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Hark Tsui',
				description:
					'Hark Tsui is a Hong Kong film director known for his work on films such as "Once Upon a Time in China" and "Peking Opera Blues."',
				gender: 'Male',
				date_of_birth: new Date('1950-02-15'),
				avatar: 'https://example.com/avatar/hark-tsui.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Kar-Wai Wong',
				description:
					'Kar-Wai Wong is a Hong Kong filmmaker recognized for his visually stunning films including "In the Mood for Love" and "Chungking Express."',
				gender: 'Male',
				date_of_birth: new Date('1958-07-17'),
				avatar: 'https://example.com/avatar/kar-wai-wong.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Stanley Kwan',
				description:
					'Stanley Kwan is a Hong Kong film director known for his work on films such as "Rouge" and "Center Stage."',
				gender: 'Male',
				date_of_birth: new Date('1957-10-09'),
				avatar: 'https://example.com/avatar/stanley-kwan.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Wai-keung Lau',
				description:
					'Wai-keung Lau is a Hong Kong filmmaker and director known for his work on films like "Infernal Affairs" and "The Storm Riders."',
				gender: 'Male',
				date_of_birth: new Date('1960-01-01'),
				avatar: 'https://example.com/avatar/wai-keung-lau.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Yuefeng Song',
				description:
					'Yuefeng Song is a Chinese film director and animator famous for his work on animated films such as "Big Fish & Begonia."',
				gender: 'Male',
				date_of_birth: new Date('1973-01-01'),
				avatar: 'https://example.com/avatar/yuefeng-song.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Kaige Chen',
				description:
					'Kaige Chen is a Chinese film director known for his work on "Farewell My Concubine" and "The Emperor and the Assassin."',
				gender: 'Male',
				date_of_birth: new Date('1952-08-12'),
				avatar: 'https://example.com/avatar/kaige-chen.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Directors', null, {});
	},
};
