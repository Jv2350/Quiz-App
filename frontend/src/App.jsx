import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuizDetail from "./pages/QuizDetail";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import Navbar from "./components/Navbar";
import AddQuiz from "./pages/AddQuiz";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:id" element={<QuizDetail />} />
        <Route path="/quiz/:id/start" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/add-quiz" element={<AddQuiz />} />
      </Routes>
    </Router>
  );
};

export default App;
