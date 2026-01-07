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
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authType, setAuthType] = useState(null); // 'guest' | 'email'

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  // Check for existing session on mount
  useEffect(() => {
    const storedSession = localStorage.getItem("session");
    const storedUser = localStorage.getItem("user");
    const storedAuthType = localStorage.getItem("authType");

    if (storedAuthType === "guest") {
      // Guest mode
      setAuthType("guest");
      setUser({ email: "guest" });
    } else if (storedSession && storedUser) {
      // Email authentication
      setSession(JSON.parse(storedSession));
      setUser(JSON.parse(storedUser));
      setAuthType("email");
    }
    setLoading(false);
  }, []);

  // Login as guest
  const loginAsGuest = () => {
    setAuthType("guest");
    setUser({ email: "guest" });
    localStorage.setItem("authType", "guest");
    return { success: true };
  };

  // Signup function
  const signup = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      // Store user and session
      if (data.user && data.session) {
        setUser(data.user);
        setSession(data.session);
        setAuthType("email");
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("session", JSON.stringify(data.session));
        localStorage.setItem("authType", "email");
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Store user and session
      if (data.user && data.session) {
        setUser(data.user);
        setSession(data.session);
        setAuthType("email");
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("session", JSON.stringify(data.session));
        localStorage.setItem("authType", "email");
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Change password function
  const changePassword = async (currentPassword, newPassword) => {
    try {
      if (authType !== "email") {
        throw new Error("Password change is only available for email users");
      }

      if (!session?.access_token) {
        throw new Error("No active session");
      }

      const response = await fetch(`${API_URL}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to change password");
      }

      return { success: true, message: "Password changed successfully" };
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
        });
      }

      // Clear state and localStorage
      setUser(null);
      setSession(null);
      setAuthType(null);
      localStorage.removeItem("user");
      localStorage.removeItem("session");
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

      if (!session?.access_token) {
        throw new Error("No active session");
      }

      const response = await fetch(`${API_URL}/auth/delete-account`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      console.log(response);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete account");
      }

      // Clear state and localStorage
      setUser(null);
      setSession(null);
      setAuthType(null);
      localStorage.removeItem("user");
      localStorage.removeItem("session");
      localStorage.removeItem("authType");

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    session,
    loading,
    authType,
    signup,
    login,
    loginAsGuest,
    logout,
    deleteAccount,
    changePassword,
    isAuthenticated: !!user && !!authType,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
