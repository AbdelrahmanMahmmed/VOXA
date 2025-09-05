const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    ChatId: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    CharacterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Character",
      required: false,
    },
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        required: false,
      },
    ],
  },
  { timestamps: true },
);

const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;
