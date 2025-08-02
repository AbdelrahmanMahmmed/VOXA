const mongoose = require("mongoose");

const CharacterSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    CharacterId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    ChatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: false,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: false,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
        required: false,
        trim: true
    },
    promot: {
        type: String,
        required: false,
        trim: true
    },
    personality: {
        type: [String],
        default: [],
    },
    Specialist: {
        type: String,
        require: true,
        trim: true
    },
    language: {
        type: String,
        required: false,
        trim: true
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const Character = mongoose.model("Character", CharacterSchema);
module.exports = Character;