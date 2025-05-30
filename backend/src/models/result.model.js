import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
        score: { type: Number, required: true },
        totalQuestions: { type: Number, required: true },
        correctAnswers: { type: Number, required: true },
        incorrectAnswers: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

const Result = mongoose.model("Result", ResultSchema);