const ChatModel = require("../../domains/chat/chat.model");
const Character = require("../../domains/Character/character.model");
const Message = require("../../domains/message/message.model");
const userRepo = require("../../domains/user/user.repo");
const { GetCharacterById } = require("../../domains/Character/character.repo");
const chatRepo = require("../../domains/chat/chat.repo");

class ChatService {
  async CreateChat(title, CharacterId, UserId) {
    const user = await userRepo.getUser(UserId);

    const isCharacterExists = user.Characters.includes(CharacterId);
    if (!isCharacterExists) {
      throw new Error("Character does not belong to the user");
    }

    const chat = new ChatModel({
      title: title,
      CharacterId: CharacterId,
      UserId: UserId,
    });

    const Character = await GetCharacterById(CharacterId);
    Character.ChatId = chat._id;
    await Character.save();

    try {
      const savedChat = await chat.save();
      return savedChat;
    } catch (error) {
      throw new Error("Error creating chat: " + error.message);
    }
  }

  async GetChat(id) {
    try {
      return await chatRepo.getChat(id);
    } catch (error) {
      throw new Error("Error retrieving chat: " + error.message);
    }
  };
}
module.exports = new ChatService();