import React, { useEffect, useState } from "react";
import { useAuth } from "../Healper/AuthContext";
import { Link, useNavigate } from "react-router";
import SEO from "../Component/SEO";
import Button from "../Component/Button";
import { toast } from "react-toastify";
import { LuMail, LuLock, LuLogIn } from "react-icons/lu";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        toast.success("Welcome back!");
        navigate("/dashboard");
      } else {
        toast.error(result.error || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Login - ChallengerDaily"
        description="Log in to your ChallengerDaily account to track your challenges and continue building lasting habits."
        keywords="login, sign in, challenge tracker, habit tracker"
      />

      <div className="min-h-screen bg-background dark:bg-background-dark flex-1 flex flex-col items-center justify-center gap-8 px-3 animate-fade-in">
        <div className="flex flex-col items-center justify-center gap-2 mt-5">
          <div className="text-5xl animate-bounce-in">👋</div>
          <h1 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white text-center animate-slide-up">
            Welcome Back
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-center max-w-md">
            Sign in to continue your challenges
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-background-dark px-3 py-4 md:p-8 shadow-sharp-xl border border-black dark:border-white w-full md:w-5/12 flex flex-col gap-5 animate-slide-up"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <LuMail size={18} className="text-primary" />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="px-4 py-3 border border-black dark:border-slate-600 bg-background-sidebar dark:bg-slate-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              disabled={loading}
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <LuLock size={18} className="text-primary" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="px-4 py-3 border border-black dark:border-slate-600 bg-background-sidebar dark:bg-slate-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              disabled={loading}
            />
            <Link
              to="/reset-password"
              className="text-xs text-primary hover:underline text-right"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3 transition-all duration-200 active:scale-100 mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              "Signing In..."
            ) : (
              <>
                <LuLogIn size={18} />
                Sign In
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-slate-600 dark:text-slate-400">
              Don't have an account?
            </span>
            <Link
              to="/signup"
              className="text-primary font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </div>
        </form>
      </div>
    </>
  );
}
