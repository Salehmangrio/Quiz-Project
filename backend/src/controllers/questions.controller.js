import Quiz from "../models/quiz.model.js";
import Question from "../models/question.model.js";

export const addQuestionToQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { text, subject, options, correctAnswerIndex } = req.body;

    // quiz exists..??
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    //options and correctAnswerIndex ..??
    if (!Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ message: "Options must be an array with at least 2 items." });
    }
    if (correctAnswerIndex < 0 || correctAnswerIndex >= options.length) {
      return res.status(400).json({ message: "correctAnswerIndex is out of bounds." });
    }

    // Create the question
    const newQuestion = new Question({
      quiz: quizId,
      text,
      subject,
      options,
      correctAnswerIndex
    });

    const savedQuestion = await newQuestion.save();

    // Add question ID to quiz
    await Quiz.findByIdAndUpdate(quizId, {
      $push: { questions: savedQuestion._id }
    });

    res.status(201).json({
      message: "Question added successfully to quiz.",
      question: savedQuestion
    });

  } catch (error) {
    res.status(500).json({ message: "Error adding question", error });
  }
};

export const getQuestionsByQuizId = async (req, res) => {
  try {
    const { quizId } = req.params;

    // Fetch the quiz and populate questions
    const quiz = await Quiz.findById(quizId).populate('questions');
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json(quiz.questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error });
  }
};

export const deleteQuestionByQuizId = async (req, res) => {
  try {
    const { quizId } = req.params;
    // delete all questions from the database
    await Question.deleteMany({ quiz: quizId });
    res.status(200).json({ message: "All questions deleted successfully from quiz." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting questions", error });
  }
}

export const deleteQuestionFromQuiz = async (req, res) => {
  try {
    const { quizId, questionId } = req.params;

    // Remove question reference from quiz
    await Quiz.findByIdAndUpdate(quizId, {
      $pull: { questions: questionId }
    });

    // Delete the question document
    await Question.findByIdAndDelete(questionId);

    res.status(200).json({ message: "Question deleted successfully from quiz." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting question", error });
  }
};

export const updateQuestionInQuiz = async (req, res) => {
  try {
    const { quizId, questionId } = req.params;
    const { text, subject, options, correctAnswerIndex } = req.body;

    //options and correctAnswerIndex .. ??
    if (options) {
      if (!Array.isArray(options) || options.length < 2) {
        return res.status(400).json({ message: "Options must be an array with at least 2 items." });
      }
      if (correctAnswerIndex !== undefined && (correctAnswerIndex < 0 || correctAnswerIndex >= options.length)) {
        return res.status(400).json({ message: "correctAnswerIndex is out of bounds." });
      }
    }

    // Update question
    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      { text, subject, options, correctAnswerIndex },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({
      message: "Question updated successfully.",
      question: updatedQuestion
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating question", error });
  }
};
