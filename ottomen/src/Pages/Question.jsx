export default function Question({ question, questionNumber, selectedOption, onAnswer }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h3 className="font-medium text-gray-800 mb-3">
        {questionNumber}. {question.text}
      </h3>
      
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              id={`q${questionNumber}-opt${index}`}
              name={`q${questionNumber}`}
              checked={selectedOption === index}
              onChange={() => onAnswer(index)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor={`q${questionNumber}-opt${index}`}
              className="ml-2 text-gray-700"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}