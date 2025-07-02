import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { buttonStyles } from '../../../utils/styles';
import { postResult } from '../../../utils/apiCalls';

const QuizResult = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();
  const [resultSaved, setResultSaved] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { quizId, title, timeLimit, questions, selectedAnswers, creatorName } = location.state || {};

  if (!quizId || !title || !timeLimit || !questions || !selectedAnswers || !creatorName || !Array.isArray(questions)) {
    return <div className="text-red-600 text-center mt-10">Error: Invalid or missing quiz data.</div>;
  }

  const totalQuestions = questions.length;
  let correctCount = 0;

  questions.forEach((q, i) => {
    if (selectedAnswers[i] === q.correctAnswerIndex) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / totalQuestions) * 100);

  useEffect(() => {
    const saveResult = async () => {
      if (resultSaved) return;

      setLoading(true);
      setError(null);

      // Build answers array to match backend schema
      const answersPayload = questions.map((question, idx) => ({
        questionId: question._id || question.id,
        selectedOptionIndex: selectedAnswers[idx],
        isCorrect: selectedAnswers[idx] === question.correctAnswerIndex
      }));

      const resultData = {
        user: user.id,
        quiz: quizId,
        score: correctCount,
        correctAnswers: correctCount,
        totalQuestions,
        answers: answersPayload
      };
      console.table(resultData);

      try {
        await postResult(resultData);
        setResultSaved(true);
      } catch (err) {
        console.error('Error saving quiz result:', err);
        setError('Failed to save result. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    saveResult();
  }, [user._id, quizId, correctCount, totalQuestions, resultSaved, questions, selectedAnswers]);

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-xl md:text-3xl font-bold text-indigo-700 mb-2">{title} - Result</h1>
        <p className="text-gray-600">
          Created by: <span className="font-semibold text-indigo-800">{creatorName}</span>
        </p>
        <p className="text-md md:text-lg text-gray-600">Time Limit: {timeLimit} minute(s)</p>
        <p className="text-md md:text-lg text-gray-600">
          User: <span className="font-semibold text-rose-800">{user.username}</span>
        </p>
        <p className="text-lg md:text-xl mt-4 font-semibold">
          Score: <span className="text-indigo-600">{correctCount} / {totalQuestions}</span> (
          <span className={`${percentage >= 60 ? 'text-green-600' : 'text-red-600'}`}>{percentage}%</span>)
        </p>
      </div>

      {loading && (
        <div className="text-center text-blue-600 mb-4">Saving your result...</div>
      )}
      {error && (
        <div className="text-center text-red-600 mb-4">{error}</div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">Question Review</h2>
        {questions.map((question, index) => {
          const userAnswer = selectedAnswers[index];
          const isCorrect = userAnswer === question.correctAnswerIndex;

          return (
            <div key={index} className="mb-6 border-b pb-4">
              <h3 className="font-semibold text-md md:text-lg text-indigo-700 mb-1">
                Q{index + 1}: {question.text}
              </h3>
              <ul className="space-y-2 mt-2">
                {question.options.map((option, optIndex) => {
                  const isUserChoice = userAnswer === optIndex;
                  const isRightAnswer = question.correctAnswerIndex === optIndex;

                  let bgColor = 'bg-white';
                  if (isRightAnswer) bgColor = 'bg-green-100 text-green-800 font-semibold';
                  if (isUserChoice && !isCorrect) bgColor = 'bg-red-100 text-red-800 font-semibold';

                  return (
                    <li
                      key={optIndex}
                      className={`p-3 rounded border ${bgColor} ${isUserChoice ? 'border-indigo-400' : 'border-gray-300'}`}
                    >
                      {option}
                      {isRightAnswer && <span className="ml-2 text-green-600">✅</span>}
                      {isUserChoice && !isCorrect && <span className="ml-2 text-red-600">❌</span>}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
        <div className="mt-6 text-center">
          <p className="text-lg text-gray-600 mb-4">Thank you for participating!</p>
          <Link className={buttonStyles} to={`/user/quiz`}>Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;