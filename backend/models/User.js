const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    country: { type: String, required: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    preferredTopics: { type: [String], default: [] }, // New field for multiple topics
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);