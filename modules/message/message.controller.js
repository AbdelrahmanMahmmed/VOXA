const CharacterRepo = require("../../domains/Character/character.repo");
const MessageService = require("./message.service");

class MessageController {
  async Create(req, res, next) {
    const CharacterId = req.params.CharacterId;
    const Character = await CharacterRepo.GetCharacterById(CharacterId);
    try {
      const result = await MessageService.CreateMessage(
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

  async Delete(req, res, next) {
    try {
      const result = await MessageService.DeleteMessage(req.params.id);
      res.json({
        Message: result.message,
        success: result.success,
      });
    } catch (error) {
      next(error);
    }
  };

  async GetAll(req, res, next) {
    try {
      const result = await MessageService.GetAllMessages(req, req.params.CharacterId);
      res.json({
        result,
      });
    } catch (error) {
      next(error);
    }
  };

  async GetOne(req, res, next) {
    try {
      const result = await MessageService.getMessage(req.params.id);
      if (!result) {
        return res.status(404).json({ message: "Message not found" });
      }
      res.json({ result });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MessageController();