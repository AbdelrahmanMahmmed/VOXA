const Message = require("./message.model");

class MessageRepo {
  async getMessage(id) {
    return await Message.findById(id)
      .populate("SenderId", "-_id fName lName")
      .populate("ReceiverId", "name -_id")
      .select("MessageId SenderId ReceiverId content Response");
  };

  async CreateMeassage(MessageData) {
    const newMessage = (await Message.create(MessageData)).populate(
      "ReceiverId",
      "name",
    );
    return newMessage;
  };

  async DeleteMessage(messageId) {
    const deletedMessage = await Message.findByIdAndDelete(messageId);
    return deletedMessage;
  };

  async GetAllMessages(UserId, CharacterId) {
    const Messages = await Message.find({
      SenderId: UserId,
      ReceiverId: CharacterId,
    })
      .select("MessageId SenderId ReceiverId content Response")
      .populate("SenderId", "-_id fName lName")
      .populate("ReceiverId", "name -_id")
      .sort({ createdAt: -1 });
    return Messages;
  };
}

module.exports = new MessageRepo();