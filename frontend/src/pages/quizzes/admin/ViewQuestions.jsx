import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { viewQuestions } from '../../../utils/apiCalls';

const ViewQuestions = () => {
    const { quizId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const location = useLocation()
    const { title, decription, time } = location.state


    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await viewQuestions(quizId);
                setQuestions(data);
            } catch (err) {
                setError('Failed to load questions.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [quizId]);

    if (loading) return <p>Loading questions...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Questions for {title}</h2>
            <p className='mb-4 font-light'>{decription}</p>
            {questions.length === 0 ? (
                <p>No questions found.</p>
            ) : (
                <>
                    <h4 className='mb-2'>Time for Quiz: {time} mins</h4>
                    <ul className="space-y-4">
                        {questions.map((q, index) => (
                            <li key={q._id} className="border p-4 rounded">
                                <p className="font-semibold">{index + 1}. {q.text}</p>
                                <ul className="list-disc ml-6 mt-2">
                                    {q.options.map((opt, i) => (
                                        <li key={i} className={i === q.correctAnswerIndex ? 'text-green-600 font-medium' : ''}>
                                            {opt}
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-sm text-gray-500 mt-2">Subject: {q.subject}</p>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default ViewQuestions;
