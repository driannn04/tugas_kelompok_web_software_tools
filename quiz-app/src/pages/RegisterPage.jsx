import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./AuthPage.css";

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (form.password !== form.confirm) { setError("Password tidak cocok!"); return; }
    setLoading(true);
    setTimeout(() => {
      const result = register(form.username.trim(), form.password);
      if (result.success) {
        setSuccess("Akun berhasil dibuat! Redirecting...");
        setTimeout(() => navigate("/login"), 1500);
      } else setError(result.message);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">?</div>
          <h1>Buat Akun Baru</h1>
          <p>Daftar dan bergabung dengan QuizMaster</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" placeholder="Pilih username unik" value={form.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Min. 6 karakter" value={form.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Konfirmasi Password</label>
            <input type="password" name="confirm" placeholder="Ulangi password" value={form.confirm} onChange={handleChange} required />
          </div>
          {error && <div className="auth-error">?? {error}</div>}
          {success && <div className="auth-success">? {success}</div>}
          <button type="submit" className="btn-auth" disabled={loading}>
            {loading ? <span className="spinner"></span> : "Daftar Sekarang"}
          </button>
        </form>
        <div className="auth-footer">
          Sudah punya akun? <Link to="/login">Login di sini</Link>
        </div>
      </div>
    </div>
  );
}
