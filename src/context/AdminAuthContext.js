import { createContext, useContext, useState } from "react";

const AdminAuthContext = createContext(null);

// Hardcoded credentials — swap with JWT later
const ADMIN_USER = "admin";
const ADMIN_PASS = "sportsday2026";

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem("adminAuth") === "true"
  );

  const login = (username, password) => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);