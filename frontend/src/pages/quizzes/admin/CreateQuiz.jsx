import { useState } from 'react';
import { createQuiz } from '../../../utils/apiCalls';
import { useNavigate } from 'react-router-dom';
import { buttonStyles } from '../../../utils/styles';

const CreateQuiz = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    timeLimit: 5,
    active: false
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user?.id) throw new Error('User not logged in');
      const quizData = { ...formData, creator: user.id };
      await createQuiz(quizData);
      setSuccessMsg('✅ Quiz created successfully!');
      setFormData({ title: '', description: '', timeLimit: 5, active: false });
      setTimeout(() => navigate('/admin/quiz'), 300);
    } catch (error) {
      setErrorMsg('❌ Failed to create quiz. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl transition-all duration-300 ease-in-out hover:shadow-2xl">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">Create a New Quiz</h2>

      {successMsg && <div className="text-green-600 text-center mb-4 font-medium">{successMsg}</div>}
      {errorMsg && <div className="text-red-600 text-center mb-4 font-medium">{errorMsg}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Quiz Title"
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Quiz Description"
          rows={4}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="number"
          name="timeLimit"
          value={formData.timeLimit}
          onChange={handleChange}
          min={2}
          placeholder="Time Limit (minutes)"
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleChange}
            className="accent-blue-600"
          />
          <span className="text-sm font-medium text-gray-700">Activate this quiz</span>
        </label>

        <button
          type="submit"
          className={buttonStyles}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Quiz'}
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;
