import { BrowserRouter, Routes, Route } from "react-router-dom";

// TODO: Import pages setelah masing-masing branch selesai
// Orang 1 (feature/auth)  : AuthContext, Navbar, ProtectedRoute, LoginPage, RegisterPage
// Orang 2 (feature/quiz)  : HomePage, QuizPage, ResultPage, LeaderboardPage

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes akan ditambahkan setelah branch di-merge */}
      </Routes>
    </BrowserRouter>
  );
}
