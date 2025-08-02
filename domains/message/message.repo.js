const Message = require('./message.model');

exports.getMessage = async(id) => {
    return await Message.findById(id);
}

exports.CreateMeassage = async (MessageData) => {
    const newMessage = (await Message.create(MessageData)).populate('ReceiverId' , 'name');
    return newMessage;
};

exports.DeleteMessage = async (messageId) => {
    const deletedMessage = await Message.findByIdAndDelete(messageId);
    return deletedMessage;
}

exports.GetAllMessages = async (UserId, CharacterId) => {
    const Messages = await Message.find({
        SenderId: UserId,
        ReceiverId: CharacterId
    })
    .select('MessageId SenderId ReceiverId content Response')
    .populate('SenderId' , '-_id fName lName')
    .populate('ReceiverId', 'name -_id')
    .sort({ createdAt: -1 });
    return Messages;
};