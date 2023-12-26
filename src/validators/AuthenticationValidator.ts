import { body, param } from 'express-validator';

export const validateLogin = [
  body('username').notEmpty().withMessage('Username is required').isString().withMessage('Username must be a string'),
  body('password').notEmpty().withMessage('Password is required').isString().withMessage('Password must be a string'),
];

export const validateRegister = [
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
  body('dateOfBirth').notEmpty().withMessage('Date of Birth is required').isISO8601().withMessage('Date of Birth must be a valid date in ISO8601 format'),
  body('gender').notEmpty().withMessage('Gender is required').isString().withMessage('Gender must be a string'),
  body('username').notEmpty().withMessage('Username is required').isString().withMessage('Username must be a string'),
  body('password').notEmpty().withMessage('Password is required').isString().withMessage('Password must be a string'),
];

export const validateForgotPassword = [
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
  body('token').optional().isString().withMessage('Token must be a string'),
  body('password').optional().isString().withMessage('Password must be a string'),
];

export const validateChangePassword = [
  body('oldPassword').notEmpty().withMessage('Old Password is required').isString().withMessage('Old Password must be a string'),
  body('newPassword').notEmpty().withMessage('New Password is required').isString().withMessage('New Password must be a string'),
];

export const validateActiveUser = [
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
  body('token').optional().isString().withMessage('Token must be a string'),
];

export const validateGetAccessToken = [
  body('refreshToken').notEmpty().withMessage('Refresh Token is required').isString().withMessage('Refresh Token must be a string'),
];


export const validateValidRegister = [
  param('username').optional().isString().withMessage('Username must be a string'),
  param('email').optional().isEmail().withMessage('Invalid email format'),
];

