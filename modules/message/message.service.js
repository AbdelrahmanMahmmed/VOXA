const { createId, GenerateMessageWithCharacterAI } = require("../../common/helpers/Generate");
const messageRepo = require("../../domains/message/message.repo");
const characterRepo = require("../../domains/Character/character.repo");
const Chat = require("../../domains/chat/chat.model");
const APIError = require("../../shared/utils/APIError");

class MessageService {
  async CreateMessage(ChatId, CharacterId, content) {
    const character = await characterRepo.GetCharacterById(CharacterId);

    if (character.isDeleted) {
      throw new APIError(
        "The Character Is Deleted , Please Create A new Character",
        404,
      );
    }

    const MessageId = createId("MSG", true, character.UserId.gender);
    const Response = await GenerateMessageWithCharacterAI(
      process.env.NAME_MODEL,
      character.promot,
      content,
    );

    const Message = await messageRepo.CreateMeassage({
      ChatId: ChatId,
      MessageId,
      SenderId: character.UserId,
      ReceiverId: character._id,
      content: content,
      Response,
    });

    await Chat.findByIdAndUpdate(
      Message.ChatId,
      { $push: { messages: Message._id } },
      { new: true },
    );

    return Message;
  };

  async DeleteMessage(messageId) {
    const deletedMessage = await messageRepo.DeleteMessage(messageId);
    const ChatResult = await Chat.updateMany(
      { messages: messageId },
      { $pull: { messages: messageId } },
    );

    return {
      success: !!deletedMessage,
      message: deletedMessage
        ? "Message deleted successfully"
        : "Message not found",
    };
  };

  async GetAllMessages(req, CharacterId) {
    const character = await characterRepo.GetCharacterById(CharacterId);
    const Messages = await messageRepo.GetAllMessages(req.user._id, character._id);
    return Messages;
  };

  async getMessage(id) {
    return await messageRepo.getMessage(id);
  }
}
module.exports = new MessageService();