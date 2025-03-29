import mongoose from "mongoose";

const UserResponseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    responses: [
        {
            questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
            selectedOption: { type: String, required: true }, // Option text
            score: { type: Number, required: true }  // Store the score of selected option
        }
    ],
    totalScore: { type: Number, required: true }
});

module.exports = mongoose.model("UserResponse", UserResponseSchema);
