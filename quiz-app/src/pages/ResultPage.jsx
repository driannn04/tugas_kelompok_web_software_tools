import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { categoryInfo } from "../data/questions";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw, Trophy, Home } from "lucide-react";
import clsx from "clsx";
import confetti from "canvas-confetti";
import "./ResultPage.css";

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  if (!state) { navigate("/"); return null; }
  const { answers, category, score } = state;
  const total = answers.length;
  const percent = Math.round((score / total) * 100);
  const catInfo = categoryInfo[category];

  const getGrade = () => {
    if (percent >= 90) return { label: "Luar Biasa!", color: "#f59e0b" };
    if (percent >= 70) return { label: "Bagus!", color: "#10b981" };
    if (percent >= 50) return { label: "Cukup", color: "#6366f1" };
    return { label: "Tetap Semangat!", color: "#ef4444" };
  };
  const grade = getGrade();

  // Confetti saat skor bagus
  useEffect(() => {
    if (percent >= 70) {
      const duration = 2000;
      const end = Date.now() + duration;
      const colors = percent >= 90
        ? ["#f59e0b", "#fbbf24", "#fde68a"]
        : ["#10b981", "#34d399", "#6ee7b7"];

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [percent]);

  return (
    <motion.div
      className="result-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="result-card">
        <div className="result-score-circle" style={{ "--color": grade.color }}>
          <div className="score-inner">
            <span className="score-number">{score}</span>
            <span className="score-total">/{total}</span>
          </div>
        </div>
        <h2 className="grade-label" style={{ color: grade.color }}>{grade.label}</h2>
        <p className="percent-text">{percent}% benar</p>
        <p className="category-label">{catInfo?.emoji} {catInfo?.label}</p>
        <div className="result-actions">
          <button className="btn-play-again" onClick={() => navigate("/quiz/" + category)}>
            <RotateCcw size={16} /> Main Lagi
          </button>
          <button className="btn-leaderboard" onClick={() => navigate("/leaderboard")}>
            <Trophy size={16} /> Leaderboard
          </button>
          <button className="btn-home" onClick={() => navigate("/")}>
            <Home size={16} /> Pilih Kategori
          </button>
        </div>
      </div>
      <div className="review-section">
        <h3>Review Jawaban</h3>
        <div className="review-list">
          {answers.map((a, i) => {
            const isCorrect = a.selected === a.question.answer;
            return (
              <motion.div
                key={i}
                className={clsx("review-item", isCorrect ? "correct" : "wrong")}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="review-num">{i + 1}</div>
                <div className="review-content">
                  <p className="review-q">{a.question.question}</p>
                  <p className="review-a">
                    {isCorrect
                      ? <><CheckCircle2 size={14} color="#10b981" /> Benar</>
                      : <><XCircle size={14} color="#ef4444" /> Salah</>
                    }
                    {" "}- Jawabanmu: <strong>{a.selected || "Waktu habis"}</strong>
                    {!isCorrect && <> - Jawaban benar: <strong className="correct-ans">{a.question.answer}</strong></>}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}