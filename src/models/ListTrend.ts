// import {
//     Model,
//     Table,
//     Column,
//     DataType,
//     BelongsToMany,
//     DeletedAt, HasMany,
// } from 'sequelize-typescript';
// import { Movie } from './Movie';
// import { MovieGenre } from './MovieGenre';
//
// @Table({
//     tableName: ListTrend.TABLE_NAME,
//     timestamps: true,
// })
// export class ListTrend extends Model {
//     private static TABLE_NAME = 'ListTrends' as string;
//     private static ID = 'id' as string;
//     private static MOVIE_ID = 'movie_id' as string;
//     private static POSTER_URL = 'poster_url' as string;
//
//
//     @Column({
//         type: DataType.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         field: ListTrend.ID,
//     })
//     id!: number;
//
//     @Column({
//         type: DataType.INTEGER,
//         field: ListTrend.MOVIE_ID,
//     })
//     movie_id!: number;
//
//     @HasMany(() => Movie)
//     movies!: Movie[];
// }
