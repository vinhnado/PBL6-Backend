import { query, param, body } from 'express-validator';

export const validateDeleteComment = [
    param('commentId').notEmpty().withMessage('Comment ID is required').isInt().withMessage('Comment ID must be an integer'),
];

export const validateUpdateComment = [
    param('commentId').notEmpty().withMessage('Comment ID is required').isInt().withMessage('Comment ID must be an integer'),
    body('content').notEmpty().isString().withMessage('Content must be a string'),
  ];
  
export const validateAddComment = [
    body('episodeId').notEmpty().withMessage('Episode ID is required').isInt().withMessage('Episode ID must be an integer'),
    body('content').notEmpty().withMessage('Content is required').isString().withMessage('Content must be a string'),
  ];

  export const validateAddSubComment = [
    body('parentId').notEmpty().withMessage('parentId is required').isInt().withMessage('parentId must be an integer'),
    body('content').notEmpty().withMessage('Content is required').isString().withMessage('Content must be a string'),
  ];

  export const validateDeleteSubComment = [
    param('subCommentId').notEmpty().withMessage('SubComment ID is required').isInt().withMessage('SubComment ID must be an integer'),
];

export const validateUpdateSubComment = [
  param('subCommentId').notEmpty().withMessage('SubComment ID is required').isInt().withMessage('SubComment ID must be an integer'),
  body('content').notEmpty().isString().withMessage('Content must be a string'),
];
