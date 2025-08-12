import { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: 0 },
  ]);
  const [editingQuiz, setEditingQuiz] = useState(null);

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

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: 0 },
    ]);
  };

  const handleSubmit = async () => {
    const payload = { title, questions };
    if (editingQuiz) {
      await api.put(`/quizzes/${editingQuiz}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await api.post("/quizzes", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    setTitle("");
    setQuestions([
      { question: "", options: ["", "", "", ""], correctAnswer: 0 },
    ]);
    setEditingQuiz(null);
    fetchQuizzes();
  };

  const handleEdit = (quiz) => {
    setTitle(quiz.title);
    setQuestions(quiz.questions);
    setEditingQuiz(quiz._id);
  };

  const handleDelete = async (id) => {
    await api.delete(`/quizzes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchQuizzes();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Admin Dashboard - Manage Quizzes
      </h1>

      {/* Quiz Form */}
      <div className="bg-gray-100 p-4 rounded mb-6">
        <input
          type="text"
          placeholder="Quiz Title"
          className="border p-2 w-full mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {questions.map((q, qi) => (
          <div key={qi} className="mb-4 p-3 border rounded">
            <input
              type="text"
              placeholder={`Question ${qi + 1}`}
              className="border p-2 w-full mb-2"
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(qi, "question", e.target.value)
              }
            />
            {q.options.map((opt, oi) => (
              <input
                key={oi}
                type="text"
                placeholder={`Option ${oi + 1}`}
                className="border p-2 w-full mb-1"
                value={opt}
                onChange={(e) => handleOptionChange(qi, oi, e.target.value)}
              />
            ))}
            <label className="block mt-2">Correct Answer (index):</label>
            <input
              type="number"
              min="0"
              max="3"
              className="border p-2 w-full"
              value={q.correctAnswer}
              onChange={(e) =>
                handleQuestionChange(
                  qi,
                  "correctAnswer",
                  Number(e.target.value)
                )
              }
            />
          </div>
        ))}
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={addQuestion}
        >
          Add Question
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
          onClick={handleSubmit}
        >
          {editingQuiz ? "Update Quiz" : "Create Quiz"}
        </button>
      </div>

      {/* Quiz List */}
      <h2 className="text-xl font-bold mb-2">Existing Quizzes</h2>
      {quizzes.map((quiz) => (
        <div
          key={quiz._id}
          className="border p-4 rounded mb-2 flex justify-between"
        >
          <div>
            <h3 className="font-semibold">{quiz.title}</h3>
            <p>{quiz.questions.length} Questions</p>
          </div>
          <div>
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
              onClick={() => handleEdit(quiz)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => handleDelete(quiz._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
