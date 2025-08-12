import { useEffect, useState } from "react";
import api from "../api/api";

export default function UserDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const token = localStorage.getItem("token");

  const fetchQuizzes = async () => {
    const { data } = await api.get("/quizzes", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setQuizzes(data);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleAnswerChange = (qIndex, value) => {
    setAnswers({ ...answers, [qIndex]: Number(value) });
  };

  const handleSubmit = () => {
    let correctCount = 0;
    selectedQuiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) correctCount++;
    });
    setScore(`${correctCount} / ${selectedQuiz.questions.length}`);
  };

  if (selectedQuiz) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">{selectedQuiz.title}</h1>
        {selectedQuiz.questions.map((q, qi) => (
          <div key={qi} className="mb-4 border p-4 rounded">
            <p className="font-semibold mb-2">
              {qi + 1}. {q.question}
            </p>
            {q.options.map((opt, oi) => (
              <label key={oi} className="block">
                <input
                  type="radio"
                  name={`q-${qi}`}
                  value={oi}
                  checked={answers[qi] === oi}
                  onChange={(e) => handleAnswerChange(qi, e.target.value)}
                />
                <span className="ml-2">{opt}</span>
              </label>
            ))}
          </div>
        ))}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
        {score && <p className="mt-4 font-bold">Your Score: {score}</p>}
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
          onClick={() => {
            setSelectedQuiz(null);
            setAnswers({});
            setScore(null);
          }}
        >
          Back to Quizzes
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Quizzes</h1>
      {quizzes.map((quiz) => (
        <div
          key={quiz._id}
          className="border p-4 rounded mb-2 flex justify-between"
        >
          <div>
            <h3 className="font-semibold">{quiz.title}</h3>
            <p>{quiz.questions.length} Questions</p>
          </div>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded"
            onClick={() => setSelectedQuiz(quiz)}
          >
            Attempt
          </button>
        </div>
      ))}
    </div>
  );
}
