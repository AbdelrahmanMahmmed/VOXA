const { GetCharacterById } = require("../../domains/Character/character.repo");
const {
  CreateMessage,
  DeleteMessage,
  GetAllMessages,
} = require("./message.service");

exports.Create = async (req, res, next) => {
  const CharacterId = req.params.CharacterId;
  // const ChatId = req.query.ChatId;
  const Character = await GetCharacterById(CharacterId);
  try {
    const result = await CreateMessage(
      Character.ChatId,
      CharacterId,
      req.body.content,
    );
    res.json({
      Message: "Send Message Done..",
      result,
    });
  } catch (err) {
    next(err);
  }
};

exports.Delete = async (req, res, next) => {
  try {
    const result = await DeleteMessage(req.params.id);
    res.json({
      Message: result.message,
      success: result.success,
    });
  } catch (error) {
    next(error);
  }
};

exports.GetAll = async (req, res, next) => {
  try {
    const result = await GetAllMessages(req, req.params.CharacterId);
    res.json({
      result,
    });
  } catch (error) {
    next(error);
  }
};
