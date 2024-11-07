import { query } from 'express-validator';
import { validationResult } from 'express-validator';

export const validateFetchUsers = [
    query('since')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Since parameter must be a non-negative integer'),
    query('per_page')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Per page must be between 1 and 100'),
    handleValidationErrors
];

function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
}