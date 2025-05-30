import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB as DatabaseConnection } from './db/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

DatabaseConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }).catch((error) => {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    });

