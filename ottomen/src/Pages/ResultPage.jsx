import { useParams, useNavigate } from 'react-router-dom';

export default function ResultPage() {
  const { score, total } = useParams();
  const navigate = useNavigate();
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 70;

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className={`p-6 text-center ${passed ? 'bg-green-50' : 'bg-red-50'}`}>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Exam Results</h1>
          <div className="text-5xl font-bold mb-2">
            <span className={passed ? 'text-green-600' : 'text-red-600'}>
              {percentage}%
            </span>
          </div>
          <p className="text-lg mb-4">
            You scored <span className="font-bold">{score}</span> out of <span className="font-bold">{total}</span>
          </p>
          <p className={`text-lg font-medium ${passed ? 'text-green-600' : 'text-red-600'}`}>
            {passed ? 'Congratulations! You passed!' : 'Sorry, you did not pass.'}
          </p>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => navigate('/examlist')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Back to Exams
            </button>
            <button
              onClick={() => navigate('/home')}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}