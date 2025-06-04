import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const TakeQuiz = () => {
  const location = useLocation();
  const { quizId, title, timeLimit, questions } = location.state || {};

  const [timeLeft, setTimeLeft] = useState(timeLimit * 60);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizEnded, setQuizEnded] = useState(false);

  // Timer logic
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
  };

  if (!quizId || !title || !timeLimit || !questions || !Array.isArray(questions)) {
    return <div className="text-red-600 text-center mt-10"> Error: Invalid or missing quiz data.</div>;
  }

  return (
    <div className='container mx-auto p-6'>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">{title}</h1>
        <div className={`text-xl font-semibold px-4 py-2 rounded-lg ${timeLeft < 60 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          Time Left: {formatTime(timeLeft)}
        </div>
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
            className={`px-6 py-3 rounded-lg text-white font-semibold transition 
              ${quizEnded ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
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
