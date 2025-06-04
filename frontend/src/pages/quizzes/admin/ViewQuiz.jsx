import { useEffect, useState } from 'react';
import ViewDate from '../../../components/ViewDate';
import StyledLink from '../../../components/StyledLink';
import {
  deleteQuiz,
  getQuizById,
  updateQuiz,
  getQuizzesByUser
} from '../../../utils/apiCalls';
import { buttonStyles } from '../../../utils/styles';

const ViewQuiz = () => {
  const userId = JSON.parse(localStorage.getItem('user')).id;

  const [quizzes, setQuizzes] = useState([]);
  const fetchQuizzes = async (userId) => {
    const data = await getQuizzesByUser(userId);
    setQuizzes(data);
  };

  useEffect(() => {
    fetchQuizzes(userId);
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this quiz?')) {
      await deleteQuiz(id);
      fetchQuizzes();
    }
  };

  const handleToggle = async (id) => {
    try {
      const data = await getQuizById(id)
      await updateQuiz(data._id, { ...data, active: !data.active });
      fetchQuizzes(userId)
    } catch (error) {
      console.log('Failed to toggle status');
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">All Quizzes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {
          quizzes.length > 0 ?
            quizzes.map((quiz) => (
              <div key={quiz._id} className="bg-white p-5 shadow-md  rounded-lg space-y-2 border select-none">
                <h3 className="text-xl font-semibold capitalize text-rose-600">{quiz.title}</h3>
                <p className="text-gray-700">{quiz.description}</p>
                <p><span className="font-semibold">Questions:</span> {quiz.questions.length}</p>
                <p><span className="font-semibold">Time Limit:</span> {quiz.timeLimit} min</p>
                <p className={`font-semibold ${quiz.active ? 'text-green-600' : 'text-red-600'}`}>
                  {quiz.active ? 'Active' : 'Inactive'}
                </p>
                <div className="flex justify-center items-center gap-3 mt-3 text-center">
                  <StyledLink to={`update/${quiz._id}`} text={'Edit'} />
                  <button
                    className="w-[250px] py-1 text-white bg-red-500 rounded-xl hover:bg-red-600"
                    onClick={() => handleDelete(quiz._id)}
                  >
                    Delete
                  </button>
                  <button
                    className={buttonStyles}
                    onClick={() => handleToggle(quiz._id)}
                  >
                    {quiz.active ? 'Deactivate' : 'Activate'}
                  </button>

                </div>

                <div className="flex justify-center items-center gap-3 mt-3 text-center">
                  <StyledLink to={`${quiz._id}/add-question`} quiz={quiz} text={'AddQuestion'} />
                  <StyledLink to={`${quiz._id}/view-questions`} quiz={quiz} text={'ViewQuestion'} />
                </div>
                <div className='flex justify-between items-center py-2 px-1'>
                  <ViewDate title="Created on" date={quiz.createdAt} />
                  <ViewDate title="Last updated" date={quiz.updatedAt} />
                </div>
              </div>
            ))
            :
            <div className="col-span-1 md:col-span-2 bg-white p-5 shadow-md rounded-lg">
              <p className="text-center text-gray-700">No quizzes found.</p>
            </div>
        }
      </div>
    </div>
  );
};

export default ViewQuiz;
