// file: validators/movieValidator.ts
import { query, body, validationResult } from 'express-validator';

export const validateSearchMovies = [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('pageSize').optional().isInt({ min: 1 }).withMessage('Page size must be a positive integer'),
    query('search').optional().isString().withMessage('Search must be a string'),
    query('genre').optional().isString().withMessage('Genre must be a string'),
    query('nation').optional().isString().withMessage('Nation must be a string'),
    query('year').optional().isInt().withMessage('Year must be an integer'),
    query('isSeries').optional().isBoolean().withMessage('isSeries must be a boolean'),
    query('sort').optional().isIn(['highRated', 'newest', 'highFavorited']).withMessage('Sort must be one of: highRated, newest, highFavorited'),
    query('sortType').optional().isIn(['ASC', 'DESC']).withMessage('SortType must be one of: ASC, DESC'),
];

export const validateGetMovieById = [
// Validator cho trường 'id'
    query('id').notEmpty().withMessage('ID is required').isInt().withMessage('ID must be an integer'),
];

export const validateDeleteMovieById = [
    query('id').notEmpty().withMessage('ID is required').isInt().withMessage('ID must be an integer'),
];

export const validateCreateMovie = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('releaseDate').isISO8601().withMessage('Release date must be a valid date'),
    body('nation').notEmpty().withMessage('Nation is required'),
    body('episodeNum').isInt().withMessage('Episode number must be an integer'),
    body('level').isInt().withMessage('Level must be an integer'),
];
