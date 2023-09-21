import {
	Model,
	Table,
	Column,
	DataType,
	BelongsToMany,
} from 'sequelize-typescript';
import { Movie } from './Movie';
import { MovieGenre } from './MovieGenre';

@Table({
	tableName: Genre.GENRE_TABLE_NAME,
	timestamps: false,
})
export class Genre extends Model {
	private static GENRE_TABLE_NAME = 'Genres' as string;
	private static GENRE_ID = 'genre_id' as string;
	private static GENRE_NAME = 'name' as string;

	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		field: Genre.GENRE_ID,
	})
	id!: number;

	@Column({
		type: DataType.STRING(100),
		field: Genre.GENRE_NAME,
	})
	name!: string;

	@BelongsToMany(() => Movie, () => MovieGenre)
	movies!: Movie[];
}
