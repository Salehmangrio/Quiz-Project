import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { viewQuestions, deleteQuestionFromQuiz } from '../../../utils/apiCalls';

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
            <h2 className="text-xl font-bold mb-4 capitalize">{title}</h2>
            <p className='mb-4 font-light'>{decription}</p>
            {questions.length === 0 ? (
                <p
                    className='flex justify-center items-center text-3xl font-extrabold h-[100%]'
                >No questions found.</p>
            ) : (
                <>
                    <h4 className='mb-2'>Time for Quiz: {time} mins</h4>
                    <ul className="space-y-4">
                        {questions.map((q, index) => (
                            <li key={q._id} className="border p-4 rounded">
                                <p className="text-sm text-gray-500 mt-2 my-2">Subject: {q.subject}</p>
                                <p className="font-semibold">{index + 1}. {q.text}</p>
                                <ul className="list-disc ml-6 mt-2">
                                    {q.options.map((opt, i) => (
                                        <li key={i} className={i === q.correctAnswerIndex ? 'text-green-600 font-medium' : ''}>
                                            {opt}
                                        </li>
                                    ))}
                                </ul>
                                <div className='flex justify-center gap-4 pt-4'>
                                    <Link
                                        to={`edit`}
                                        state={{ id:q._id}}
                                        className='px-4 py-1.5 my-2 text-white bg-blue-600 rounded hover:bg-blue-700'
                                    >Edit Question</Link>
                                    <button
                                        onClick={() => {
                                            deleteQuestionFromQuiz(quizId, q._id),
                                            setQuestions(questions.filter(question => question._id !== q._id))
                                        }}
                                        className='px-4 py-1.5 my-2 text-white bg-rose-600 rounded hover:bg-rose-700'
                                    >Delete Question</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default ViewQuestions;
