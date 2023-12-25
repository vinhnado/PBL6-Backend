import {
	ValidationChain,
	body,
	param,
	query,
	validationResult,
} from 'express-validator';

import { Request, Response, NextFunction } from 'express';
import { EmptyDataError, handleErrorController } from '../error/CustomErrors';

const customValidation = (
	req: Request,
	res: Response,
	next: NextFunction
): void | Response<any> => {
	const validationResults = validationResult(req).array();

	// Check if at least one parameter is provided
	console.log('first');
	const { username, email, userId } = req.query;
	if (!username && !email && !userId) {
		handleErrorController(new EmptyDataError('Query cannot be empty'), res);
	}

	return next();
};

export const validateGetUser: ValidationChain[] = [
	query('username')
		.optional()
		.isString()
		.withMessage('Username must be a string'),
	query('email').optional().isEmail().withMessage('Invalid email format'),
	query('userId').optional().isInt().withMessage('User ID must be an integer'),
];

export const validateGetUserWithCustom: (
	| ValidationChain
	| ((req: Request, res: Response, next: NextFunction) => void | Response<any>)
)[] = [...validateGetUser, customValidation];

export const validateUpdateSelfInfo = [
	body('dateOfBirth')
		.optional()
		.isISO8601()
		.withMessage('Date of birth must be a valid date'),
	body('gender')
		.optional()
		.isIn(['Male', 'Female', 'Other'])
		.withMessage('Gender must be Male, Female, or Other'),
];

export const validateSearchUsers = [
	query('search').optional().isString().withMessage('Search must be a string'),
	query('gender')
		.optional()
		.isIn(['Male', 'Female', 'Other'])
		.withMessage('Gender must be Male, Female, or Other'),
	query('subscriptionType')
		.optional()
		.isString()
		.withMessage('Subscription type must be a string'),
	query('sort').optional().isString().withMessage('Sort must be a string'),
	query('sortType')
		.optional()
		.isString()
		.withMessage('Sort type must be a string'),
	query('page').optional().isInt().withMessage('Page must be an integer'),
	query('pageSize')
		.optional()
		.isInt()
		.withMessage('Page size must be an integer'),
];

export const validateUpdateUser = [
	body('userId').isInt().withMessage('User ID must be an integer'),
	body('email').optional().isEmail().withMessage('Invalid email format'),
	body('dateOfBirth')
		.optional()
		.isISO8601()
		.withMessage('Date of birth must be a valid date'),
	body('gender')
		.optional()
		.isIn(['Male', 'Female', 'Other'])
		.withMessage('Gender must be Male, Female, or Other'),
];

export const validateCreateUser = [
	body('email').isEmail().withMessage('Invalid email format'),
	body('dateOfBirth')
		.isISO8601()
		.withMessage('Date of birth must be a valid date'),
	body('gender')
		.isIn(['Male', 'Female', 'Other'])
		.withMessage('Gender must be Male, Female, or Other'),
	body('username').isString().withMessage('Username must be a string'),
	body('password').isString().withMessage('Password must be a string'),
];

export const validateDeleteUser = [
	query('userId').isInt().withMessage('User ID must be an integer'),
];
