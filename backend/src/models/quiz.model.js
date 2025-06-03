import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 3, maxlength: 50 },
    description: { type: String, required: true, minlength: 10, maxlength: 500 },
    timeLimit: { type: Number, required: true, min: 2 },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    active: { type: Boolean, default: false },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true,
});

const Quiz = mongoose.model("Quiz", QuizSchema);
export default Quiz;
