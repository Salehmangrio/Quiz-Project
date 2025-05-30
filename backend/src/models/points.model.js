import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const PointsSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, default: 0 },
    performance: { type: Number, default: 0 },
    totalTests: { type: Number, default: 0 },
    quizList: [
        {
            quiz: { type: Schema.Types.ObjectId, ref: 'Quiz' },
            score: { type: Number, required: true },
            correctAnswers: { type: Number },
            totalQuestions: { type: Number },
            dateTaken: { type: Date, default: Date.now },
            answers: [
                {
                    questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
                    selectedOptionIndex: { type: Number },
                    isCorrect: { type: Boolean }
                }
            ]
        }
    ]
});

const Points = model('Point', PointsSchema);

export default Points;
