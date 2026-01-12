import React, { useState, useEffect } from "react";
import { LuLock, LuEye, LuEyeOff, LuCheck, LuX } from "react-icons/lu";
import { useNavigate, useSearchParams } from "react-router";
import { useAuth } from "../Healper/AuthContext";
import { toast } from "react-toastify";
import { useTheme } from "../Healper/themeContext";
import SEO from "../Component/SEO";

export default function ChangePassword() {
    const { isDark } = useTheme();
    const { resetPassword } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [accessToken, setAccessToken] = useState("");

    // Extract access token from URL hash (Supabase uses hash fragments)
    useEffect(() => {
        // Check URL hash for access_token (Supabase sends it this way)
        const hash = window.location.hash;
        if (hash) {
            const params = new URLSearchParams(hash.substring(1));
            const token = params.get("access_token");
            if (token) {
                setAccessToken(token);
            } else {
                toast.error("Invalid or missing reset token");
            }
        } else {
            // Also check query params as fallback
            const token = searchParams.get("access_token");
            if (token) {
                setAccessToken(token);
            } else {
                toast.error("Invalid or missing reset token");
            }
        }
    }, [searchParams]);

    // Password strength checker
    const checkPasswordStrength = (password) => {
        const checks = {
            length: password.length >= 6,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
        };

        const strength = Object.values(checks).filter(Boolean).length;
        return { checks, strength };
    };

    const { checks, strength } = checkPasswordStrength(formData.password);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.password || !formData.confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (!accessToken) {
            toast.error("Invalid or missing reset token");
            return;
        }

        setLoading(true);

        const result = await resetPassword(formData.password, accessToken);

        setLoading(false);

        if (result.success) {
            toast.success("Password updated successfully!");
            // Redirect to dashboard after successful password reset
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        } else {
            toast.error(result.error || "Failed to update password");
        }
    };

    const getStrengthColor = () => {
        if (strength === 0) return "bg-slate-200 dark:bg-slate-700";
        if (strength <= 2) return "bg-red-500";
        if (strength === 3) return "bg-yellow-500";
        return "bg-green-500";
    };

    const getStrengthText = () => {
        if (strength === 0) return "";
        if (strength <= 2) return "Weak";
        if (strength === 3) return "Medium";
        return "Strong";
    };

    return (
        <>
            <SEO
                title="Change Password - ChallengerDaily"
                description="Set a new password for your ChallengerDaily account"
            />
            <div className="min-h-screen flex items-center justify-center bg-background dark:bg-background-dark px-4 py-8">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                            Change Password
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            Enter your new password below
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white dark:bg-elevation-dark border border-gray-900 dark:border-slate-700 shadow-sharp-lg p-6 md:p-8">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            {/* New Password Input */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="password"
                                    className="flex items-center font-medium text-slate-700 dark:text-slate-300 text-sm gap-2"
                                >
                                    <LuLock size={18} />
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({ ...formData, password: e.target.value })
                                        }
                                        placeholder="Enter new password"
                                        className="w-full px-4 py-3 pr-12 border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary dark:focus:border-primary transition-colors"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                    >
                                        {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                                    </button>
                                </div>

                                {/* Password Strength Indicator */}
                                {formData.password && (
                                    <div className="space-y-2">
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4].map((level) => (
                                                <div
                                                    key={level}
                                                    className={`h-1 flex-1 rounded ${level <= strength ? getStrengthColor() : "bg-slate-200 dark:bg-slate-700"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        {strength > 0 && (
                                            <p className="text-xs text-slate-600 dark:text-slate-400">
                                                Strength: <span className="font-semibold">{getStrengthText()}</span>
                                            </p>
                                        )}
                                        <div className="space-y-1">
                                            <PasswordCheck met={checks.length} text="At least 6 characters" />
                                            <PasswordCheck met={checks.uppercase} text="One uppercase letter" />
                                            <PasswordCheck met={checks.lowercase} text="One lowercase letter" />
                                            <PasswordCheck met={checks.number} text="One number" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password Input */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="confirmPassword"
                                    className="flex items-center font-medium text-slate-700 dark:text-slate-300 text-sm gap-2"
                                >
                                    <LuLock size={18} />
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={(e) =>
                                            setFormData({ ...formData, confirmPassword: e.target.value })
                                        }
                                        placeholder="Confirm new password"
                                        className="w-full px-4 py-3 pr-12 border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary dark:focus:border-primary transition-colors"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                    >
                                        {showConfirmPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                                    </button>
                                </div>
                                {formData.confirmPassword && (
                                    <div className="flex items-center gap-2 text-xs">
                                        {formData.password === formData.confirmPassword ? (
                                            <>
                                                <LuCheck size={14} className="text-green-500" />
                                                <span className="text-green-600 dark:text-green-400">Passwords match</span>
                                            </>
                                        ) : (
                                            <>
                                                <LuX size={14} className="text-red-500" />
                                                <span className="text-red-600 dark:text-red-400">Passwords don't match</span>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading || !accessToken}
                                className="w-full px-4 py-3 bg-primary text-white font-semibold hover:scale-102 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-black dark:border-white"
                            >
                                {loading ? "Updating..." : "Update Password"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

// Helper component for password requirement checks
function PasswordCheck({ met, text }) {
    return (
        <div className="flex items-center gap-2 text-xs">
            {met ? (
                <LuCheck size={14} className="text-green-500" />
            ) : (
                <LuX size={14} className="text-slate-400 dark:text-slate-600" />
            )}
            <span className={met ? "text-green-600 dark:text-green-400" : "text-slate-500 dark:text-slate-500"}>
                {text}
            </span>
        </div>
    );
}
