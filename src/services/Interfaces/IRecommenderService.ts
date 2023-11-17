import { Movie } from '../../models/Movie';
import express, { Request, Response, Router } from 'express';
import { MovieGenre } from '../../models/MovieGenre';

export interface IRecommenderService {
    createMatrix(): Promise<[]|MovieGenre[]>;
}
