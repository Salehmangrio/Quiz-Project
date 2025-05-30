import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/auth.route.js';
import { connectDB as DatabaseConnection } from './db/db.js';
import quizRoutes from './routes/quiz.route.js';
import questionRoutes from './routes/question.route.js';
import pointsRoutes from './routes/points.route.js';
dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

//Routes 
app.use('/api/',
    [
        authRoutes,
        quizRoutes,
        questionRoutes,
        pointsRoutes
    ]
);

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

DatabaseConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }).catch((error) => {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    });

