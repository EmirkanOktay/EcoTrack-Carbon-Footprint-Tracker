const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    order: { type: Number, required: true },
    question: { type: String, required: true },
    answer: { type: [String], default: [] }
});

const SurveySchema = new mongoose.Schema({
    title: { type: String, required: true },
    questions: { type: [QuestionSchema], required: true }
});

module.exports = mongoose.model("Survey", SurveySchema);
