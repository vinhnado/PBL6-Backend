import {
	Table,
	Column,
	Model,
	ForeignKey,
	DataType,
} from 'sequelize-typescript';
import { Movie } from './Movie';
import { Genre } from './Genre';

@Table({
	tableName: MovieGenre.MOVIEGENRE_TABLE_NAME,
	timestamps: false,
})
export class MovieGenre extends Model {
	public static MOVIEGENRE_TABLE_NAME = 'MovieGenre' as string;

	@ForeignKey(() => Movie)
	@Column({
		type: DataType.INTEGER(),
	})
	movieId!: number;

	@ForeignKey(() => Genre)
	@Column({
		type: DataType.INTEGER(),
	})
	genreId!: number;
}
