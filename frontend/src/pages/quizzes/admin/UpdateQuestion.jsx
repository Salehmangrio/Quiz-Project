import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { updateQuestionInQuiz, getQuestionById } from '../../../utils/apiCalls';

const UpdateQuestion = () => {
  const { quizId } = useParams();
  const { id } = useLocation().state;

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const data = await getQuestionById(quizId, id);
        setQuestion(data);
      } catch (err) {
        setError('Failed to load question.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestion();
  }, [quizId, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...question.options];
    newOptions[index] = value;
    setQuestion((prev) => ({ ...prev, options: newOptions }));
  };

  const handleAddOption = () => {
    setQuestion((prev) => ({ ...prev, options: [...prev.options, ''] }));
  };

  const handleDeleteOption = (index) => {
    const newOptions = question.options.filter((_, i) => i !== index);
    let correctIndex = question.correctAnswerIndex;

    // Adjust correctAnswerIndex if needed
    if (index < correctIndex) correctIndex--;
    else if (index === correctIndex) correctIndex = 0;

    setQuestion((prev) => ({
      ...prev,
      options: newOptions,
      correctAnswerIndex: correctIndex,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const updatedQuestion = {
        text: question.text,
        subject: question.subject,
        options: question.options,
        correctAnswerIndex: parseInt(question.correctAnswerIndex),
      };

      await updateQuestionInQuiz(quizId, id, updatedQuestion);
      setMessage('✅ Question updated successfully!');
    } catch (err) {
      console.error(err);
      setError('❌ Failed to update question.');
    }
  };

  if (loading) return <p>Loading question...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Update Question</h2>

      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Question Text</label>
          <input
            type="text"
            name="text"
            value={question.text}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input
            type="text"
            name="subject"
            value={question.subject}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Options</label>
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                name={`option-${index}`}
                required
                className="flex-grow p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => handleDeleteOption(index)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddOption}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            + Add Option
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Correct Answer Index</label>
          <input
            type="number"
            name="correctAnswerIndex"
            value={question.correctAnswerIndex}
            min="0"
            max={question.options.length - 1}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ✅ Update Question
        </button>
      </form>
    </div>
  );
};

export default UpdateQuestion;
