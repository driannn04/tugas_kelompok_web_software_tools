import { useState, useEffect, useCallback } from "react";
import "./Toast.css";

// Global toast store
let listeners = [];
let toastId = 0;

export const toast = {
  _emit(type, message, icon) {
    const id = ++toastId;
    listeners.forEach(fn => fn({ id, type, message, icon }));
  },
  success(msg) { this._emit("success", msg, "✅"); },
  error(msg)   { this._emit("error", msg, "❌"); },
  info(msg)    { this._emit("info", msg, "ℹ️"); },
  show(msg, icon = "🔔") { this._emit("info", msg, icon); },
};

export function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((t) => {
    setToasts(prev => [...prev, { ...t, removing: false }]);
    setTimeout(() => {
      setToasts(prev => prev.map(x => x.id === t.id ? { ...x, removing: true } : x));
      setTimeout(() => {
        setToasts(prev => prev.filter(x => x.id !== t.id));
      }, 320);
    }, 2800);
  }, []);

  useEffect(() => {
    listeners.push(addToast);
    return () => { listeners = listeners.filter(fn => fn !== addToast); };
  }, [addToast]);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast-item toast-${t.type}${t.removing ? " removing" : ""}`}>
          <span className="toast-icon">{t.icon}</span>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}