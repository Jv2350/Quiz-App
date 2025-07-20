import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>No result data.</p>;
  return (
    <div>
      <h2>Quiz Result</h2>
      <p>
        Score: {state.data.score}/{state.data.total}
      </p>
      <p>Time Taken: {state.data.timeTaken} seconds</p>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default ResultPage;
