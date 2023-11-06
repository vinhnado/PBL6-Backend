import { MovieFavorite } from './../models/MovieFavorite';
import { User } from '../models/User';
import { Movie } from '../models/Movie';
import { Genre } from '../models/Genre';
import { Episode } from '../models/Episode';

export class MovieDTO {
	userId: number;
	ListMovie: MovieItem[] | null;

	constructor(user: User, type: string) {
		this.userId = user.userId;
		this.ListMovie = MovieItem.sortMoviesByUpdatedAt(
			MovieItem.movieListToMovieItemList(user, type)
		);
	}

	public static movieToMovieDTO(user: User, type: string): MovieDTO {
		return new MovieDTO(user, type);
	}
}

export class MovieItem {
	id: number;
	title: string;
	posterURL: string;
	averageRating!: string;
	episodeNum!: number;
	level: number;
	numFavorite!: number;
	genre: Genre[] | null;
	updatedAt: Date;

	constructor(
		movie: Movie,
		updatedAt: Date,
		episode: Episode | null = null,
		duration: number | null
	) {
		if (episode === null) {
			this.id = movie.movieId;
			this.title = movie.title;
			this.posterURL = movie.posterURL;
			this.averageRating = movie.averageRating;
			this.episodeNum = movie.episodeNum;
			this.numFavorite = movie.numFavorite;
		} else {
			this.id = episode!.episodeId;
			this.title = episode!.title;
			this.posterURL = episode!.posterURL;
		}
		this.level = movie.level;
		this.genre = movie.genres;
		this.updatedAt = updatedAt;
	}

	public static movieListToMovieItemList(
		user: User,
		type: string
	): MovieItem[] {
		const movieItemList: MovieItem[] = [];
		// let user_movie_list: Movie[] = [];
		// if (type === 'MovieFavorite') {
		// 	user_movie_list = user.movieFavoriteList;
		// } else if (type === 'WatchHistory') {
		// 	user_movie_list = user.watchHistoryList;
		// } else if (type === 'WatchLater') {
		// 	user_movie_list = user.watchLaterList;
		// }
		// for (const movie of user_movie_list) {
		// 	const movieJson = movie.toJSON();
		// 	const movieItem = new MovieItem(
		// 		movie,
		// 		movieJson[type]?.updatedAt,
		// 		movieJson[type]?.duration!
		// 	);
		// 	movieItemList.push(movieItem);
		// }

		return movieItemList;
	}

	public static sortMoviesByUpdatedAt(movies: MovieItem[]): MovieItem[] {
		return movies.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
	}
}
