import { supabase } from "../config/supabase.js";

/**
 * Authentication middleware
 * Verifies JWT token from cookies and attaches user to request object
 * Automatically refreshes token if expired
 */
export const authenticateUser = async (req, res, next) => {
  try {
    const accessToken = req.cookies["sb-access-token"];
    const refreshToken = req.cookies["sb-refresh-token"];

    if (!accessToken) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provided" });
    }

    // Verify access token with Supabase
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error) {
      // If access token is invalid/expired, try to refresh
      if (refreshToken) {
        try {
          const { data: refreshData, error: refreshError } =
            await supabase.auth.refreshSession({ refresh_token: refreshToken });

          if (refreshError || !refreshData.session) {
            return res
              .status(401)
              .json({ error: "Unauthorized - Session expired" });
          }

          // Update cookies with new tokens
          const newAccessToken = refreshData.session.access_token;
          const newRefreshToken = refreshData.session.refresh_token;
          const expiresAt = refreshData.session.expires_at;

          res.cookie("sb-access-token", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: expiresAt * 1000 - Date.now(),
          });

          res.cookie("sb-refresh-token", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days
          });

          // Attach refreshed user to request
          req.user = refreshData.user;
          return next();
        } catch (refreshError) {
          console.error("Token refresh error:", refreshError);
          return res
            .status(401)
            .json({ error: "Unauthorized - Session expired" });
        }
      }

      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
