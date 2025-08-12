import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctOption: 0 },
  ]);

  const fetch = async () => {
    const { data } = await api.get("/quizzes");
    setQuizzes(data);
  };

  useEffect(() => {
    fetch();
  }, []);

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { questionText: "", options: ["", "", "", ""], correctOption: 0 },
    ]);
  };

  const updateQuestion = (idx, field, value) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[idx][field] = value;
      return copy;
    });
  };

  const updateOption = (qIdx, oIdx, val) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[qIdx].options[oIdx] = val;
      return copy;
    });
  };

  const startEdit = async (id) => {
    const res = await api.get(`/quizzes/${id}`);
    const quiz = res.data;
    setEditing(id);
    setTitle(quiz.title);
    setDescription(quiz.description || "");
    setQuestions(
      quiz.questions.map((q) => ({
        questionText: q.questionText,
        options: q.options,
        correctOption: q.correctOption,
      }))
    );
  };

  const cancelEdit = () => {
    setEditing(null);
    setTitle("");
    setDescription("");
    setQuestions([
      { questionText: "", options: ["", "", "", ""], correctOption: 0 },
    ]);
  };

  const saveQuiz = async () => {
    const payload = { title, description, questions };
    if (editing) {
      await api.put(`/quizzes/${editing}`, payload);
    } else {
      await api.post("/quizzes", payload);
    }
    cancelEdit();
    fetch();
  };

  const removeQuiz = async (id) => {
    if (!confirm("Delete quiz?")) return;
    await api.delete(`/quizzes/${id}`);
    fetch();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>

      <div style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12 }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <h4>Questions</h4>
        {questions.map((q, qi) => (
          <div
            key={qi}
            style={{ padding: 8, border: "1px dashed #ccc", marginBottom: 8 }}
          >
            <input
              placeholder={`Question ${qi + 1}`}
              value={q.questionText}
              onChange={(e) =>
                updateQuestion(qi, "questionText", e.target.value)
              }
            />
            <br />
            {q.options.map((opt, oi) => (
              <input
                key={oi}
                placeholder={`Option ${oi + 1}`}
                value={opt}
                onChange={(e) => updateOption(qi, oi, e.target.value)}
              />
            ))}
            <div>
              <label>Correct Option Index:</label>
              <input
                type="number"
                min={0}
                max={q.options.length - 1}
                value={q.correctOption}
                onChange={(e) =>
                  updateQuestion(qi, "correctOption", Number(e.target.value))
                }
              />
            </div>
          </div>
        ))}
        <button onClick={addQuestion}>Add question</button>
        <button onClick={saveQuiz}>
          {editing ? "Update Quiz" : "Create Quiz"}
        </button>
        {editing && <button onClick={cancelEdit}>Cancel</button>}
      </div>

      <h3>Existing Quizzes</h3>
      {quizzes.map((q) => (
        <div
          key={q._id}
          style={{ border: "1px solid #eee", padding: 8, marginBottom: 8 }}
        >
          <strong>{q.title}</strong> <span>({q._id})</span>
          <div>
            <button onClick={() => startEdit(q._id)}>Edit</button>
            <button onClick={() => removeQuiz(q._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
