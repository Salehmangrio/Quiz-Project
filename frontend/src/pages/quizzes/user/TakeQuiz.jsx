import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { viewQuestions } from '../../../utils/apiCalls';
import { buttonStyles } from '../../../utils/styles';

const TakeQuiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizId, title, timeLimit, creatorName } = location.state || {};
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizEnded, setQuizEnded] = useState(false);

  // Timer logic
  useEffect(() => {
    if (quizEnded) return;
    const fetchQuestions = async () => {
      try {
        const data = await viewQuestions(quizId);
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
        alert('Failed to load quiz questions. Please try again later.');
        navigate('/user/quizzes');
      }
    };
    fetchQuestions();
  }, [quizId, navigate, quizEnded]);

  useEffect(() => {
    if (quizEnded) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizEnded]);

  // Format seconds to mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Handle option select
  const handleOptionSelect = (qIndex, option) => {
    if (quizEnded) return;
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = (auto = false) => {
    setQuizEnded(true);
    if (auto) {
      alert('⏰ Time is up! Your quiz was auto-submitted.');
    } else {
      alert('✅ Quiz submitted successfully!');
    }
    console.table(selectedAnswers);
    navigate('/user/quiz/result', {
      state: { quizId, title, timeLimit, questions, selectedAnswers, creatorName }
    });
  };

  if (!quizId || !title || !timeLimit || !questions || !Array.isArray(questions)) {
    return <div className="text-red-600 text-center mt-10"> Error: Invalid or missing quiz data.</div>;
  }

  return (
    <div className='container md:mx-auto p-6'>
      <div className="flex justify-between items-center mb-6 mt-2">
        <h1 className="text-3xl font-bold text-indigo-700">{title}</h1>
        <div className={`text-xl font-semibold px-4 py-2 rounded-lg ${timeLeft < 60 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          Time Left: <span className="font-bold">{formatTime(timeLeft)}</span>
        </div>
      </div>
      <div className="text-gray-600 mb-4">
        <span className="font-medium text-gray-800">Created by:</span> <span className="font-semibold text-rose-800 md:text-xl">{creatorName}</span>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md select-none capture-none">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Questions</h2>

        {questions.map((question, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">{index + 1}. {question.text}</h3>
            {question.options.map((option, optIndex) => (
              <label
                key={optIndex}
                className={`block cursor-pointer p-3 rounded-md border transition 
                  ${selectedAnswers[index] === optIndex
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
                    : 'border-gray-300 hover:border-indigo-400'
                  }`}
              >
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={optIndex}
                  className="mr-2"
                  checked={selectedAnswers[index] === optIndex}
                  onChange={() => handleOptionSelect(index, optIndex)}
                  disabled={quizEnded}
                />
                {option}
              </label>
            ))}
          </div>
        ))}

        <div className="mt-8 text-center">
          <button
            onClick={() => handleSubmit(false)}
            disabled={quizEnded}
            className={buttonStyles}
          >
            Submit Quiz
          </button>
        </div>

        {quizEnded && (
          <div className="mt-4 text-center text-green-600 font-semibold">
            Quiz submitted! Thank you.
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeQuiz;
