const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
    carKm: { type: Number, default: 0 },
    busKm: { type: Number, default: 0 },
    bikeKm: { type: Number, default: 0 },
    meatMeals: { type: Number, default: 0 },
    dairyMeals: { type: Number, default: 0 },
    electricityKwh: { type: Number, default: 0 },
    waterUsage: { type: Number, default: 0 },
    recycling: { type: Boolean, default: false },
    flights: { type: String, enum: ["none", "short", "long"], default: "none" }
})

module.exports = mongoose.model("Activity", Schema);