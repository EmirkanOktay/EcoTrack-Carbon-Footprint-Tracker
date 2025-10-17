const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    targetValue: {
        type: Number,
        required: false
    },
    currentValue: {
        type: Number,
        default: 0
    },
    unit: {
        type: String,
        enum: ["Km", "Kg", "%", "Count"],
        default: "Count"
    },
    category: {
        type: String,
        enum: ["Transport", "Recycling", "Energy", "Water", "Other"],
        default: "Other"
    },
    startedDate: {
        type: Date,
        default: () => new Date()
    },
    deadline: {
        type: Date,
        default: () => {
            const d = new Date();
            d.setMonth(d.getMonth() + 1);
            return d;
        }
    },
    completed: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

module.exports = mongoose.model("Goal", goalSchema);
