import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import QuestionCard from "../components/QuestionCard";

const QuizPage = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeTaken, setTimeTaken] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await api.get(`/quizzes/${id}`);
      setQuiz(res.data.data);
    };
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => setTimeTaken((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSelect = (questionId, selectedOption) => {
    setAnswers((prev) =>
      prev
        .map((ans) =>
          ans.questionId === questionId ? { ...ans, selectedOption } : ans
        )
        .concat(
          !prev.some((ans) => ans.questionId === questionId)
            ? [{ questionId, selectedOption }]
            : []
        )
    );
  };

  const handleSubmit = async () => {
    const res = await api.post("/attempt", {
      quizId: id,
      userName: "Anonymous",
      answers,
      timeTaken,
    });
    navigate("/result", { state: res.data });
  };
  console.log("Time Taken:", timeTaken);
  if (!quiz) return <p>Loading...........</p>;

  return (
    <div>
      <h2>{quiz.title}</h2>
      <p>Time taken:{timeTaken} seconds</p>
      {quiz.questions.map((q) => (
        <QuestionCard key={q._id} question={q} onSelect={handleSelect} />
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default QuizPage;
