const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    age: { type: Number, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    joinDate: { type: Date, default: Date.now() },
    cartype: {
        type: String,
        trim: true,
        enum: ["Electric", "Hybrid", "Gasoline", "I don't have a car"],
        default: "I don't have a car"
    },

    level: { type: Number, default: 1 },
    xpCounter: { type: Number, default: 0 },
    lastSeen: { type: Date, default: Date.now() },
}, { timestamps: true })

module.exports = mongoose.model("User", Schema);