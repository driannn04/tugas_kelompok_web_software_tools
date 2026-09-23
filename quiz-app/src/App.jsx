import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import LeaderboardPage from "./pages/LeaderboardPage";

function AppRoutes() {
  const { currentUser } = useAuth();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={!currentUser ? <LoginPage /> : <Navigate to="/" replace />} />
        <Route path="/register" element={!currentUser ? <RegisterPage /> : <Navigate to="/" replace />} />
        <Route path="/" element={<ProtectedRoute><HomePage currentUser={currentUser} /></ProtectedRoute>} />
        <Route path="/quiz/:category" element={<ProtectedRoute><QuizPage currentUser={currentUser} /></ProtectedRoute>} />
        <Route path="/result" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage currentUser={currentUser} /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}