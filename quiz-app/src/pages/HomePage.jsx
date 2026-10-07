import { useNavigate } from "react-router-dom";
import { categoryInfo } from "../data/questions";
import { motion } from "framer-motion";
import "./HomePage.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function HomePage({ currentUser }) {
  const navigate = useNavigate();
  const username = currentUser?.username || "Pengguna";

  return (
    <motion.div
      className="home-wrapper"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="home-hero" variants={cardVariants}>
        <div className="hero-badge">Quiz Interaktif</div>
        <h1>Halo, <span className="highlight">{username}</span>!</h1>
        <p>Pilih kategori kuis yang ingin kamu mainkan dan raih skor tertinggi!</p>
      </motion.div>
      <div className="categories-grid">
        {Object.entries(categoryInfo).map(([key, cat], i) => (
          <motion.button
            key={key}
            className="category-card"
            onClick={() => navigate("/quiz/" + key)}
            style={{ "--accent": cat.color }}
            variants={cardVariants}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="cat-emoji">{cat.emoji}</div>
            <div className="cat-info">
              <h3>{cat.label}</h3>
              <p>{cat.description}</p>
              <span className="cat-count">10 Soal - 15 Detik/Soal</span>
            </div>
            <div className="cat-arrow">→</div>
          </motion.button>
        ))}
      </div>
      <motion.div className="home-stats" variants={cardVariants}>
        <div className="stat-card"><span className="stat-icon">🎮</span><div><div className="stat-value">30</div><div className="stat-label">Total Soal</div></div></div>
        <div className="stat-card"><span className="stat-icon">📚</span><div><div className="stat-value">3</div><div className="stat-label">Kategori</div></div></div>
        <div className="stat-card"><span className="stat-icon">🏆</span><div><div className="stat-value">Top 10</div><div className="stat-label">Leaderboard</div></div></div>
      </motion.div>
    </motion.div>
  );
}