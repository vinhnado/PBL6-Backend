import { MovieFavorite } from './../models/MovieFavorite';
import { User } from '../models/User';
import { Movie } from '../models/Movie';

export class MovieDTO {
	userId: number;
	ListMovie: MovieItem[];

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
	movieId: number;
	title: string;
	description: string;
	releaseDate: Date;
	nation: string;
	posterURL: string;
	averageRating: string;
	episodeNum: number;
	level: number;
	numFavorite: null | number;
	isSeries: null | boolean;
	updatedAt: Date;
	duration!: null | number;

	constructor(movie: Movie, updatedAt: Date, duration: number | null = null) {
		this.movieId = movie.movieId;
		this.title = movie.title;
		this.description = movie.description;
		this.releaseDate = movie.releaseDate;
		this.nation = movie.nation;
		this.posterURL = movie.posterURL;
		this.averageRating = movie.averageRating;
		this.episodeNum = movie.episodeNum;
		this.level = movie.level;
		this.numFavorite = movie.numFavorite;
		this.isSeries = movie.isSeries;
		this.updatedAt = updatedAt;
		if (duration != null) {
			this.duration = duration;
		}
	}

	public static movieListToMovieItemList(
		user: User,
		type: string
	): MovieItem[] {
		const movieItemList: MovieItem[] = [];
		let user_movie_list: Movie[] = [];
		if (type === 'MovieFavorite') {
			user_movie_list = user.movieFavoriteList;
		} else if (type === 'WatchHistory') {
			user_movie_list = user.watchHistoryList;
		} else if (type === 'WatchLater') {
			user_movie_list = user.watchLaterList;
		}
		for (const movie of user_movie_list) {
			const movieJson = movie.toJSON();
			const movieItem = new MovieItem(
				movie,
				movieJson[type]?.updatedAt,
				movieJson[type]?.duration!
			);
			movieItemList.push(movieItem);
		}

		return movieItemList;
	}

	public static sortMoviesByUpdatedAt(movies: MovieItem[]): MovieItem[] {
		return movies.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
	}
}
