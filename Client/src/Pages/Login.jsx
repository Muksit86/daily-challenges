import React, { useState } from "react";
import { useAuth } from "../Healper/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (isSignup && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (isSignup && password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      if (isSignup) {
        const result = await signup(email, password);
        if (result.success) {
          toast.success("Account created successfully!");
          navigate("/dashboard");
        } else {
          toast.error(result.error || "Signup failed");
        }
      } else {
        const result = await login(email, password);
        if (result.success) {
          toast.success("Login successful!");
          navigate("/dashboard");
        } else {
          toast.error(result.error || "Login failed");
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <div className="min-h-screen bg-background dark:bg-background-dark flex-1 flex flex-col items-center justify-center gap-8 px-5 animate-fade-in">
        <div className="text-7xl mb-4 animate-bounce-in">
          {isSignup ? "🎯" : "👋"}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white text-center animate-slide-up">
          {isSignup ? "Create Account" : "Welcome back!"}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-center max-w-md animate-slide-up">
          {isSignup
            ? "Sign up to start tracking your daily challenges"
            : "Sign in to your account to continue tracking your daily challenges"}
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-md border dark:border-slate-700 w-full md:w-5/12 flex flex-col gap-5 animate-slide-up"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              disabled={loading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              disabled={loading}
            />
          </div>

          {isSignup && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-900 dark:text-white">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                disabled={loading}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-lg active:scale-100 shadow-md mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Please wait..." : isSignup ? "Sign Up" : "Sign In"}
          </button>

          <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              onClick={toggleMode}
              className="text-primary font-semibold cursor-pointer hover:underline"
            >
              {isSignup ? "Sign in" : "Sign up"}
            </span>
          </p>
        </form>
      </div>
    </>
  );
}

