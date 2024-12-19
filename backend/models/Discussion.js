const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true,
    },
    comments: [
        {
            text: {
                type: String,
                required: true,
            },
            author: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
            replies: [
                {
                    text: {
                        type: String,
                        required: true,
                    },
                    author: {
                        type: String,
                        required: true,
                    },
                    createdAt: {
                        type: Date,
                        default: Date.now,
                    },
                },
            ],
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model('Discussion', DiscussionSchema);
