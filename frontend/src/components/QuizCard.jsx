import React from "react";
import { Link } from "react-router-dom";

const QuizCard = ({ quiz }) => (
  <div>
    <h3>{quiz.title}</h3>
    <p>{quiz.description}</p>
    <Link to={`/quiz/${quiz._id}`}>View Quiz</Link>
  </div>
);

export default QuizCard;
