import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddExamPage() {
  const navigate = useNavigate();
  const [examData, setExamData] = useState({
    title: '',
    questions: [{ text: '', options: ['', '', ''], correctOption: 0 }]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddQuestion = () => {
    setExamData({
      ...examData,
      questions: [
        ...examData.questions,
        { text: '', options: ['', '', ''], correctOption: 0 }
      ]
    });
  };

  const handleRemoveQuestion = (index) => {
    if (examData.questions.length <= 1) return;
    const updatedQuestions = examData.questions.filter((_, i) => i !== index);
    setExamData({ ...examData, questions: updatedQuestions });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...examData.questions];
    updatedQuestions[index][field] = field === 'correctOption' ? Number(value) : value;
    setExamData({ ...examData, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...examData.questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setExamData({ ...examData, questions: updatedQuestions });
  };

  const handleAddOption = (qIndex) => {
    const updatedQuestions = [...examData.questions];
    updatedQuestions[qIndex].options.push('');
    setExamData({ ...examData, questions: updatedQuestions });
  };

  const handleRemoveOption = (qIndex, oIndex) => {
    const updatedQuestions = [...examData.questions];
    updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.filter((_, i) => i !== oIndex);
    
    if (updatedQuestions[qIndex].correctOption >= updatedQuestions[qIndex].options.length) {
      updatedQuestions[qIndex].correctOption = 0;
    }
    
    setExamData({ ...examData, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      // Validate at least one option per question
      for (const question of examData.questions) {
        if (question.options.some(opt => !opt.trim())) {
          throw new Error('All options must be filled');
        }
        if (!question.text.trim()) {
          throw new Error('All questions must have text');
        }
      }

      const response = await axios.post('http://localhost:5000/api/exams', examData);
      
      // Changed: Just show success message without redirect
      setSuccessMessage(`"${response.data.title}" created successfully!`);
      
    } catch (err) {
      setErrorMessage(err.response?.data?.message || err.message || 'Failed to create exam');
      console.error('Exam creation error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Exam</h1>
      
      {/* Success/Error messages */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Exam Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Exam Title *</label>
          <input
            type="text"
            value={examData.title}
            onChange={(e) => setExamData({ ...examData, title: e.target.value })}
            className="w-full p-2 border rounded"
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Questions List */}
        {examData.questions.map((question, qIndex) => (
          <div key={qIndex} className="border p-4 rounded-lg bg-white shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Question {qIndex + 1} *</h3>
              {examData.questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(qIndex)}
                  className="text-red-500 hover:text-red-700 text-sm"
                  disabled={isSubmitting}
                >
                  Remove Question
                </button>
              )}
            </div>

            {/* Question Text */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Question Text *</label>
              <input
                type="text"
                value={question.text}
                onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                className="w-full p-2 border rounded"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Options */}
            <div className="space-y-3">
              <label className="block text-sm font-medium">Options *</label>
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`correctOption-${qIndex}`}
                    checked={question.correctOption === oIndex}
                    onChange={() => handleQuestionChange(qIndex, 'correctOption', oIndex)}
                    className="h-4 w-4"
                    disabled={isSubmitting}
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    className="flex-1 p-2 border rounded"
                    required
                    disabled={isSubmitting}
                  />
                  {question.options.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(qIndex, oIndex)}
                      className="text-red-500 hover:text-red-700 p-1"
                      disabled={isSubmitting}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              
              {/* Add Option Button */}
              {question.options.length < 5 && (
                <button
                  type="button"
                  onClick={() => handleAddOption(qIndex)}
                  className="text-sm text-blue-500 hover:text-blue-700 mt-2 flex items-center"
                  disabled={isSubmitting}
                >
                  <span className="mr-1">+</span> Add Option
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-2">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
            disabled={isSubmitting || examData.questions.length >= 10}
          >
            Add Question (Max: 10)
          </button>
          
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 disabled:bg-green-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : 'Save Exam'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/exams')}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}