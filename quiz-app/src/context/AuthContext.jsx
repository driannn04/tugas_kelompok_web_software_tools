import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const session = localStorage.getItem("quiz_session");
    if (session) setCurrentUser(JSON.parse(session));
  }, []);

  const register = (username, password) => {
    const users = JSON.parse(localStorage.getItem("quiz_users") || "[]");
    const exists = users.find((u) => u.username === username);
    if (exists) return { success: false, message: "Username sudah dipakai!" };
    if (password.length < 6) return { success: false, message: "Password minimal 6 karakter!" };
    const newUser = { username, password, createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem("quiz_users", JSON.stringify(users));
    return { success: true, message: "Registrasi berhasil!" };
  };

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem("quiz_users") || "[]");
    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) return { success: false, message: "Username atau password salah!" };
    const session = { username: user.username };
    localStorage.setItem("quiz_session", JSON.stringify(session));
    setCurrentUser(session);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("quiz_session");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}