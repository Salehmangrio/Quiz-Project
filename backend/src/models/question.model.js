import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  text: { type: String, required: true },
  subject: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswerIndex: { type: Number, required: true }
},
  {
    timestamps: true,
  });

const Question = mongoose.model('Question', QuestionSchema);
export default Question;