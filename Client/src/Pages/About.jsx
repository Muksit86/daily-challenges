import React from "react";
import { Link } from "react-router";

export default function About() {
  return (
    <>
      <div className="bg-background dark:bg-background-dark flex-1 flex flex-col items-center justify-start py-10 md:py-20 px-5">
        <div className="max-w-3xl w-full animate-fade-in">
          {/* Header */}
          <div className="mb-12 text-center animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              About ChallengerDaily
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Your daily companion for building lasting habits
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Mission */}
            <section className="bg-white dark:bg-slate-800 p-6 md:p-8    -md border dark:border-slate-700 animate-slide-up">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Our Mission
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                ChallengerDaily is designed to help you build and maintain
                positive habits through consistent, daily challenges. We believe
                that small, consistent actions lead to remarkable results over
                time.
              </p>
            </section>

            {/* How It Works */}
            <section className="bg-white dark:bg-slate-800 p-6 md:p-8    -md border dark:border-slate-700 animate-slide-up">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                How It Works
              </h2>
              <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">1.</span>
                  <span>
                    Create a challenge with your desired duration (30, 75, 100,
                    or custom days)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">2.</span>
                  <span>
                    Log your progress daily and watch your progress wheel grow
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">3.</span>
                  <span>
                    View all your challenges and completed days at a glance
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">4.</span>
                  <span>Keep the momentum going and build lasting habits</span>
                </li>
              </ul>
            </section>

            {/* Features */}
            <section className="bg-white dark:bg-slate-800 p-6 md:p-8    -md border dark:border-slate-700 animate-slide-up">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Features
              </h2>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li>✨ Simple and intuitive interface</li>
                <li>🌙 Dark mode support for comfortable viewing</li>
                <li>📊 Visual progress tracking with animated circles</li>
                <li>🎯 Customizable challenge durations</li>
                <li>💾 Local storage to keep your data safe</li>
                <li>📱 Mobile and desktop responsive design</li>
              </ul>
            </section>

            {/* Contact CTA */}
            <section className="bg-primary p-6 md:p-8    -md text-white text-center animate-slide-up">
              <h2 className="text-2xl font-bold mb-4">
                Ready to start challenging yourself?
              </h2>
              <Link
                to="/"
                className="inline-block bg-white text-primary px-6 py-3  -lg font-semibold hover: -lg transition-all duration-200 hover:scale-101 active:scale-100"
              >
                Get Started
              </Link>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
