const mongoose = require('mongoose');

// Discussion Schema
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
    comments: [ // Array to store comments
        {
            text: {
                type: String,
                required: true,
            },
            author: {
                type: String,
                required: true, // Example: author can store the user's name or ID
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
            replies: [ // Nested replies for a comment
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
}, {
    timestamps: true, // Includes createdAt and updatedAt
});

module.exports = mongoose.model('Discussion', DiscussionSchema);