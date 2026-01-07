import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authType, setAuthType] = useState(null); // 'free' | 'email'

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  // Check session from cookies on mount
  const checkSession = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        credentials: "include", // Send cookies
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setAuthType("email");
        localStorage.setItem("authType", "email");
      } else {
        // No valid session, check for free mode
        const storedAuthType = localStorage.getItem("authType");
        if (storedAuthType === "free") {
          setAuthType("free");
          setUser({ email: "free" });
        }
      }
    } catch (error) {
      console.error("Session check error:", error);
      // Check for free mode on error
      const storedAuthType = localStorage.getItem("authType");
      if (storedAuthType === "free") {
        setAuthType("free");
        setUser({ email: "free" });
      }
    } finally {
      setLoading(false);
    }
  };

  // Check for existing session on mount
  useEffect(() => {
    checkSession();
  }, []);

  // Login as free user
  const loginAsFree = () => {
    setAuthType("free");
    setUser({ email: "free" });
    localStorage.setItem("authType", "free");
    return { success: true };
  };

  // Send magic link to email
  const sendMagicLink = async (email) => {
    try {
      const response = await fetch(`${API_URL}/auth/send-magic-link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send magic link");
      }

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Verify magic link (called when user clicks link from email)
  const verifyMagicLink = async (token_hash, type) => {
    try {
      const response = await fetch(`${API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ token_hash, type }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Verification failed");
      }

      // Fetch current user from cookies
      await checkSession();

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      if (authType === "email") {
        await fetch(`${API_URL}/auth/logout`, {
          method: "POST",
          credentials: "include", // Send cookies to clear them
        });
      }

      // Clear state and localStorage
      setUser(null);
      setAuthType(null);
      localStorage.removeItem("authType");

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Delete account function
  const deleteAccount = async () => {
    try {
      if (authType !== "email") {
        throw new Error("Account deletion is only available for email users");
      }

      const response = await fetch(`${API_URL}/auth/delete-account`, {
        method: "DELETE",
        credentials: "include", // Send cookies for authentication
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete account");
      }

      // Clear state and localStorage
      setUser(null);
      setAuthType(null);
      localStorage.removeItem("authType");

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    authType,
    sendMagicLink,
    verifyMagicLink,
    loginAsFree,
    logout,
    deleteAccount,
    isAuthenticated: !!user && !!authType,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
