import { useNavigate } from "react-router-dom";
import { categoryInfo } from "../data/questions";
import "./HomePage.css";

export default function HomePage({ currentUser }) {
  const navigate = useNavigate();
  const username = currentUser?.username || "Pengguna";

  return (
    <div className="home-wrapper">
      <div className="home-hero">
        <div className="hero-badge">Quiz Interaktif</div>
        <h1>Halo, <span className="highlight">{username}</span>!</h1>
        <p>Pilih kategori kuis yang ingin kamu mainkan dan raih skor tertinggi!</p>
      </div>
      <div className="categories-grid">
        {Object.entries(categoryInfo).map(([key, cat]) => (
          <button key={key} className="category-card" onClick={() => navigate("/quiz/" + key)} style={{ "--accent": cat.color }}>
            <div className="cat-emoji">{cat.emoji}</div>
            <div className="cat-info">
              <h3>{cat.label}</h3>
              <p>{cat.description}</p>
              <span className="cat-count">10 Soal - 15 Detik/Soal</span>
            </div>
            <div className="cat-arrow">→</div>
          </button>
        ))}
      </div>
      <div className="home-stats">
        <div className="stat-card"><span className="stat-icon">🎮</span><div><div className="stat-value">30</div><div className="stat-label">Total Soal</div></div></div>
        <div className="stat-card"><span className="stat-icon">⚡</span><div><div className="stat-value">3</div><div className="stat-label">Kategori</div></div></div>
        <div className="stat-card"><span className="stat-icon">🏆</span><div><div className="stat-value">Top 10</div><div className="stat-label">Leaderboard</div></div></div>
      </div>
    </div>
  );
}