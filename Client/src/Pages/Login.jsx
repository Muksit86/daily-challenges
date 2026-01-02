import React from "react";

export default function Login() {
  return (
    <>
      <div className="min-h-screen bg-background dark:bg-background-dark flex-1 flex flex-col items-center justify-center gap-8 px-5 animate-fade-in">
        <div className="text-7xl mb-4 animate-bounce-in">👋</div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white text-center animate-slide-up">
          Welcome back!
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-center max-w-md animate-slide-up">
          Sign in to your account to continue tracking your daily challenges
        </p>

        <section className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-md border dark:border-slate-700 w-full md:w-5/12 flex flex-col gap-5 animate-slide-up">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          <button className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95 shadow-md mt-2">
            Sign In
          </button>

          <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
            Don't have an account?{" "}
            <span className="text-primary font-semibold cursor-pointer hover:underline">
              Sign up
            </span>
          </p>
        </section>
      </div>
    </>
  );
}
