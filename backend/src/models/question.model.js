import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  text: String,
  subject: String,
  options: [String],
  correctAnswerIndex: Number
},
{
    timestamps: true,
});

const Question = mongoose.model('Question', QuestionSchema);
export default Question;