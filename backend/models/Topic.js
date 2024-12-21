const mongoose = require('mongoose');

// Topic Schema
const TopicSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true, // Ensure that the title is unique for each topic
        },
        description: {
            type: String,
            required: true,
        },
        discussions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Discussion',
        }], // Ensure this is defined only once
        subtopic: { // Add subtopic field
            type: String,
            required: false, // Make it optional
        },
    },
    {
        timestamps: true, // Includes createdAt and updatedAt timestamps
    }
);

// Explicitly defining indexes (to prevent conflicts)
TopicSchema.index({ title: 1 }, { unique: true });

module.exports = mongoose.model('Topic', TopicSchema);