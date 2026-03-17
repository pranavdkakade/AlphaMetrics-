import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AUTH_TOKEN_KEY, verifyAuthToken } from "../services/api";

export default function ProtectedRoute({ children }) {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkAuth() {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) {
        if (active) {
          setIsAuthenticated(false);
          setIsChecking(false);
        }
        return;
      }

      const valid = await verifyAuthToken(token);
      if (active) {
        setIsAuthenticated(valid);
        setIsChecking(false);
      }
    }

    checkAuth();

    return () => {
      active = false;
    };
  }, []);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#f8fafc" }}>
        <p className="text-sm" style={{ color: "#475569" }}>Checking access...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
