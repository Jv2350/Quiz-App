import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

export default function Home() {
  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    api.get("/quizzes").then((res) => setQuizzes(res.data));
  }, []);
  return (
    <div style={{ padding: 20 }}>
      <h2>All Quizzes</h2>
      {quizzes.map((q) => (
        <div
          key={q._id}
          style={{ border: "1px solid #eee", padding: 8, marginBottom: 8 }}
        >
          <h3>{q.title}</h3>
          <p>{q.description}</p>
          <Link to={`/quiz/${q._id}`}>View & Attempt</Link>
        </div>
      ))}
    </div>
  );
}
