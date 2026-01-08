import { supabase } from "../config/supabase.js";

/**
 * Send Magic Link
 * @route POST /api/auth/send-magic-link
 */
export const sendMagicLink = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
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

    // Send magic link using Supabase
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.CLIENT_URL}/dashboard`,
      },
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: "Magic link sent! Check your email.",
      email: email,
    });
  } catch (error) {
    console.error("Send magic link error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Verify Magic Link Token
 * @route POST /api/auth/verify-otp
 */
export const verifyOtp = async (req, res) => {
  try {
    const { token_hash, type } = req.body;

    if (!token_hash || !type) {
      return res.status(400).json({
        error: "Token hash and type are required",
      });
    }

    const { data, error } = await supabase.auth.verifyOtp({
      token_hash,
      type,
    });

    if (error) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const access_token = data.session.access_token;
    const refresh_token = data.session.refresh_token;
    const expires_at = data.session.expires_at;

    // Set cookies
    res.cookie("sb-access-token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: expires_at * 1000 - Date.now(),
    });

    res.cookie("sb-refresh-token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days
    });

    res.json({
      message: "Verification successful",
      user: data.user,
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
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
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
