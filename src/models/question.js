import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    category: { type: String, required: true },  // e.g., "Relationships", "Work Stress"
    questionText: { type: String, required: true },
    options: [
        {
            optionText: { type: String, required: true },
            value: { type: Number, required: true }  // Assign scores for analysis
        }
    ]
});

module.exports = mongoose.model("Question", QuestionSchema);
