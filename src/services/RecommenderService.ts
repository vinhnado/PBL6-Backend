import { Inject, Service } from 'typedi';
import { Movie } from '../models/Movie';
import { IMovieService } from './Interfaces/IMovieService';
import { ISearchMovieOption } from '../repository/Interfaces/ISearchMovieOption';
import { S3Service } from './S3Service';
import { Op } from 'sequelize';
import Redis from 'ioredis';
import crypto from 'crypto'; // Import the built-in crypto library
import express, { Request, Response } from 'express';
import { IRecommenderService } from './Interfaces/IRecommenderService';
import { RecommenderRepository } from '../repository/RecommenderRepository';
import { IRecommenderRepository } from '../repository/Interfaces/IRecommenderRepository';
import { GenreRepository } from '../repository/GenreRepository';
import { IGenreRepository } from '../repository/Interfaces/IGenreRepository';
import { MovieGenre } from '../models/MovieGenre';

@Service()
export class RecommenderSerivce implements IRecommenderService {
	@Inject(() => RecommenderRepository)
	private recommenderRepo!: IRecommenderRepository;

    @Inject(() => GenreRepository)
	private genreRepo!: IGenreRepository;

	@Inject(() => S3Service)
	private s3Service!: S3Service;

	private redis: Redis; // Create a Redis client

	constructor() {
		this.redis = new Redis({
			host: 'redis',
			port: 6379,
		}); // Initialize the Redis client
	}
    public async createMatrix(): Promise<MovieGenre[]> {
        try {
            const maxtrix: number[][] = [];
            const movieGenres: MovieGenre[] =  await this.recommenderRepo.getMovieGenre();
            // Sử dụng Set để lưu trữ các giá trị không trùng nhau
            const uniqueMovieIds = new Set<number>();
            const uniqueGenreIds = new Set<number>();
            // Lặp qua mảng và thêm giá trị vào Set
            movieGenres.forEach((movieGenre: MovieGenre) => {
                uniqueMovieIds.add(movieGenre.getDataValue('movie_id'));
                uniqueGenreIds.add(movieGenre.getDataValue('genre_id'));
            });
            
            // Chuyển Set thành mảng
            const uniqueMovieIdsArray = Array.from(uniqueMovieIds);
            const uniqueGenreIdsArray = Array.from(uniqueGenreIds);
            uniqueMovieIdsArray.sort((a, b) => a - b);
            uniqueGenreIdsArray.sort((a, b) => a - b);

            console.log(uniqueMovieIdsArray);
            console.log(uniqueGenreIdsArray);
            const maxMovieId = Math.max(...uniqueMovieIdsArray);
            const maxGenreId = Math.max(...uniqueGenreIdsArray);
    
            // for(const movie of movies){

            // }
            const rows = maxMovieId+1;
            const cols = maxGenreId+1;

            for (let i = 0; i < rows; i++) {
                const row: number[] = [];
                for (let j = 0; j < cols; j++) {
                    row.push(0);
                }
                // Thêm hàng vào mảng 2 chiều
                maxtrix.push(row);
            }
            movieGenres.forEach((movieGenre: MovieGenre) => {
                const movie_id = movieGenre.getDataValue('movie_id');
                const genre_id = movieGenre.getDataValue('genre_id');
                maxtrix[movie_id][genre_id] = 1;
            });
            // In mảng 2 chiều đã tạo
            // console.log(maxtrix);
            const maxtrix2D: number[][] = [];
            maxtrix2D.push(maxtrix[1]);
            maxtrix2D.push(maxtrix[2]);
            console.log(maxtrix2D);
            const array2DWithCustomKeys = maxtrix2D.map((subArray, index) => ({
                [index]: subArray
              }));
              console.log(array2DWithCustomKeys);
            return movieGenres;
        } catch (error) {
            throw new Error('Method not implemented.');
        }
    }
}