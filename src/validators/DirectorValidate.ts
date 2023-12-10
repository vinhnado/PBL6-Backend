import { query, param, body } from 'express-validator';

export const validateDeleteDirector= [
    param('directorId').notEmpty().withMessage('directorId is required').isInt({min:1}).withMessage('directorId must be an integer'),
];

export const validateGetDirectorDetails = [
    param('directorId').notEmpty().withMessage('directorId is required').isInt({min:1}).withMessage('directorId must be an integer'),
];

export const validateGetDirectors = [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('pageSize').optional().isInt({ min: 1 }).withMessage('Page size must be a positive integer'),
    query('name').optional().isString().withMessage('Search must be a string'),
];
