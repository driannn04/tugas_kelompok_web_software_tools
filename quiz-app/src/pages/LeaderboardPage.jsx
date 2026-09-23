import { useState } from "react";
import { categoryInfo } from "../data/questions";
import "./LeaderboardPage.css";

export default function LeaderboardPage({ currentUser }) {
  const [activeTab, setActiveTab] = useState("umum");
  const getLeaderboard = (cat) => JSON.parse(localStorage.getItem("quiz_lb_" + cat) || "[]").slice(0, 10);
  const data = getLeaderboard(activeTab);
  const getMedal = (i) => ["🥇", "🥈", "🥉"][i] || "#" + (i + 1);

  return (
    <div className="lb-wrapper">
      <div className="lb-header">
        <h1>🏆 Leaderboard</h1>
        <p>Top 10 pemain terbaik di setiap kategori</p>
      </div>
      <div className="lb-tabs">
        {Object.entries(categoryInfo).map(([key, cat]) => (
          <button key={key} className={"lb-tab " + (activeTab === key ? "active" : "")}
            onClick={() => setActiveTab(key)} style={{ "--accent": cat.color }}>
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>
      <div className="lb-list">
        {data.length === 0 ? (
          <div className="lb-empty"><span>😴</span><p>Belum ada data. Jadilah yang pertama!</p></div>
        ) : (
          data.map((entry, i) => (
            <div key={i} className={"lb-item " + (entry.username === currentUser?.username ? "is-me" : "")}>
              <span className="lb-rank">{getMedal(i)}</span>
              <div className="lb-user">
                <div className="lb-avatar">{entry.username[0].toUpperCase()}</div>
                <div>
                  <div className="lb-username">{entry.username}{entry.username === currentUser?.username && <span className="lb-you">You</span>}</div>
                  <div className="lb-date">{new Date(entry.date).toLocaleDateString("id-ID")}</div>
                </div>
              </div>
              <div className="lb-score">
                <span className="lb-pts">{entry.score}<span className="lb-total">/{entry.total}</span></span>
                <span className="lb-pct">{Math.round(entry.score / entry.total * 100)}%</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}