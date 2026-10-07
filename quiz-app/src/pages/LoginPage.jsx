import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import "./AuthPage.css";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const result = login(form.username.trim(), form.password);
      if (result.success) {
        toast.success("Login berhasil! Selamat datang 🎉");
        navigate("/");
      } else {
        toast.error(result.message);
      }
      setLoading(false);
    }, 600);
  };

  return (
    <motion.div
      className="auth-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
    >
      <div className="auth-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">🎮</div>
          <h1>Selamat Datang!</h1>
          <p>Login untuk mulai bermain QuizMaster</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" placeholder="Masukkan username" value={form.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Masukkan password" value={form.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn-auth" disabled={loading}>
            {loading ? <span className="spinner"></span> : "Login"}
          </button>
        </form>
        <div className="auth-footer">
          Belum punya akun? <Link to="/register">Daftar Sekarang</Link>
        </div>
      </div>
    </motion.div>
  );
}