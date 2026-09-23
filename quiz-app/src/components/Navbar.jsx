import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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
        <span className="navbar-logo">🎮</span>
        <Link to="/" className="navbar-title">QuizMaster</Link>
      </div>
      {currentUser && (
        <div className="navbar-right">
          <Link to="/leaderboard" className="nav-link">🏆 Leaderboard</Link>
          <div className="user-badge">
            <div className="user-avatar">{currentUser.username[0].toUpperCase()}</div>
            <span className="user-name">{currentUser.username}</span>
          </div>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      )}
    </nav>
  );
}