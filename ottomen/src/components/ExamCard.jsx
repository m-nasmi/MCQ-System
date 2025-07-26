export default function ExamCard({ 
  exam, 
  onView, 
  onEdit, 
  onDelete, 
  isDeleting 
}) {
  const handleView = (e) => {
    e.stopPropagation();
    onView?.();
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit?.();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete?.();
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {exam.title}
          </h3>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {exam.questions?.length || 0} questions
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={handleView}
            className="flex-1 bg-blue-50 text-blue-600 py-1 px-3 rounded hover:bg-blue-100 transition-colors text-sm"
          >
            View
          </button>
          
          <button
            onClick={handleEdit}
            className="flex-1 bg-gray-50 text-gray-600 py-1 px-3 rounded hover:bg-gray-100 transition-colors text-sm"
          >
            Edit
          </button>
          
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 bg-red-50 text-red-600 py-1 px-3 rounded hover:bg-red-100 transition-colors text-sm disabled:opacity-50"
          >
            {isDeleting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Deleting...
              </span>
            ) : 'Delete'}
          </button>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3 text-xs text-gray-500 border-t border-gray-100">
        Created: {new Date(exam.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}