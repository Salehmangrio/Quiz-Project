import express from "express";
import {
    addQuestionToQuiz,
    getQuestionsByQuizId,
    deleteQuestionFromQuiz,
    updateQuestionInQuiz,
    deleteQuestionByQuizId,
    getQuestionById
} from "../controllers/questions.controller.js";

const router = express.Router();

router.post('/quizzes/:quizId/questions', addQuestionToQuiz);
router.get('/quizzes/:quizId/questions/:questionId', getQuestionById);
router.get('/quizzes/:quizId/questions', getQuestionsByQuizId);
router.put('/quizzes/:quizId/questions/:questionId', updateQuestionInQuiz);
router.delete('/quizzes/:quizId/questions/:questionId', deleteQuestionFromQuiz)
router.delete('/quizzes/:quizId/questions', deleteQuestionByQuizId)


export default router;
