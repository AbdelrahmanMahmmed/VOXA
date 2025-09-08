const { param } = require("express-validator");
const validatorsMiddleware = require("../../shared/middlewares/validate");
const chatRepo = require("../../domains/chat/chat.repo");

exports.vaildationChatId = [
  param("id")
    .notEmpty()
    .withMessage("ChatId is required")
    .isMongoId()
    .withMessage("Invalid ChatId format")
    .bail()
    .custom(async (ChatId) => {
      const chatId = await chatRepo.getChat(ChatId);
      if (!chatId) {
        throw new Error("Chat not found in database");
      }
      return true;
    }),
  validatorsMiddleware,
];
