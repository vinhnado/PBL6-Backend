import { query, body, param } from 'express-validator';

export const validateStatistical = [
    query('userId').optional().isInt({ min: 1 }).withMessage('userId must be a positive integer and min = 1'),
    query('startDate').optional().isString().withMessage('startDate must be a string'),
    query('endDate').optional().isString().withMessage('endDate must be a string'),
    query('statisBy').optional().isString().withMessage('statisBy must be a string').isIn(['year','month','week','day', 'paymentType']).withMessage('statisBy must be one of: year, month, week, day, paymentType'),
];