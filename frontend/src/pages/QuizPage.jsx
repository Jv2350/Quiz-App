import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useParams, useNavigate } from "react-router-dom";

export default function QuizPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({}); // map questionIndex -> selectedOption
  const [time, setTime] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    api.get(`/quizzes/${id}`).then((res) => setQuiz(res.data));
    const timer = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [id]);

  const select = (qIndex, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };

  const submit = async () => {
    // build answers array
    const payloadAnswers = Object.keys(answers).map((k) => ({
      questionIndex: Number(k),
      selectedOption: answers[k],
    }));
    try {
      const res = await api.post("/attempts", {
        quizId: id,
        userName: "Anonymous",
        answers: payloadAnswers,
        timeTaken: time,
      });
      // send result to result page
      nav("/result", { state: { result: res.data } });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit");
    }
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{quiz.title}</h2>
      <p>Time: {time} s</p>
      {quiz.questions.map((q, qi) => (
        <div key={qi} style={{ marginBottom: 16 }}>
          <p>
            <strong>
              {qi + 1}. {q.questionText}
            </strong>
          </p>
          {q.options.map((opt, oi) => (
            <label key={oi} style={{ display: "block" }}>
              <input
                type="radio"
                name={`q-${qi}`}
                checked={answers[qi] === oi}
                onChange={() => select(qi, oi)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button onClick={submit}>Submit</button>
    </div>
  );
}
