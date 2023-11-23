// file: validators/movieValidator.ts
import { query, param, validationResult, body } from 'express-validator';

export const validateGetEpisodeById = [
// Validator cho trường 'id'
    param('id').notEmpty().withMessage('ID is required').isInt({min:1}).withMessage('ID must be an integer'),
];

export const validateDeleteEpisodeById = [
    param('episodeId').notEmpty().withMessage('ID is required').isInt({min:1}).withMessage('ID must be an integer'),
];

export const validateUpdateEpisode = [
    param('episodeId').notEmpty().withMessage('episodeId is required').isInt({min:1}).withMessage('ID must be an integer'),
    body('movieId').optional().isInt({min:1}).withMessage('ID must be an integer and min = 1'),
    body('title').optional().isString().withMessage('Title must be a string'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('releaseDate').optional().isISO8601().withMessage('Release date must be a valid date'),
    body('posterURL').optional().isString().withMessage('Poster URL must be a string'),
    body('movieURL').optional().isString().withMessage('Movie URL must be a string'),
    body('numView').optional().isInt().withMessage('Number of views must be an integer'),
    body('duration').optional().isInt().withMessage('Duration must be an integer'),
    body('episodeNo').optional().isInt().withMessage('Episode number must be an integer'),
]

export const validateCreateEpisode = [
    body('movieId').notEmpty().isInt().withMessage('Movie ID is required and must be an integer'),
    body('title').notEmpty().withMessage('Title is required').isString().withMessage('Title must be a string'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('releaseDate').notEmpty().isISO8601().withMessage('Release date is required and must be a valid ISO8601 date'),
    body('duration').notEmpty().isInt().withMessage('Duration is required and must be an integer'),
    body('episodeNo').notEmpty().isInt().withMessage('Episode number is required and must be an integer'),
]