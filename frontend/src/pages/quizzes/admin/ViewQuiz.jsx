import { useEffect, useState } from 'react';
import { getAllQuizzes, deleteQuiz, getQuizById, updateQuiz } from '../../../utils/apiCalls';
import { useNavigate, Link } from 'react-router-dom';

const ViewQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  const fetchQuizzes = async () => {
    const data = await getAllQuizzes();
    setQuizzes(data);
  };

  useEffect(() => {
    fetchQuizzes();
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
      fetchQuizzes()
    } catch (error) {
      console.log('Failed to toggle status');
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">All Quizzes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="bg-white p-5 shadow rounded-lg space-y-2 border">
            <h3 className="text-xl font-semibold">{quiz.title}</h3>
            <p className="text-gray-700">{quiz.description}</p>
            <p><span className="font-semibold">Questions:</span> {quiz.questions.length}</p>
            <p><span className="font-semibold">Time Limit:</span> {quiz.timeLimit} min</p>
            <p className={`font-semibold ${quiz.active ? 'text-green-600' : 'text-red-600'}`}>
              {quiz.active ? 'Active' : 'Inactive'}
            </p>
            <div className="flex flex-wrap gap-3 mt-3">
              <button
                className="px-4 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
                onClick={() => navigate(`update/${quiz._id}`)}
              >
                Edit
              </button>
              <button
                className="px-4 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                onClick={() => handleDelete(quiz._id)}
              >
                Delete
              </button>
              <button
                className="px-4 py-1 text-white bg-purple-500 rounded hover:bg-purple-600"
                onClick={() => handleToggle(quiz._id)}
              >
                Toggle Status
              </button>
              <button
                className="px-4 py-1 text-white bg-emerald-500 rounded hover:bg-emerald-600"
                onClick={() => navigate(`${quiz._id}/add-question`)}
              >
                Add Question
              </button>
              <Link
                to={`${quiz._id}/view-questions`}
                className="px-4 py-1 text-white bg-amber-500 rounded hover:bg-amber-600"
                state={{ title: quiz.title, decription: quiz.description, time: quiz.timeLimit }}
              >
                View Questions
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewQuiz;
