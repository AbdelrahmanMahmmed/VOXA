const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: false,
    },
    type: {
        type: String,
        enum: ['bug', 'suggestion', 'general'],
        default: 'general',
    },
    isResolved: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);