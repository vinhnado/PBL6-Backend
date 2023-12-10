import { query, param, body } from 'express-validator';

export const validateDeleteActor = [
    param('actorId').notEmpty().withMessage('actorId is required').isInt({min:1}).withMessage('actorId must be an integer'),
];

export const validateGetActorDetails = [
    param('actorId').notEmpty().withMessage('actorId is required').isInt({min:1}).withMessage('actorId must be an integer'),
];

export const validateGetActors = [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('pageSize').optional().isInt({ min: 1 }).withMessage('Page size must be a positive integer'),
    query('name').optional().isString().withMessage('Search must be a string'),
];


