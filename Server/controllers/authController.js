import { supabase } from "../config/supabase.js";

/**
 * User Signup
 * @route POST /api/auth/signup
 */
export const signup = async (req, res) => {
  try {
    const { email, password, username, account_type = "free_trial" } = req.body;

    // Validate input
    if (!email || !password || !username) {
      return res.status(400).json({
        error: "Email, password, and username are required",
      });
    }

    // Validate account_type
    if (!["free_trial", "paid"].includes(account_type)) {
      return res.status(400).json({
        error: "Invalid account type. Must be 'free_trial' or 'paid'",
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters",
      });
    }

    // Username validation
    if (username.length < 3) {
      return res.status(400).json({
        error: "Username must be at least 3 characters",
      });
    }

    // Calculate trial end date (7 days from now) - only for free trial accounts
    const trialEndsAt = account_type === "free_trial" ? new Date() : null;
    if (trialEndsAt) {
      trialEndsAt.setDate(trialEndsAt.getDate() + 7);
    }

    // Create user with Supabase, storing username, account type, and trial info in metadata
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
          account_type: account_type,
          trial_ends_at: trialEndsAt ? trialEndsAt.toISOString() : null,
          is_premium: false,
        },
      },
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    if (data?.session) {
      const access_token = data.session.access_token;
      const refresh_token = data.session.refresh_token;
      const expires_at = data.session.expires_at;

      // Set HTTP-only cookies
      res.cookie("sb-access-token", access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: expires_at * 1000 - Date.now(),
      });

      res.cookie("sb-refresh-token", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days
      });

      return res.status(201).json({
        message: "Signup successful",
        user: {
          id: data.user.id,
          email: data.user.email,
          username: data.user.user_metadata?.username,
          created_at: data.user.created_at,
          account_type: data.user.user_metadata?.account_type || "free_trial",
          trial_ends_at: data.user.user_metadata?.trial_ends_at,
          is_premium: data.user.user_metadata?.is_premium || false,
        },
      });
    }

    // If email confirmation is required
    return res.status(200).json({
      message: "Please check your email to confirm your account",
      user: data.user,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * User Login
 * @route POST /api/auth/login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // Sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const access_token = data.session.access_token;
    const refresh_token = data.session.refresh_token;
    const expires_at = data.session.expires_at;

    // Set HTTP-only cookies
    res.cookie("sb-access-token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: expires_at * 1000 - Date.now(),
    });

    res.cookie("sb-refresh-token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days
    });

    res.json({
      message: "Login successful",
      user: {
        id: data.user.id,
        email: data.user.email,
        username: data.user.user_metadata?.username,
        created_at: data.user.created_at,
        account_type: data.user.user_metadata?.account_type || "free_trial",
        trial_ends_at: data.user.user_metadata?.trial_ends_at,
        is_premium: data.user.user_metadata?.is_premium || false,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * User Logout
 * @route POST /api/auth/logout
 */
export const logout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Clear cookies
    res.clearCookie("sb-access-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.clearCookie("sb-refresh-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Delete User Account
 * @route DELETE /api/auth/delete-account
 */
export const deleteAccount = async (req, res) => {
  try {
    const user = req.user; // From auth middleware

    // Delete user using admin API
    const { error } = await supabase.auth.admin.deleteUser(user.id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Clear cookies
    res.clearCookie("sb-access-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.clearCookie("sb-refresh-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete account error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get Current User (Session Check)
 * @route GET /api/auth/me
 */
export const getCurrentUser = async (req, res) => {
  try {
    // User is already attached by auth middleware
    const user = req.user;

    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.user_metadata?.username,
        created_at: user.created_at,
        updated_at: user.updated_at,
        account_type: user.user_metadata?.account_type || "free_trial",
        trial_ends_at: user.user_metadata?.trial_ends_at,
        is_premium: user.user_metadata?.is_premium || false,
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Forgot Password - Send reset email
 * @route POST /api/auth/forgot-password
 */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({
        error: "Email is required",
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }

    // Send password reset email using Supabase
    // The redirectTo URL should point to your change password page
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.CLIENT_URL}/change-password`,
    });

    if (error) {
      console.error("Forgot password error:", error);
      // Don't reveal if email exists or not for security
      return res.json({
        message:
          "If an account with that email exists, a password reset link has been sent.",
      });
    }

    res.json({
      message:
        "If an account with that email exists, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Reset Password - Update password with token
 * @route POST /api/auth/reset-password
 */
export const resetPassword = async (req, res) => {
  try {
    const { password, access_token } = req.body;

    // Validate input
    if (!password || !access_token) {
      return res.status(400).json({
        error: "Password and access token are required",
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters",
      });
    }

    // Set the session with the access token from the reset link
    const { data: sessionData, error: sessionError } =
      await supabase.auth.setSession({
        access_token,
        refresh_token: access_token, // For password reset, access token is enough
      });

    if (sessionError) {
      return res.status(400).json({
        error: "Invalid or expired reset token",
      });
    }

    // Update the user's password
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      return res.status(400).json({
        error: error.message || "Failed to update password",
      });
    }

    // Set new session cookies
    if (data?.user) {
      const { data: newSession } = await supabase.auth.getSession();

      if (newSession?.session) {
        const access_token = newSession.session.access_token;
        const refresh_token = newSession.session.refresh_token;
        const expires_at = newSession.session.expires_at;

        // Set HTTP-only cookies
        res.cookie("sb-access-token", access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "none",
          maxAge: expires_at * 1000 - Date.now(),
        });

        res.cookie("sb-refresh-token", refresh_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "none",
          maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days
        });
      }
    }

    res.json({
      message: "Password updated successfully",
      user: {
        id: data.user.id,
        email: data.user.email,
        username: data.user.user_metadata?.username,
      },
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
