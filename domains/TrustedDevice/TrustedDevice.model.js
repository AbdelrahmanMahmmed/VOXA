const mongoose = require("mongoose");

const trustedDeviceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  deviceId: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
  },
  lastUsedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("TrustedDevice", trustedDeviceSchema);
