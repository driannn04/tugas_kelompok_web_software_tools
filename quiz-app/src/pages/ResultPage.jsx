import { useLocation, useNavigate } from "react-router-dom";
import { categoryInfo } from "../data/questions";
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
    if (percent >= 90) return { label: "Luar Biasa! ??", color: "#f59e0b" };
    if (percent >= 70) return { label: "Bagus! ??", color: "#10b981" };
    if (percent >= 50) return { label: "Cukup ??", color: "#6366f1" };
    return { label: "Tetap Semangat! ??", color: "#ef4444" };
  };
  const grade = getGrade();

  return (
    <div className="result-wrapper">
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
          <button className="btn-play-again" onClick={() => navigate(`/quiz/${category}`)}>?? Main Lagi</button>
          <button className="btn-leaderboard" onClick={() => navigate("/leaderboard")}>?? Leaderboard</button>
          <button className="btn-home" onClick={() => navigate("/")}>?? Pilih Kategori</button>
        </div>
      </div>

      <div className="review-section">
        <h3>?? Review Jawaban</h3>
        <div className="review-list">
          {answers.map((a, i) => {
            const isCorrect = a.selected === a.question.answer;
            return (
              <div key={i} className={`review-item ${isCorrect ? "correct" : "wrong"}`}>
                <div className="review-num">{i + 1}</div>
                <div className="review-content">
                  <p className="review-q">{a.question.question}</p>
                  <p className="review-a">
                    {isCorrect ? "?" : "?"} Jawabanmu: <strong>{a.selected || "Waktu habis"}</strong>
                    {!isCorrect && <> � Jawaban benar: <strong className="correct-ans">{a.question.answer}</strong></>}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
