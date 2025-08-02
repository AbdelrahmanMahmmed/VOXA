const ChatLink = require("./chatLink.model");
const Message = require("../../domains/message/message.model");
const { v4: uuidv4 } = require("uuid");

exports.createChatLink = async (chatId, userId, isPublic) => {
    const lastMessage = await Message.findOne({ ChatId: chatId })
        .sort({ createdAt: -1 })
        .select("createdAt");

    const newLink = new ChatLink({
        chatId,
        createdBy: userId,
        isPublic: !!isPublic,
        lastMessageTimestamp: lastMessage ? lastMessage.createdAt : new Date(),
        linkId: uuidv4(),
    });

    await newLink.save();
    return newLink;
};

exports.getMessagesBeforeLink = async (linkId) => {
    const link = await ChatLink.findOne({ linkId });

    if (!link) throw new Error("Link not found");

    const messages = await Message.find({
        ChatId: link.chatId,
        createdAt: { $lte: link.lastMessageTimestamp },
    }).sort({ createdAt: 1 });

    return {
        link,
        messages,
    };
};
