const { body } = require('express-validator');
const validatorsMiddleware = require('../../shared/middlewares/validate');
const User = require('../../domains/user/user.model')

exports.RegisterUserValidator = [
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
    body("gender")
        .notEmpty()
        .withMessage('gender is required')
        .isIn(["male", "female"])
        .withMessage('Must Be male or Female')
    ,
    body("email")
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid Email')
        .custom(async (email, { req }) => {
            const userExists = await User.findOne({ email });
            if (userExists && userExists._id.toString() !== req.params.id) {
                throw new Error('Email already Used');
            }
        })
    ,
    body("password")
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 8 characters long')
        .custom(async (password, { req }) => {
            if (password !== req.body.confirmPassword) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
    ,
    body("confirmPassword")
        .notEmpty()
        .withMessage('Confirm Password is required'),
    validatorsMiddleware,
];

exports.LoginUserValidator = [
    body("email")
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid Email')
    ,
    body("password")
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
    ,
    validatorsMiddleware,
];

exports.resetpasswordVaild = [
    body('newPassword')
        .notEmpty()
        .withMessage('Password is Required'),
    validatorsMiddleware
]