import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ExamList() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:5000/api/exams");
      setExams(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load exams");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExam = async (examId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this exam? All related data will be permanently removed."
      )
    ) {
      return;
    }

    try {
      setDeletingId(examId);
      await axios.delete(`http://localhost:5000/api/exams/${examId}`);
      setExams(exams.filter((exam) => exam._id !== examId));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to delete exam. Please try again."
      );
      console.error("Error deleting exam:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredExams = exams.filter((exam) =>
    exam.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <p className="text-red-700">{error}</p>
        <button
          onClick={fetchExams}
          className="mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Exams</h1>
          <p className="text-gray-600 text-sm">
            Showing {filteredExams.length} of {exams.length} exams
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search exams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
            />
            <svg
              className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <button
            onClick={() => navigate("/exams/add")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            New Exam
          </button>
        </div>
      </div>

      {filteredExams.map((exam) => (
        <div
          key={exam._id}
          className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors shadow-sm overflow-hidden"
        >
          <div className="p-5">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-gray-800 line-clamp-2">
                {exam.title}
              </h3>
              <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full whitespace-nowrap ml-2">
                {exam.questions?.length || 0} Qs
              </span>
            </div>

            <Link
              to={`/exampage/${exam._id}`}
              className="block mt-3 w-full bg-green-500 hover:bg-green-600 text-white py-1.5 px-3 rounded text-sm text-center transition-colors"
            >
              Start Exam
            </Link>

            <button
              onClick={() => handleDeleteExam(exam._id)}
              disabled={deletingId === exam._id}
              className="mt-2 w-full bg-red-50 hover:bg-red-100 text-red-600 py-1.5 px-3 rounded text-sm transition-colors disabled:opacity-50"
            >
              {deletingId === exam._id ? "Deleting..." : "Delete Exam"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}