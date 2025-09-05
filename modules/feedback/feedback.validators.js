const { param, body, query } = require("express-validator");
const { getUser } = require("../../domains/user/user.repo");
const validatorsMiddleware = require("../../shared/middlewares/validate");
const { getFeedBack } = require("../../domains/feedback/feedback.repo");

exports.CreateFeedBackValidator = [
  param("user")
    .notEmpty()
    .withMessage("userId not exist")
    .isMongoId()
    .withMessage("Must Be MongoId")
    .bail()
    .custom(async (userId) => {
      const user = await getUser(userId);
      if (!user) {
        throw new Error("User not found in database");
      }
      return true;
    }),

  body("message").notEmpty().withMessage("message is not exist"),

  body("rating")
    .notEmpty()
    .withMessage("rating is not exist")
    .isNumeric()
    .withMessage("Must Be Numerical")
    .bail()
    .custom((value) => {
      if (value < 1 || value > 5) {
        throw new Error("Rating must be between 1 and 5");
      }
      return true;
    }),

  body("type")
    .notEmpty()
    .withMessage("type is not exist")
    .isIn(["bug", "suggestion", "general"])
    .withMessage("type must be bug or suggestion or general"),

  validatorsMiddleware,
];

exports.vaildationfeedbackId = [
  param("feedbackId")
    .notEmpty()
    .withMessage("feedbackId is required")
    .isMongoId()
    .withMessage("Invalid feedbackId format")
    .bail()
    .custom(async (feedbackId) => {
      const feedback = await getFeedBack(feedbackId);
      if (!feedback) {
        throw new Error("Feedback not found in database");
      }
      return true;
    }),
  validatorsMiddleware,
];
