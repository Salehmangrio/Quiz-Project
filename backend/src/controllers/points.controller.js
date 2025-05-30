import Points from '../models/points.model.js';
import User from '../models/user.model.js';

export const submitScore = async (req, res) => {
    const {
        userId,
        quizId,
        score,
        correctAnswers,
        totalQuestions,
        answers
    } = req.body;

    try {
        let points = await Points.findOne({ user: userId });

        const quizStats = {
            quiz: quizId,
            score,
            correctAnswers,
            totalQuestions,
            answers
        };

        if (points) {
            points.quizList.push(quizStats);
            points.totalTests += 1;
            points.score += score;
            points.performance = Math.round(points.score / points.totalTests);
        } else {
            points = new Points({
                user: userId,
                score,
                performance: score,
                totalTests: 1,
                quizList: [quizStats]
            });
        }

        await points.save();
        res.status(200).json({ message: 'Score submitted successfully', data: points });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await Points.find()
            .populate('user', 'name email')
            .sort({ score: -1 });

        res.status(200).json(leaderboard);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getPointsByUsername = async (req, res) => {
    const { username } = req.params;

    try {
        // Find user by username
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find points by user._id
        const points = await Points.findOne({ user: user._id })
            .populate('quizList.quiz', 'title description')
            .populate('quizList.answers.questionId', 'text');

        if (!points) {
            return res.status(404).json({ error: 'No points data found for this user' });
        }

        res.status(200).json(points);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};