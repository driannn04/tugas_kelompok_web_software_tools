import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import { Toaster } from "react-hot-toast";
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
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1e1e2e",
              color: "#cdd6f4",
              border: "1px solid #45475a",
              borderRadius: "12px",
              fontSize: "14px",
            },
            success: { iconTheme: { primary: "#a6e3a1", secondary: "#1e1e2e" } },
            error: { iconTheme: { primary: "#f38ba8", secondary: "#1e1e2e" } },
          }}
        />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}