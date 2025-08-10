import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const AddQuiz = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctOption: 0 },
  ]);
  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    if (field === "questionText") updated[index][field] = value;
    else updated[index].options[field] = value;
    setQuestions(updated);
  };

  const handleCorrectOptionChange = (index, value) => {
    const updated = [...questions];
    updated[index].correctOption = parseInt(value);
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctOption: 0 },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/quizzes", { title, description, questions });
    navigate("/");
  };
  return (
    <div>
      <h2>Create new Quiz</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Quiz Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {questions.map((q, idx) => (
          <div key={idx}>
            <input
              type="text"
              placeholder={`Question ${idx + 1}`}
              value={q.questionText}
              onChange={(e) =>
                handleQuestionChange(idx, "questionText", e.target.value)
              }
              required
            />
            {q.questions.map((opt, oIdx) => (
              <input
                key={oIdx}
                type="text"
                placeholder={`Option ${oIdx + 1}`}
                value={opt}
                onChange={(e) =>
                  handleQuestionChange(idx, oIdx, e.target.value)
                }
                required
              />
            ))}
            <select
              value={q.correctOption}
              onChange={(e) => handleCorrectOptionChange(idx, e.target.value)}
            >
              <option value="0">Option 1</option>
              <option value="1">Option 2</option>
              <option value="2">Option 3</option>
              <option value="3">Option 4</option>
            </select>
          </div>
        ))}
        <button type="button" onClick={addQuestion}>
          Add Another Question
        </button>
        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
};

export default AddQuiz;
