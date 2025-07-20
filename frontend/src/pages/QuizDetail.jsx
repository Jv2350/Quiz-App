import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { Link } from "react-router-dom";

const QuizDetail = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await api.get(`/quizzes/${id}`);
      setQuiz(res.data.data);
    };
    fetchQuiz();
  }, [id]);
  if (!quiz) return <p>Loading..........</p>;

  return (
    <div>
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>
      <Link to={`/quiz/${quiz._id}/start`}>Start Quiz</Link>
    </div>
  );
};

export default QuizDetail;
