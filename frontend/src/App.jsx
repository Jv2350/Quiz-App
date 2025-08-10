import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import QuizDetail from "./pages/QuizDetail";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import Navbar from "./components/Navbar";
import AddQuiz from "./pages/AddQuiz";
import EditQuiz from "./pages/EditQuiz";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminPanel from "./pages/AdminPanel";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/quiz/:id" element={<QuizDetail />} />
        <Route path="/quiz/:id/start" element={
          <PrivateRoute>
            <QuizPage />
          </PrivateRoute>
        } />
        <Route path="/result" element={
          <PrivateRoute>
            <ResultPage />
          </PrivateRoute>
        } />
        <Route path="/add-quiz" element={
          <AdminRoute>
            <AddQuiz />
          </AdminRoute>
        } />
        <Route path="/admin" element={
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        } />
        <Route path="/edit-quiz/:id" element={
          <AdminRoute>
            <EditQuiz />
          </AdminRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
