const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    UserId: {
      type: String,
      required: true,
      unique: true,
    },
    fName: {
      type: String,
      required: true,
      trim: true,
    },
    lName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      require: false,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      require: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    IsDeleted: {
      type: Boolean,
      default: false,
    },
    passwordChanagedAt: {
      type: Date,
    },
    // For ForgotPassword
    passwordResetCode: String,
    passwordResetExpiret: Date,
    passwordResetVerifed: Boolean,

    Characters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Character",
        require: true,
      },
    ],
    plan: {
      type: String,
      enum: ["free", "level1", "level2", "premium"],
      default: "free",
    },
    createdCharactersThisMonth: {
      type: Number,
      default: 0,
    },
    characterResetDate: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
