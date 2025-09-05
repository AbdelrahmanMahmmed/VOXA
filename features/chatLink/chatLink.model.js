const mongoose = require("mongoose");

const chatLinkSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastMessageTimestamp: {
    type: Date,
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  linkId: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("ChatLink", chatLinkSchema);
