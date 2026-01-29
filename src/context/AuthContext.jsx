import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
  const stored = localStorage.getItem("user");
  try {
    return stored ? JSON.parse(stored) : null;
  } catch {
    // OLD EMAIL STRING FOUND → CLEAN IT
    localStorage.removeItem("user");
    return null;
  }
} 
);



  const [role, setRole] = useState(
    localStorage.getItem("role")
  );

  const login = (userRole, userData) => {
  localStorage.setItem("role", userRole);
  localStorage.setItem("user", JSON.stringify(userData));
  setRole(userRole);
  setUser(userData);
};


  const logout = () => {
  localStorage.removeItem("role");
  localStorage.removeItem("user");
  setRole(null);
  setUser(null);
  navigate("/login");
};


  return (
    <AuthContext.Provider value={{ role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
