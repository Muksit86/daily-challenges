import React from "react";
import { Link } from "react-router";
import { useAuth } from "../Healper/AuthContext";
import { LuClock, LuArrowRight } from "react-icons/lu";
import { IoAlertCircleSharp } from "react-icons/io5";

/**
 * Trial Banner Component
 * Shows trial status for free users:
 * - Active trial: Days remaining with color-coded urgency
 * - Expired trial: Prominent upgrade message
 */
export default function TrialBanner() {
    const { user, trialStatus } = useAuth();

    // Only show for authenticated users with trial status
    if (!user) {
        return null;
    }

    const { isExpired, daysRemaining, isTrialActive } = trialStatus;

    // Determine urgency level based on days remaining
    const getUrgencyLevel = () => {
        if (isExpired) return "expired";
        if (daysRemaining <= 1) return "critical";
        if (daysRemaining <= 3) return "warning";
        return "normal";
    };

    const urgencyLevel = getUrgencyLevel();

    // Expired trial banner
    if (isExpired) {
        return (
            <div className="sticky top-0 z-50 bg-red-600 border-b-2 border-red-800 dark:bg-red-900 dark:border-red-700 animate-fade-in">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <IoAlertCircleSharp className="text-white text-2xl flex-shrink-0" />
                            <div>
                                <p className="text-white font-bold text-sm md:text-base">
                                    Your free trial has expired
                                </p>
                                <p className="text-red-100 text-xs md:text-sm">
                                    Upgrade now to continue creating challenges and logging progress
                                </p>
                            </div>
                        </div>
                        <Link
                            to="/payment"
                            className="flex items-center gap-2 bg-white text-red-600 dark:bg-red-100 dark:text-red-900 px-6 py-2 font-bold text-sm md:text-base hover:scale-105 transition-all shadow-lg whitespace-nowrap"
                        >
                            Upgrade Now
                            <LuArrowRight className="text-lg" />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Active trial banner with urgency levels
    const getBannerColors = () => {
        switch (urgencyLevel) {
            case "critical":
                return {
                    bg: "bg-orange-500 dark:bg-orange-700",
                    border: "border-orange-700 dark:border-orange-600",
                    text: "text-white",
                    subtext: "text-orange-100",
                };
            case "warning":
                return {
                    bg: "bg-yellow-500 dark:bg-yellow-700",
                    border: "border-yellow-700 dark:border-yellow-600",
                    text: "text-yellow-900 dark:text-white",
                    subtext: "text-yellow-800 dark:text-yellow-100",
                };
            default:
                return {
                    bg: "bg-blue-500 dark:bg-blue-700",
                    border: "border-blue-700 dark:border-blue-600",
                    text: "text-white",
                    subtext: "text-blue-100",
                };
        }
    };

    const colors = getBannerColors();

    return (
        <div
            className={`sticky top-0 z-50 ${colors.bg} border-b-2 ${colors.border} animate-fade-in`}
        >
            <div className="container mx-auto px-4 py-2.5">
                <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                        <LuClock className={`${colors.text} text-xl flex-shrink-0`} />
                        <div>
                            <p className={`${colors.text} font-semibold text-sm md:text-base`}>
                                Free Trial: {daysRemaining} {daysRemaining === 1 ? "day" : "days"} remaining
                            </p>
                            <p className={`${colors.subtext} text-xs`}>
                                Upgrade anytime to unlock unlimited challenges
                            </p>
                        </div>
                    </div>
                    <Link
                        to="/payment"
                        className="bg-white dark:bg-slate-100 text-blue-600 dark:text-blue-800 px-4 py-1.5 font-semibold text-xs md:text-sm hover:scale-105 transition-all shadow-md whitespace-nowrap"
                    >
                        View Plans
                    </Link>
                </div>
            </div>
        </div>
    );
}
