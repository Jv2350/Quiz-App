const QuestionCard = ({ question, onSelect }) => (
  <div>
    <h4>{question.questionText}</h4>
    {question.options.map((opt, idx) => (
      <div key={idx}>
        <input
          type="radio"
          name={question._id}
          value={idx}
          onChange={() => onSelect(question._id, idx)}
        />
        {opt}
      </div>
    ))}
  </div>
);
export default QuestionCard;
