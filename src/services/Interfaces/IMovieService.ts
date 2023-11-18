import { Movie } from '../../models/Movie';
import express, { Request, Response, Router } from 'express';

export interface IMovieService {
	searchMovies(
		searchConditions: any,
		page: number,
		pageSize: number
	): Promise<Movie[]>;
	getMovieById(id: number): Promise<Movie | null>;
	getAllMovies(): Promise<Movie[]>;
	deleteMovieById(id: number): Promise<void>;
	createMovie(
		title: string,
		description: string,
		releaseDate: Date,
		nation: string,
		level: number,
		isSeries: boolean
	  ): Promise<Movie>;
	updateMovie(req: Request, res: Response): Promise<Movie | null>;
	getMoviesTrending(): Promise<Movie[]>;
	getMoviesRecommender(): Promise<Movie[]>;
	getMoviesUpcoming(): Promise<Movie[]>;
	getMoviesForVip(): Promise<Movie[]>;
	getAllNations(): Promise<string[]>;
	getAllReleaseYears(): Promise<number[]>;
}
