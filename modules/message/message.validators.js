const { param } = require("express-validator");
const validatorsMiddleware = require("../../shared/middlewares/validate");
const CharacterRepo = require("../../domains/Character/character.repo");
const messageRepo = require("../../domains/message/message.repo");

exports.vaildationCharacterId = [
  param("CharacterId")
    .notEmpty()
    .withMessage("CharacterId is required")
    .isMongoId()
    .withMessage("Invalid CharacterId format")
    .bail()
    .custom(async (CharacterId) => {
      const characterId = await CharacterRepo.GetCharacterById(CharacterId);
      if (!characterId) {
        throw new Error("Character not found in database");
      }
      return true;
    }),
  validatorsMiddleware,
];

exports.vaildationMessageId = [
  param("id")
    .notEmpty()
    .withMessage("MessageId is required")
    .isMongoId()
    .withMessage("Invalid MessageId format")
    .bail()
    .custom(async (MessageId) => {
      const messageId = await messageRepo.getMessage(MessageId);
      if (!messageId) {
        throw new Error("Message not found in database");
      }
      return true;
    }),
  validatorsMiddleware,
];
