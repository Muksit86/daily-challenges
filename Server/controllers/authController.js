import { supabase } from "../config/supabase.js";

/**
 * User Signup
 * @route POST /api/auth/signup
 */
export const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Validate input
    if (!email || !password || !username) {
      return res.status(400).json({
        error: "Email, password, and username are required",
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

    // Calculate trial end date (7 days from now)
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 7);

    // Create user with Supabase, storing username and trial info in metadata
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
          trial_ends_at: trialEndsAt.toISOString(),
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
        sameSite: "strict",
        maxAge: expires_at * 1000 - Date.now(),
      });

      res.cookie("sb-refresh-token", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days
      });

      return res.status(201).json({
        message: "Signup successful",
        user: {
          id: data.user.id,
          email: data.user.email,
          username: data.user.user_metadata?.username,
          created_at: data.user.created_at,
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
      message: "Login successful",
      user: {
        id: data.user.id,
        email: data.user.email,
        username: data.user.user_metadata?.username,
        created_at: data.user.created_at,
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
        trial_ends_at: user.user_metadata?.trial_ends_at,
        is_premium: user.user_metadata?.is_premium || false,
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

