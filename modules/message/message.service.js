const { createId, GenerateMessageWithCharacterAI } = require('../../common/helpers/Generate');
const { CreateMeassage, DeleteMessage, GetAllMessages } = require('../../domains/message/message.repo');
const { GetCharacterById } = require('../../domains/Character/character.repo');
const Chat = require('../../domains/chat/chat.model');
const APIError = require('../../shared/utils/APIError');
exports.CreateMessage = async (ChatId, CharacterId, content) => {
    const character = await GetCharacterById(CharacterId);

    if (character.isDeleted) {
        throw new APIError("The Character Is Deleted , Please Create A new Character", 404);
    }

    const MessageId = await createId('MSG', true, character.UserId.gender);
    const Response = await GenerateMessageWithCharacterAI(process.env.NAME_MODEL, character.promot, content);

    const Message = await CreateMeassage({
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
        { new: true }
    );

    return Message;
}

exports.DeleteMessage = async (messageId) => {
    const deletedMessage = await DeleteMessage(messageId);
    const ChatResult = await Chat.updateMany(
        { messages: messageId },
        { $pull: { messages: messageId } }
    );

    return {
        success: !!deletedMessage,
        message: deletedMessage ? 'Message deleted successfully' : 'Message not found',
    };

}

exports.GetAllMessages = async (req, CharacterId) => {
    const character = await GetCharacterById(CharacterId);
    const Messages = await GetAllMessages(req.user._id, character._id);
    return Messages;
}