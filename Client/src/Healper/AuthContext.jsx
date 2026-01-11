import React, { createContext, useContext, useState, useEffect } from "react";
import { FREE_TRIAL_DAYS } from "../config/clientConfig";

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
  const [trialStatus, setTrialStatus] = useState({
    isTrialActive: false,
    daysRemaining: 0,
    trialEndsAt: null,
    isExpired: false,
  });

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  // Helper function to calculate trial status
  const calculateTrialStatus = (trialEndsAt, isPremium) => {
    // Premium users don't have trial
    if (isPremium) {
      return {
        isTrialActive: false,
        daysRemaining: 0,
        trialEndsAt: null,
        isExpired: false,
      };
    }

    if (!trialEndsAt) {
      return {
        isTrialActive: false,
        daysRemaining: 0,
        trialEndsAt: null,
        isExpired: false,
      };
    }

    const now = new Date();
    const endDate = new Date(trialEndsAt);
    const timeDiff = endDate - now;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return {
      isTrialActive: daysRemaining > 0,
      daysRemaining: Math.max(0, daysRemaining),
      trialEndsAt: endDate,
      isExpired: daysRemaining <= 0,
    };
  };

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

        // Calculate trial status from backend data
        const status = calculateTrialStatus(
          data.user.trial_ends_at,
          data.user.is_premium
        );
        setTrialStatus(status);
      }
    } catch (error) {
      console.error("Session check error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Check for existing session on mount
  useEffect(() => {
    checkSession();
  }, []);

  // Signup with email, password, and username
  const signup = async (email, password, username) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password, username }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      // If signup succeeded and session was created
      if (data.user) {
        setUser(data.user);

        // Calculate trial status from backend data
        const status = calculateTrialStatus(
          data.user.trial_ends_at,
          data.user.is_premium
        );
        setTrialStatus(status);
      }

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Login with email and password
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
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
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include", // Send cookies to clear them
      });

      // Clear state
      setUser(null);
      setTrialStatus({
        isTrialActive: false,
        daysRemaining: 0,
        trialEndsAt: null,
        isExpired: false,
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Delete account function
  const deleteAccount = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/delete-account`, {
        method: "DELETE",
        credentials: "include", // Send cookies for authentication
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete account");
      }

      // Clear state
      setUser(null);
      setTrialStatus({
        isTrialActive: false,
        daysRemaining: 0,
        trialEndsAt: null,
        isExpired: false,
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    trialStatus,
    signup,
    login,
    logout,
    deleteAccount,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
