import express from 'express';
import {
    submitScore,
    getLeaderboard,
    getPointsByUsername
} from '../controllers/points.controller.js';

const router = express.Router();

router.post('/points/submit', submitScore);
router.get('/points/leaderboard', getLeaderboard);
router.get('/points/:username', getPointsByUsername);

export default router;
