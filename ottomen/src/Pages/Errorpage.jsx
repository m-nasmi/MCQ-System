// ErrorPage.jsx
import { useRouteError, useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
      <p className="text-lg mb-2">Sorry, an unexpected error has occurred.</p>
      <p className="text-gray-500 mb-6">
        {error.statusText || error.message}
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
      >
        Go to Home
      </button>
    </div>
  );
}