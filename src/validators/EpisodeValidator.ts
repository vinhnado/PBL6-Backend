// file: validators/movieValidator.ts
import { query, param, validationResult } from 'express-validator';

export const validateGetEpisodeById = [
// Validator cho trường 'id'
    param('id').notEmpty().withMessage('ID is required').isInt().withMessage('ID must be an integer'),
];

export const validateDeleteEpisodeById = [
    query('id').notEmpty().withMessage('ID is required').isInt().withMessage('ID must be an integer'),
];
