import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addQuestionToQuiz } from '../../../utils/apiCalls';

const AddQuestion = () => {
  const { quizId } = useParams();

  const [text, setText] = useState('');
  const [subject, setSubject] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
  const [message, setMessage] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, '']);

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (correctAnswerIndex < 0 || correctAnswerIndex >= options.length) {
      setMessage('Correct answer index is out of range.');
      return;
    }

    const questionData = {
      text,
      subject,
      options,
      correctAnswerIndex: Number(correctAnswerIndex),
      quiz: quizId,
    };

    try {
      console.table(questionData);
      await addQuestionToQuiz(quizId, questionData);
      setMessage('✅ Question added successfully!');
      // Reset form
      setText('');
      setSubject('');
      setOptions(['', '']);
      setCorrectAnswerIndex(0);
    } catch (error) {
      setMessage('❌ Error adding question');
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 shadow-md bg-white rounded-md">
      <h2 className="text-xl font-bold mb-4">Add New Question</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Question Text</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Subject</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Options</label>
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                className="flex-1 border px-3 py-2 rounded"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
              />
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addOption} className="text-blue-600 hover:underline">
            + Add Option
          </button>
        </div>

        <div>
          <label className="block font-medium">Correct Answer Index</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={correctAnswerIndex}
            onChange={(e) => setCorrectAnswerIndex(Number(e.target.value))}
            min="0"
            max={options.length - 1}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Question
        </button>

        {message && (
          <p className={`${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'} mt-2`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default AddQuestion;
