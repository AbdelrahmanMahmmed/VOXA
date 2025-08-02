const { body, param } = require('express-validator');
const validatorsMiddleware = require('../../shared/middlewares/validate');
const { allowedPersonalities } = require('../../common/helpers/massage');
const { GetCharacterById } = require('../../domains/Character/character.repo');

exports.CreateCharacterValidator = [
    body("name")
        .notEmpty().withMessage("name is required")
        .isString().withMessage("name must be a string")
        .isLength({ min: 2, max: 30 }).withMessage("name must be between 2 and 30 characters"),

    body("description")
        .notEmpty().withMessage("description is required")
        .isString().withMessage("description must be a string")
        .isLength({ min: 50, max: 500 }).withMessage("description must be between 50 and 500 characters"),

    body("avatar")
        .optional()
        .isURL().withMessage("avatar must be a valid URL"),

    body("promot")
        .notEmpty().withMessage("promot is required")
        .isString().withMessage("promot must be a string")
        .isLength({ min: 50, max: 1500 }).withMessage("promot must be between 50 and 1500 characters"),

    body("personality")
        .isArray({ min: 1 }).withMessage("personality must be a non-empty array")
    // .custom((values) => {
    //     const invalid = values.filter(v => !allowedPersonalities.includes(v));
    //     if (invalid.length > 0) {
    //         throw new Error(`Invalid personality types: ${invalid.join(", ")}`);
    //     }
    //     return true;
    // }),
    ,

    body("language")
        .notEmpty().withMessage("language is required")
        .isIn(["ar", "en"]).withMessage("language must be either 'ar' or 'en'"),

    body("isPublished")
        .notEmpty().withMessage("isPublished is required")
        .isBoolean().withMessage("isPublished must be a boolean"),

    body('Specialist')
        .notEmpty()
        .withMessage('Specialist must be exist'),

    validatorsMiddleware,
];

exports.UpdatedCharacterValidator = [
    body("name")
        .optional(),

    body("description")
        .optional(),
    body("promot")
        .optional(),

    body("personality")
        .optional(),

    body("language")
        .optional(),
    validatorsMiddleware,
];

exports.vaildationCharacterId = [
    param('id')
        .notEmpty()
        .withMessage('CharacterId is required')
        .isMongoId()
        .withMessage('Invalid CharacterId format')
        .bail()
        .custom(async (CharacterId) => {
            const characterId = await GetCharacterById(CharacterId);
            if (!characterId) {
                throw new Error('Character not found in database');
            }
            return true;
        }),
    validatorsMiddleware
];