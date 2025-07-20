import React from "react";
import api from "../api/api";
import { useState, useEffect } from "react";
import QuizCard from "../components/QuizCard";
const Home = () => {
  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    const fetchQuizzes = async () => {
      const res = await api.get("/quizzes");
      setQuizzes(res.data.data);
    };
    fetchQuizzes();
  }, []);

  return (
    <div>
      <h1>Available Quizzes</h1>
      {quizzes.map((quiz) => (
        <QuizCard key={quiz._id} quiz={quiz} />
      ))}
    </div>
  );
};

export default Home;
