import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
        title: String,
        description: String,
        timeLimit: Number,
        questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
        active: { type: Boolean, default: false }
    },
    {
        timestamps: true,
    });

const Quiz = mongoose.model("Quiz", QuizSchema);
export default Quiz;