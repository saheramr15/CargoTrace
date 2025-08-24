// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ✅ Load principal from localStorage if it exists
  const [globalPrincipal, setGlobalPrincipal] = useState(() => {
    return localStorage.getItem("principal") || null;
  });

  // ✅ Whenever principal changes, save it in localStorage
  useEffect(() => {
    if (globalPrincipal) {
      localStorage.setItem("principal", globalPrincipal);
    } else {
      localStorage.removeItem("principal");
    }
  }, [globalPrincipal]);

  return (
    <AuthContext.Provider value={{ globalPrincipal, setGlobalPrincipal }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
