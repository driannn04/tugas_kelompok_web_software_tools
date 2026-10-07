import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { ToastContainer } from "./components/Toast";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import { AnimatePresence } from "framer-motion";

function AppRoutes() {
  const { currentUser } = useAuth();
  const location = useLocation();
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={!currentUser ? <LoginPage /> : <Navigate to="/" replace />} />
          <Route path="/register" element={!currentUser ? <RegisterPage /> : <Navigate to="/" replace />} />
          <Route path="/" element={<ProtectedRoute><HomePage currentUser={currentUser} /></ProtectedRoute>} />
          <Route path="/quiz/:category" element={<ProtectedRoute><QuizPage currentUser={currentUser} /></ProtectedRoute>} />
          <Route path="/result" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage currentUser={currentUser} /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}