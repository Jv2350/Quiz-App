import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResultPage() {
  const { state } = useLocation();
  const nav = useNavigate();
  if (!state?.result) return <div>No result</div>;

  const { score, total, answers, timeTaken } = state.result;
  return (
    <div style={{ padding: 20 }}>
      <h2>Result</h2>
      <p>
        Score: {score} / {total}
      </p>
      <p>Time: {timeTaken} s</p>

      <h3>Answers</h3>
      {answers.map((a, i) => (
        <div key={i} style={{ marginBottom: 8 }}>
          <div>
            Question #{a.questionIndex + 1} —{" "}
            <strong>{a.correct ? "Correct" : "Wrong"}</strong>
          </div>
          <div>Selected: {a.selectedOption}</div>
        </div>
      ))}

      <button onClick={() => nav("/")}>Back Home</button>
    </div>
  );
}
