const Chat = require("./chat.model");

class ChatRepo {
  async createChat(chatData) {
    const newChat = await Chat.create(chatData);
    return newChat;
  };
  async getChat(id) {
    return await Chat.findById(id)
      .select("-_id -createdAt -updatedAt -__v")
      .populate("UserId", "fName lName -_id")
      .populate("CharacterId", "name -_id");
  }
}
module.exports = new ChatRepo();