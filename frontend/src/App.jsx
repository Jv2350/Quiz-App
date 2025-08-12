import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import QuizDetail from "./pages/QuizDetail";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
<<<<<<< HEAD
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
=======
import Navbar from "./components/Navbar";
import AddQuiz from "./pages/AddQuiz";
import EditQuiz from "./pages/EditQuiz";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminPanel from "./pages/AdminPanel";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
>>>>>>> 7ce973d7002e691fca38ed6f11f346a0a40c3d96

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
<<<<<<< HEAD
        <Route path="/quiz/:id/start" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
=======
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
>>>>>>> 7ce973d7002e691fca38ed6f11f346a0a40c3d96
      </Routes>
    </Router>
  );
}

export default App;
