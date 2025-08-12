import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useParams, useNavigate } from "react-router-dom";

export default function QuizDetail() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const nav = useNavigate();

  useEffect(()=> {
    api.get(`/quizzes/${id}`).then(res => setQuiz(res.data));
  }, [id]);

  if (!quiz) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>
      <p>{quiz.questions.length} questions</p>
      <button onClick={() => nav(`/quiz/${id}/start`)}>Start Quiz</button>
    </div>
  );
}
