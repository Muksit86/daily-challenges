import React, { useState, useEffect } from "react";
import { useAuth } from "../Healper/AuthContext";
import { useNavigate, Link } from "react-router";
import { toast } from "react-toastify";
import { LuMail, LuLock, LuUser, LuUserPlus } from "react-icons/lu";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!username || !email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        if (username.length < 3) {
            toast.error("Username must be at least 3 characters");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            const result = await signup(email, password, username);

            if (result.success) {
                toast.success("Account created successfully!");
                navigate("/upgrade");
            } else {
                toast.error(result.error || "Signup failed");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-background dark:bg-background-dark flex-1 flex flex-col items-center justify-center gap-8 px-3 animate-fade-in">
                <div className="flex flex-col items-center justify-center gap-2 mt-5">
                    <div className="text-5xl animate-bounce-in">🎉</div>
                    <h1 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white text-center animate-slide-up">
                        Create Your Account
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-center max-w-md">
                        Start your challenge journey today
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white dark:bg-background-dark px-3 py-4 md:p-8 shadow-sharp-xl border border-black dark:border-white w-full md:w-5/12 flex flex-col gap-5 animate-slide-up"
                >
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                            <LuUser size={18} className="text-primary" />
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="johndoe"
                            className="px-4 py-3 border border-black dark:border-slate-600 bg-background-sidebar dark:bg-slate-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                            disabled={loading}
                            autoFocus
                        />
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Minimum 3 characters, will be displayed on your profile
                        </p>
                    </div>

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
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Minimum 6 characters
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="cursor-pointer w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3 transition-all duration-200 active:scale-100 mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            "Creating Account..."
                        ) : (
                            <>
                                <LuUserPlus size={18} />
                                Sign Up
                            </>
                        )}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-sm">
                        <span className="text-slate-600 dark:text-slate-400">
                            Already have an account?
                        </span>
                        <Link
                            to="/login"
                            className="text-primary font-semibold hover:underline"
                        >
                            Sign In
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
