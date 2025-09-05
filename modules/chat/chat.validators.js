const { param } = require("express-validator");
const validatorsMiddleware = require("../../shared/middlewares/validate");
const { GetCharacterById } = require("../../domains/Character/character.repo");

exports.vaildationChatId = [
  param("id")
    .notEmpty()
    .withMessage("ChatId is required")
    .isMongoId()
    .withMessage("Invalid ChatId format")
    .bail()
    .custom(async (ChatId) => {
      const chatId = await GetCharacterById(ChatId);
      if (!chatId) {
        throw new Error("Chat not found in database");
      }
      return true;
    }),
  validatorsMiddleware,
];
