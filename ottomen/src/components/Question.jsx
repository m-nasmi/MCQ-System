export default function Question({ question, index, onAnswer }) {
  return (
    <div className="mb-6 p-4 border rounded-lg">
      <p className="font-medium mb-2">{index + 1}. {question.text}</p>
      <div className="space-y-2">
        {question.options.map((opt, i) => (
          <div key={i} className="flex items-center">
            <input
              type="radio"
              name={`q${index}`}
              id={`q${index}-o${i}`}
              onChange={() => onAnswer(i)}
              className="mr-2"
            />
            <label htmlFor={`q${index}-o${i}`}>{opt}</label>
          </div>
        ))}
      </div>
    </div>
  )
}