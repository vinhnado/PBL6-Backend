import { Model, Column, Table, DataType, BelongsToMany } from 'sequelize-typescript';
import { Movie } from './Movie';
import { MovieGenre } from './MovieGenre';
import { MovieDirectors } from './MovieDirectors ';

@Table({
	tableName: Director.TABLE_NAME,
	timestamps: true,
})
export class Director extends Model {
	private static TABLE_NAME = 'Directors' as string;
    private static DIRECTOR_ID  = 'director_id' as string;
    private static DIRECTOR_NAME  = 'director_name' as string;

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    directorID!: number;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    name!: string;

	@BelongsToMany(() => Movie, () => MovieDirectors)
	movies!: Movie[];

}
