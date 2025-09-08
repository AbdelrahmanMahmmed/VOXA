const chatService = require("./chat.service");
const characterRepo = require("../../domains/Character/character.repo");

class ChatController {
  async CreateChat(CharacterId, userId) {
    const character = await characterRepo.GetCharacterById(CharacterId);
    if (!character) {
      const error = new Error("Character not found");
      error.statusCode = 404;
      throw error;
    }

    const chat = await chatService.CreateChat(character.name, CharacterId, userId);
    return chat;
  }

  async GetOne(req, res) {
    const ChatId = req.params.id;
    const result = await chatService.GetChat(ChatId);
    if (!result) return res.status(404).json({ message: "Chat not found" });
    res.status(200).json(result);
  };
}

module.exports = new ChatController();