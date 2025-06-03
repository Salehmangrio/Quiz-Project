import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizById, updateQuiz } from '../../../utils/apiCalls';

const UpdateQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    timeLimit: 5,
    active: false,
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const data = await getQuizById(id);
        setQuiz({
          title: data.title || '',
          description: data.description || '',
          timeLimit: data.timeLimit || 5,
          active: data.active || false,
        });
      } catch (err) {
        setError('Failed to load quiz.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setQuiz(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    setError('');
    try {
      await updateQuiz(id, quiz);
      setMsg('✅ Quiz updated successfully!');
      setTimeout(() => navigate('/admin/quiz'), 1500);
    } catch (err) {
      setError('❌ Failed to update quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !quiz.title) {
    return <div className="text-center mt-10 text-gray-600">Loading quiz details...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-semibold mb-6 text-center text-yellow-600">Update Quiz</h2>

      {msg && <div className="mb-4 text-green-600 font-medium text-center">{msg}</div>}
      {error && <div className="mb-4 text-red-600 font-medium text-center">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          value={quiz.title}
          onChange={handleChange}
          placeholder="Quiz Title"
          required
          className="w-full p-3 border-2 border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <textarea
          name="description"
          value={quiz.description}
          onChange={handleChange}
          placeholder="Quiz Description"
          rows={5}
          required
          className="w-full p-3 border-2 border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
        />

        <input
          type="number"
          name="timeLimit"
          value={quiz.timeLimit}
          onChange={handleChange}
          min={2}
          placeholder="Time Limit (minutes)"
          required
          className="w-full p-3 border-2 border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <label className="inline-flex items-center space-x-3">
          <input
            type="checkbox"
            name="active"
            checked={quiz.active}
            onChange={handleChange}
            className="accent-yellow-500 w-5 h-5"
          />
          <span className="text-yellow-700 font-medium select-none">Activate this quiz</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition disabled:opacity-60"
        >
          {loading ? 'Updating...' : 'Update Quiz'}
        </button>
      </form>
    </div>
  );
};

export default UpdateQuiz;
