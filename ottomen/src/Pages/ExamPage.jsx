import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Question from '../components/Question';

export default function ExamPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if ID exists
        // if (!id) {
        //   throw new Error('No exam ID provided');
        // }

        const response = await axios.get(`http://localhost:5000/api/exams/${id}`);
        
        if (!response.data) {
          throw new Error('Exam not found');
        }

        setExam(response.data);
        setAnswers(new Array(response.data.questions.length).fill(null));
      } catch (err) {
        setError(err.response?.data?.error || err.message || 'Failed to load exam');
        console.error('Exam fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [id]);

  const handleSubmit = async () => {
    // Validate all questions are answered
    if (answers.some(answer => answer === null)) {
      setError('Please answer all questions before submitting');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/submit', {
        examId: id,
        answers
      });

      navigate(`/result/${response.data.score}/${response.data.total}`, {
        state: {
          totalQuestions: response.data.total,
          examTitle: exam.title
        }
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Submission failed. Please try again.');
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <h3 className="font-medium text-red-700">Error</h3>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => navigate('/exams')}
            className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
          >
            Back to Exams
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">{exam.title}</h1>
          <p className="text-gray-600 mt-1">
            {exam.questions.length} {exam.questions.length === 1 ? 'question' : 'questions'}
          </p>
        </div>

        <div className="p-6 space-y-6">
          {exam.questions.map((question, index) => (
            <Question
              key={index}
              question={question}
              questionNumber={index + 1}
              selectedOption={answers[index]}
              onAnswer={(selectedOption) => {
                const newAnswers = [...answers];
                newAnswers[index] = selectedOption;
                setAnswers(newAnswers);
              }}
            />
          ))}
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-lg text-white font-medium ${
              isSubmitting ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
            } transition-colors`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Answers'
            )}
          </button>
          
          {error && (
            <p className="mt-3 text-red-500 text-sm text-center">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}