import {
	Model,
	Column,
	Table,
	DataType,
	BelongsToMany,
	DeletedAt,
} from 'sequelize-typescript';
import { Movie } from './Movie';
import { MovieDirector } from './MovieDirector';

@Table({
	tableName: Director.TABLE_NAME,
	timestamps: true,
	paranoid: true,
})
export class Director extends Model {
	private static TABLE_NAME = 'Directors' as string;
	private static DIRECTOR_ID = 'director_id' as string;
	private static DIRECTOR_NAME = 'name' as string;
	private static DIRECTOR_DESCRIPTION = 'description' as string;
	private static DIRECTOR_GENDER = 'gender' as string;
	private static DIRECTOR_DATE_OF_BIRTH = 'dateOfBirth' as string;
	private static DIRECTOR_AVARTAR_URL = 'avatar' as string;

	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		field: Director.DIRECTOR_ID,
	})
	directorID!: number;

	@Column({
		type: DataType.STRING(50),
		allowNull: false,
		field: Director.DIRECTOR_NAME,
	})
	name!: string;

	@Column({
		type: DataType.STRING(10),
		field: Director.DIRECTOR_GENDER,
	})
	gender!: string;

	@Column({
		type: DataType.DATE,
		field: Director.DIRECTOR_DATE_OF_BIRTH,
	})
	dateOfBirth!: Date;

	@Column({
		type: DataType.TEXT,
		field: Director.DIRECTOR_DESCRIPTION,
	})
	description!: string;

	@Column({
		type: DataType.TEXT,
		field: Director.DIRECTOR_AVARTAR_URL,
	})
	avatar!: string;

	@DeletedAt
	deletedAt!: Date;

	@BelongsToMany(() => Movie, () => MovieDirector)
	movies!: Movie[];
}
