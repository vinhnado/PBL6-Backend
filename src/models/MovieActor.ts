import {
	Table,
	Column,
	Model,
	ForeignKey,
	DataType,
} from 'sequelize-typescript';
import { Movie } from './Movie';
import { Actor } from './Actor';

@Table({
	tableName: MovieActor.MOVIEACTOR_TABLE_NAME,
	timestamps: true,
})
export class MovieActor extends Model {
	private static MOVIEACTOR_TABLE_NAME = 'MovieActors' as string;
	private static MOVIEACTOR_MOVIE_ID = 'movie_id' as string;
	private static MOVIEACTOR_ACTORP_ID = 'actor_id' as string;

	@ForeignKey(() => Movie)
	@Column({
		type: DataType.INTEGER(),
	})
	movieId!: number;

	@ForeignKey(() => Actor)
	@Column({
		type: DataType.INTEGER(),
	})
	actorId!: number;
}
