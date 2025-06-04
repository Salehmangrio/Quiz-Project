import React from 'react';
import { getAllQuizzes, getUserById } from '../../../utils/apiCalls';
import ViewDate from '../../../components/ViewDate';
import { Link } from 'react-router-dom';

const ViewQuiz = () => {
  const [quizzes, setQuizzes] = React.useState([]);

  React.useEffect(() => {
    const fetchQuizzes = async () => {
      const data = await getAllQuizzes();
      const quizzesWithCreators = await Promise.all(
        data.map(async (quiz) => {
          const { user } = await getUserById(quiz.creator);
          return { ...quiz, creatorName: user.username };
        })
      );
      setQuizzes(quizzesWithCreators);
    };
    fetchQuizzes();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">All Quizzes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz._id}
            className="border rounded-xl shadow-md p-5 bg-white hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-2xl font-semibold text-indigo-800 mb-2">{quiz.title}</h3>
            <p className="text-gray-700 mb-2">{quiz.description}</p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium text-gray-800">Created by:</span> {quiz.creatorName}
            </p>

            <div className='flex justify-between text-sm text-gray-600 mt-3'>
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                Questions: {quiz.questions.length}
              </span>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                Time: {quiz.timeLimit} mins
              </span>
            </div>

            <div className="mt-3 text-sm">
              <span className={`px-3 py-1 rounded-full font-medium ${quiz.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {quiz.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className='flex justify-between mt-4 text-sm text-gray-600'>
              <ViewDate title={'Created on:'} date={quiz.createdAt} />
              <ViewDate title={'Updated on:'} date={quiz.updatedAt} />
            </div>
            <div className="mt-4">
              <Link
                to={`take`}
                disabled={!quiz.isActive}
                className={`w-full text-center inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 ${!quiz.isActive && 'opacity-50 cursor-not-allowed'}`}
                state={
                  {
                    quizId: quiz._id,
                    title: quiz.title,
                    timeLimit: quiz.timeLimit,
                    questions: quiz.questions,
                    creatorName: quiz.creatorName
                  }
                }
              >
                Take Quiz
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewQuiz;
