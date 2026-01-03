import React, { useState } from "react";
import { Link } from "react-router";
import Button from "../Component/Button";

export default function LandingPage() {
    const [tickCount, setTickCount] = useState(0);
    const maxTicks = 20; // Maximum number of ticks for full circle
    const progress = (tickCount / maxTicks) * 100;

    const handleTick = () => {
        if (tickCount < maxTicks) {
            setTickCount(tickCount + 1);
        } else {
            setTickCount(0); // Reset when full
        }
    };

    return (
        <div className="bg-background dark:bg-background-dark min-h-screen flex items-center justify-center py-8 px-4 animate-fade-in">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Text Section */}
                <div className="flex flex-col gap-6 animate-slide-up">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                        Transform Your
                        <span className="block text-primary">Daily Challenges</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                        Track your progress, build lasting habits, and achieve your goals
                        one challenge at a time. Stay motivated and see how far you've come.
                    </p>
                    <div className="flex gap-4">
                        <Link to="/dashboard">
                            <Button
                                text="Get Started"
                                textSize="lg"
                                className="px-8 py-4 text-lg"
                            />
                        </Link>
                    </div>
                </div>

                {/* Progress Wheel Section */}
                <div className="flex flex-col items-center justify-center gap-6 animate-slide-up">
                    <div className="relative group">
                        {/* SVG Progress Circle */}
                        <svg
                            className="w-64 h-64 md:w-80 md:h-80 transform -rotate-90 transition-transform group-hover:scale-105"
                            viewBox="0 0 200 200"
                        >
                            {/* Background Circle */}
                            <circle
                                cx="100"
                                cy="100"
                                r="85"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="12"
                                className="text-slate-200 dark:text-slate-700"
                            />
                            {/* Progress Circle */}
                            <circle
                                cx="100"
                                cy="100"
                                r="85"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="12"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 85}`}
                                strokeDashoffset={`${2 * Math.PI * 85 * (1 - progress / 100)}`}
                                className="text-primary transition-all duration-500 ease-out"
                            />
                        </svg>

                        {/* Center Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                                {tickCount}
                            </span>
                            <span className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-1">
                                / {maxTicks} ticks
                            </span>
                            <span className="text-2xl md:text-3xl font-semibold text-primary mt-2">
                                {Math.round(progress)}%
                            </span>
                        </div>
                    </div>

                    {/* Tick Button */}
                    <button
                        onClick={handleTick}
                        className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl 
                     shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 
                     active:scale-95 text-lg animate-bounce-in"
                    >
                        {tickCount >= maxTicks ? "Reset" : "Tick Progress"}
                    </button>

                    <p className="text-sm text-slate-500 dark:text-slate-500 text-center max-w-xs">
                        Click the button to fill the progress wheel. See how satisfying
                        progress can be!
                    </p>
                </div>
            </div>
        </div>
    );
}
