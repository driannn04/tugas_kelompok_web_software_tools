import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { questions, categoryInfo } from "../data/questions";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "../components/Toast";
import "./QuizPage.css";

const TIMER_SECONDS = 15;

export default function QuizPage({ currentUser }) {
  const { category } = useParams();
  const navigate = useNavigate();
  const quizQuestions = questions[category] || [];
  const catInfo = categoryInfo[category];
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [answers, setAnswers] = useState([]);
  const [isRevealed, setIsRevealed] = useState(false);

  const goNext = useCallback((selectedOverride) => {
    const actualSelected = selectedOverride !== undefined ? selectedOverride : null;
    const newAnswers = [...answers, { question: quizQuestions[current], selected: actualSelected }];
    if (current + 1 >= quizQuestions.length) {
      const score = newAnswers.filter(a => a.selected === a.question.answer).length;
      const lb = JSON.parse(localStorage.getItem("quiz_lb_" + category) || "[]");
      lb.push({ username: currentUser?.username || "Guest", score, total: quizQuestions.length, date: new Date().toISOString() });
      lb.sort((a, b) => b.score - a.score);
      localStorage.setItem("quiz_lb_" + category, JSON.stringify(lb.slice(0, 20)));
      navigate("/result", { state: { answers: newAnswers, category, score } });
    } else {
      setAnswers(newAnswers);
      setCurrent(c => c + 1);
      setSelected(null);
      setIsRevealed(false);
      setTimer(TIMER_SECONDS);
    }
  }, [answers, current, quizQuestions, navigate, category, currentUser]);

  useEffect(() => {
    if (isRevealed) return;
    if (timer === 0) {
      setIsRevealed(true);
      toast.show("Waktu habis!", "⏰");
      setTimeout(() => goNext(null), 1200);
      return;
    }
    const t = setTimeout(() => setTimer(t => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, isRevealed, goNext]);

  const handleSelect = (option) => {
    if (isRevealed) return;
    const isCorrect = option === quizQuestions[current].answer;
    setSelected(option);
    setIsRevealed(true);
    if (isCorrect) {
      toast.success("Jawaban Benar!");
    } else {
      toast.error("Salah! Jawaban: " + quizQuestions[current].answer);
    }
    setTimeout(() => goNext(option), 1200);
  };

  if (!catInfo || quizQuestions.length === 0) return <div className="quiz-error">Kategori tidak ditemukan!</div>;

  const q = quizQuestions[current];
  const timerPercent = (timer / TIMER_SECONDS) * 100;

  return (
    <motion.div
      className="quiz-wrapper"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
    >
      <div className="quiz-header">
        <div className="quiz-meta">
          <span className="quiz-category" style={{ color: catInfo.color }}>{catInfo.emoji} {catInfo.label}</span>
          <span className="quiz-counter">Soal {current + 1} / {quizQuestions.length}</span>
        </div>
        <div className="progress-bar-bg">
          <motion.div
            className="progress-bar-fill"
            animate={{ width: (current / quizQuestions.length * 100) + "%" }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        </div>
      </div>
      <div className="timer-section">
        <div className="timer-circle" style={{ "--pct": timerPercent + "%", "--color": timer <= 5 ? "#ef4444" : catInfo.color }}>
          <span className="timer-number" style={{ color: timer <= 5 ? "#ef4444" : "#fff" }}>{timer}</span>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="question-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
        >
          <p className="question-text">{q.question}</p>
          <div className="options-grid">
            {q.options.map((option, i) => {
              let cls = "option-btn";
              if (isRevealed) {
                if (option === q.answer) cls += " correct";
                else if (option === selected) cls += " wrong";
                else cls += " dimmed";
              }
              return (
                <motion.button
                  key={i}
                  className={cls}
                  onClick={() => handleSelect(option)}
                  disabled={isRevealed}
                  whileHover={!isRevealed ? { scale: 1.02 } : {}}
                  whileTap={!isRevealed ? { scale: 0.98 } : {}}
                >
                  <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                  <span>{option}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}