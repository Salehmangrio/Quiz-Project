import express from 'express';
import {
    createQuiz,
    getAllQuizzes,
    getQuizById,
    updateQuiz,
    deleteQuiz,
    getQuizzesByUser
} from '../controllers/quiz.controller.js';

const router = express.Router();

router.post("/quizzes", createQuiz);
router.get("/quizzes", getAllQuizzes);
router.get("/quizzes/user/:userId", getQuizzesByUser);
router.get("/quizzes/:id", getQuizById);
router.put("/quizzes/:id", updateQuiz);
router.delete("/quizzes/:id", deleteQuiz);

export default router;
