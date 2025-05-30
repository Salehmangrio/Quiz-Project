import express from "express";
import {
    addQuestionToQuiz,
    getQuestionsByQuizId,
    deleteQuestionFromQuiz,
    updateQuestionInQuiz
} from "../controllers/questions.controller.js";

const router = express.Router();

router.post('/quizzes/:quizId/questions', addQuestionToQuiz);
router.get('/quizzes/:quizId/questions', getQuestionsByQuizId);
router.put('/quizzes/:quizId/questions/:questionId', updateQuestionInQuiz);
router.delete('/quizzes/:quizId/questions/:questionId', deleteQuestionFromQuiz)


export default router;
