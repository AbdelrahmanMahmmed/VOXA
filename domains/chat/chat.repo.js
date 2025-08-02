
const Chat = require('./chat.model');

exports.createChat = async (chatData) => {
    const newChat = await Chat.create(chatData);
    return newChat;
};

exports.getChat = (id) => Chat.findById(id);

exports.updateUser = async (id, updateData) => {
    return await Chat.findByIdAndUpdate(id, updateData, {
        new: true
    });
};

exports.deleteChat = async (id) => {
    return await Chat.findByIdAndDelete(id);
}

exports.getAllChats = async (page, limit) => { };