import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Trophy, LogOut, Gamepad2 } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Gamepad2 size={22} color="#818cf8" />
        <Link to="/" className="navbar-title">QuizMaster</Link>
      </div>
      {currentUser && (
        <div className="navbar-right">
          <Link to="/leaderboard" className="nav-link">
            <Trophy size={16} />
            Leaderboard
          </Link>
          <div className="user-badge">
            <div className="user-avatar">{currentUser.username[0].toUpperCase()}</div>
            <span className="user-name">{currentUser.username}</span>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            <LogOut size={15} />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}