'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('actors', [
			{
				//1
				name: 'Ngô Thiến',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/1/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//2
				name: 'Hồ Ý Hoàn',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/2/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//3
				name: 'Kiều Chấn Vũ',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/3/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//4
				name: 'Ngu Thư Hân',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/4/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//5
				name: 'Trương Lăng Hách',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/5/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//6
				name: 'Lư Dục Hiểu',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/6/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//7
				name: 'Tăng Thuấn Hy',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/7/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//8
				name: 'Trần Đô Linh',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/8/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Cảnh Điềm',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/9/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Phùng Thiệu Phong',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/10/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Vương Lệ Khôn',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/11/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Tăng Khả Ny',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/12/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Vương Ngọc Văn',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/13/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Diệp Thanh',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/14/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Tương Long',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/15/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Trần Hân Dư',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/16/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Ngô Tuấn Dư',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/17/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Cam Vọng Tinh',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/18/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Khang Tịch',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/19/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Nghê Ni',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/20/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Bạch Vũ',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/21/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Kim Hãn',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/22/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Mạnh Tử Nghĩa',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/23/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Trương Nghệ Thượng',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/24/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Supakorn Wuttinunsurasit',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/25/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Mix Wanut Sangtianprapai',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/26/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Puwanat Ruengves',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/27/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Ahn So Hee',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/28/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Lee Min Ho',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/29/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Park Shin Hye',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/30/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Woo-bin Ki',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/31/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Jung Soo Jung',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/32/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Yoo Gong',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/33/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Jung yumi',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/34/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Ma Dong Xi',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/35/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Hoàng Cảnh Du',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/36/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Trương Tịnh Nghi',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/37/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Ngô Cương',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/38/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Hình Phi',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/39/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Từ Khai Sính',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/40/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Từ Phương Châu',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/41/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Thành Nghị',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/42/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Aero Xiao',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/43/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Từ Lộ',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/44/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Ngụy Triết Minh',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/45/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Lưu Nhuận Nam',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/46/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Trương Bách Gia',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/47/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Vương Nghệ Điềm',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/48/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'La Vân Hi',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/49/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Bạch Lộc',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/50/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Crystal',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/51/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Ji Chang Wook',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/52/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Lim YoonA,Yoona',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/53/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Song Yun-ah',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/54/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Seung-ho Shin',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/55/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Irene',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/56/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Ton Saran Anantasetthakul',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/57/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Yoon Phusanu Wongsavanischakorn',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/58/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Denny Huang',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/59/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Hangee Liou',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/60/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Sun Ke-Fang',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/61/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Jared Leto',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/62/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Ezra Miller',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/63/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Jason Momoa',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/64/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Ray Fisher',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/65/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Amy Adams',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/66/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Robert Downey',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/67/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//1
				name: 'Chris Evans',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/68/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//69
				name: 'Mark Ruffalo',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/69/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//70
				name: 'Park Eun Bin',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/70/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//71
				name: 'Eun-su Seo',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/71/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//72
				name: 'Jin Goo',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/72/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//73
				name: 'Song Joong Ki',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/73/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//74
				name: 'Song Hye-Kyo',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/74/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//75
				name: 'Han Suk Gyu',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/75/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//76
				name: 'Yoo Yeon-seok',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/76/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//77
				name: 'Hyun-jin Seo',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/77/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//78
				name: 'Han Suk Gyu',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/78/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//79
				name: ' Trương Bân Bân',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/79/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//80
				name: 'Vương Hữu Thạc',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/80/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//81
				name: 'Dương Siêu Việt',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/81/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//82
				name: 'Từ Chính Khê',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/82/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//83
				name: 'Mã Vãn Viễn',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/83/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//84
				name: 'Đặng Vi',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/84/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//85
				name: 'Lâm Tư Ý',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/85/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//86
				name: 'Trần Linh Húc',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/86/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//87
				name: 'Lý Lan Địch',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/87/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//88
				name: 'Trần Mục Trì',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/88/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//89
				name: 'Trương Nhược Quân',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/89/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//90
				name: 'Dương Tử',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/90/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//91
				name: 'Trương Vãn Ý',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/91/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//92
				name: 'Tiêu Chiến',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/92/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//93
				name: 'Vương Sở Nhiên',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/93/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//94
				name: 'Nhậm Mẫn',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/94/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//95
				name: 'Phương Dật Luân',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/95/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//96
				name: 'Lý Dịch Phong',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/96/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//97
				name: 'Trần Ngọc Kỳ',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/97/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//98
				name: ' Lưu Diệc Phi',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/98/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				//99
				name: ' Dương Tử',
				description: '',
				gender: 'Male',
				date_of_birth: new Date('1955-05-18'),
				avatar: 'actors/99/avatar.jpg',
				poster: 'default/actor/poster_default.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Actors', null, {});
	},
};
