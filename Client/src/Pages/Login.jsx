import React, { useState, useEffect } from "react";
import { useAuth } from "../Healper/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { LuMail, LuSend } from "react-icons/lu";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const { sendMagicLink, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading && !loading) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, authLoading, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const result = await sendMagicLink(email);
      if (result.success) {
        setEmailSent(true);
        toast.success("Magic link sent! Check your email.");
      } else {
        toast.error(result.error || "Failed to send magic link");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setEmailSent(false);
    setEmail("");
  };

  return (
    <>
      <div className="min-h-screen bg-background dark:bg-background-dark flex-1 flex flex-col items-center justify-center gap-8 px-3 animate-fade-in">
        <div className="flex flex-col items-center justify-center gap-2 mt-5">
          <div className="text-5xl animate-bounce-in">
            {emailSent ? "📧" : "👋"}
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white text-center animate-slide-up">
            {emailSent ? "Check your email!" : "Welcome to ChallengerDaily"}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-center max-w-md">
            {emailSent
              ? "We've sent a magic link to your email. Click it to sign in instantly!"
              : "Enter your email to get started - no password needed!"}
          </p>
        </div>

        {!emailSent ? (
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

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3 transition-all duration-200 hover:-lg active:scale-100 mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  <LuSend size={18} />
                  Send Magic Link
                </>
              )}
            </button>

            <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </div>
          </form>
        ) : (
          <div className="bg-white dark:bg-background-dark px-3 py-6 md:p-8 shadow-sharp-xl border border-black dark:border-white w-full md:w-5/12 flex flex-col gap-5 animate-slide-up">
            <div className="bg-primary/10 border border-primary/30 p-4 flex flex-col gap-3">
              <p className="text-slate-700 dark:text-slate-300 text-center">
                We sent a magic link to:
              </p>
              <p className="font-bold text-primary text-center text-lg">
                {email}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                Click the link in your email to sign in. The link will expire
                in 1 hour.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                Didn't receive the email?
              </p>
              <button
                onClick={handleResend}
                className="cursor-pointer w-full border border-primary text-primary hover:bg-primary hover:text-white font-semibold py-2 transition-all duration-200"
              >
                Try Again
              </button>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
              Check your spam folder if you don't see the email
            </div>
          </div>
        )}
      </div>
    </>
  );
}
