import Quiz from '../models/quiz.model.js';

export const createQuiz = async (req, res) => {
  try {
    const { title, description, timeLimit, active } = req.body;

    const quiz = new Quiz({
      title,
      description,
      timeLimit,
      active
    });

    const savedQuiz = await quiz.save();

    res.status(201).json({
      message: "Quiz created successfully",
      quiz: savedQuiz
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating quiz", error });
  }
};

export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('questions');
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quizzes", error });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('questions');

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quiz", error });
  }
};

export const updateQuiz = async (req, res) => {
  try {
    const { title, description, timeLimit, active } = req.body;

    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { title, description, timeLimit, active },
      { new: true }
    );

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({
      message: "Quiz updated successfully",
      quiz
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating quiz", error });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting quiz", error });
  }
};