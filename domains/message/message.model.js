const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    ChatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      require: true,
    },
    MessageId: {
      type: String,
      require: true,
    },
    SenderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    ReceiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Character",
      require: true,
    },
    content: {
      type: String,
      require: true,
      trim: true,
    },
    Response: {
      type: String,
      default: null,
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
