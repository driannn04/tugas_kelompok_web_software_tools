import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// TODO: Orang 2 (feature/quiz) akan tambahkan import berikut setelah merge:
// import HomePage from "./pages/HomePage";
// import QuizPage from "./pages/QuizPage";
// import ResultPage from "./pages/ResultPage";
// import LeaderboardPage from "./pages/LeaderboardPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Routes quiz akan ditambahkan Orang 2 via feature/quiz */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}