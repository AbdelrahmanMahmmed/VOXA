const { body } = require('express-validator');
const validatorsMiddleware = require('../../shared/middlewares/validate');
const User = require('../../domains/user/user.model')

exports.UpdatedUserValidator = [
    body("fName")
        .notEmpty()
        .withMessage('fName is required')
        .isLength({ min: 3 })
        .withMessage('fName must be at least 3 characters long')
        .isLength({ max: 50 })
        .withMessage('fName must be at most 50 characters long')
    ,
    body("lName")
        .notEmpty()
        .withMessage('lName is required')
        .isLength({ min: 3 })
        .withMessage('lName must be at least 3 characters long')
        .isLength({ max: 50 })
        .withMessage('lName must be at most 50 characters long')
    ,
    validatorsMiddleware,
];

exports.UpdatedUserForRoleValidator = [
    body("role")
        .notEmpty()
        .withMessage('Role is required')
        .isIn(['user', 'admin'])
        .withMessage('Role must be either User or Admin '),
    ,
    validatorsMiddleware,
];