const chatService = require("./chat.service");
const { GetCharacterById } = require("../../domains/Character/character.repo");

class ChatController {
  async CreateChat(CharacterId, req, res) {
    const characterId = await GetCharacterById(CharacterId);
    if (!characterId)
      return res.status(404).json({ message: "Character not found" });
    try {
      const chat = await chatService.CreateChat(characterId.name, CharacterId, req.user._id);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  async GetOne(req, res) {
    const ChatId = req.params.id;
    const result = await chatService.GetChat(ChatId);
    if (!result) return res.status(404).json({ message: "Chat not found" });
    res.status(200).json(result);
  };
}

module.exports = new ChatController();