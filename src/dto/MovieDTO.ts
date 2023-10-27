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
	num_favorite: null | number;
	isSeries: null | boolean;
	updatedAt: Date;

	constructor(
		movieId: number,
		title: string,
		description: string,
		releaseDate: Date,
		nation: string,
		posterURL: string,
		averageRating: string,
		episodeNum: number,
		level: number,
		num_favorite: null | number,
		isSeries: null | boolean,
		updatedAt: Date
	) {
		this.movieId = movieId;
		this.title = title;
		this.description = description;
		this.releaseDate = releaseDate;
		this.nation = nation;
		this.posterURL = posterURL;
		this.averageRating = averageRating;
		this.episodeNum = episodeNum;
		this.level = level;
		this.num_favorite = num_favorite;
		this.isSeries = isSeries;
		this.updatedAt = updatedAt;
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
			let updatedAt: any;
			console.log(updatedAt);
			const movieItem = new MovieItem(
				movie.movieId,
				movie.title,
				movie.description,
				movie.releaseDate,
				movie.nation,
				movie.posterURL,
				movie.averageRating,
				movie.episodeNum,
				movie.level,
				movie.numFavorite,
				movie.isSeries,
				movieJson[type]?.updatedAt
			);
			movieItemList.push(movieItem);
		}

		return movieItemList;
	}

	public static sortMoviesByUpdatedAt(movies: MovieItem[]): MovieItem[] {
		return movies.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
	}
}
