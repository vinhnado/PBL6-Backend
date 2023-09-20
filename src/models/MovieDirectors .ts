import { Model, Column, Table, ForeignKey, DataType } from 'sequelize-typescript';
import { Movie } from './Movie';
import { Director } from './Directors';

@Table({
	tableName: MovieDirectors.TABLE_NAME,
	timestamps: true,
})
export class MovieDirectors extends Model {

    private static TABLE_NAME = 'MovieDirectors' as string;
    private static MOVIE_ID  = 'movie_id' as string;
    private static DIRECTOR_ID  = 'director_id' as string;

    @ForeignKey(() => Movie)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: MovieDirectors.MOVIE_ID,
    })
    movieID!: number;

    @ForeignKey(() => Director)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: MovieDirectors.DIRECTOR_ID,
    })
    directorID!: number;

    
}
