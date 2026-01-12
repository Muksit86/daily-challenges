import React, { useState } from "react";
import { LuMail, LuArrowLeft } from "react-icons/lu";
import { Link } from "react-router";
import { useAuth } from "../Healper/AuthContext";
import { toast } from "react-toastify";
import { useTheme } from "../Healper/themeContext";
import SEO from "../Component/SEO";

export default function ResetPassword() {
    const { isDark } = useTheme();
    const { forgotPassword } = useAuth();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email address");
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        setLoading(true);

        const result = await forgotPassword(email);

        setLoading(false);

        if (result.success) {
            setEmailSent(true);
            toast.success("Password reset link sent! Check your email.");
        } else {
            toast.error(result.error || "Failed to send reset email");
        }
    };

    return (
        <>
            <SEO
                title="Reset Password - ChallengerDaily"
                description="Reset your password for ChallengerDaily account"
            />
            <div className="min-h-screen flex items-center justify-center bg-background dark:bg-background-dark px-4 py-8">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                            Reset Password
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            {emailSent
                                ? "Check your email for the reset link"
                                : "Enter your email to receive a password reset link"}
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white dark:bg-elevation-dark border border-gray-900 dark:border-slate-700 shadow-sharp-lg p-6 md:p-8">
                        {emailSent ? (
                            <div className="flex flex-col gap-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <LuMail size={32} className="text-green-600 dark:text-green-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                                        Email Sent!
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                                        We've sent a password reset link to <strong>{email}</strong>
                                    </p>
                                    <p className="text-slate-500 dark:text-slate-500 text-xs mt-2">
                                        The link will expire in 1 hour
                                    </p>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <Link
                                        to="/login"
                                        className="w-full px-4 py-3 bg-primary text-white font-semibold text-center hover:scale-102 transition-all border-2 border-black dark:border-white"
                                    >
                                        Back to Login
                                    </Link>
                                    <button
                                        onClick={() => setEmailSent(false)}
                                        className="w-full px-4 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-all border-2 border-black dark:border-slate-600"
                                    >
                                        Resend Email
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                {/* Email Input */}
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="email"
                                        className="flex items-center font-medium text-slate-700 dark:text-slate-300 text-sm gap-2"
                                    >
                                        <LuMail size={18} />
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your.email@example.com"
                                        className="px-4 py-3 border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary dark:focus:border-primary transition-colors"
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full px-4 py-3 bg-primary text-white font-semibold hover:scale-102 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-black dark:border-white"
                                >
                                    {loading ? "Sending..." : "Send Reset Link"}
                                </button>

                                {/* Back to Login */}
                                <Link
                                    to="/login"
                                    className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors text-sm"
                                >
                                    <LuArrowLeft size={16} />
                                    Back to Login
                                </Link>
                            </form>
                        )}
                    </div>

                    {/* Footer Links */}
                    <div className="text-center mt-6">
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-primary font-semibold hover:underline"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
