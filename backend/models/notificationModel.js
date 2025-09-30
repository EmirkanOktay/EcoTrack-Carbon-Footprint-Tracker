const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String },
    message: { type: String },
    date: { type: Date, default: Date.now() },
    read: { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model("Notification", Schema);