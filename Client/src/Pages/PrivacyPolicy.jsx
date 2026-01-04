import React from "react";

export default function PrivacyPolicy() {
  return (
    <>
      <div className="bg-background dark:bg-background-dark flex-1 flex flex-col items-center justify-start py-10 md:py-20 px-5">
        <div className="max-w-3xl w-full animate-fade-in">
          {/* Header */}
          <div className="mb-12 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">
              Privacy Policy
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Last updated: January 2, 2026
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-6 text-slate-700 dark:text-slate-300">
            {/* Introduction */}
            <section className="bg-white dark:bg-slate-800 p-6 md:p-8    -md border dark:border-slate-700 animate-slide-up">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Introduction
              </h2>
              <p className="leading-relaxed">
                Welcome to ChallengerDaily. We are committed to protecting your
                privacy and ensuring you have a positive experience on our
                website. This Privacy Policy explains our data practices,
                including what information we collect, how we use it, and your
                rights.
              </p>
            </section>

            {/* Data Collection */}
            <section className="bg-white dark:bg-slate-800 p-6 md:p-8    -md border dark:border-slate-700 animate-slide-up">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Information We Collect
              </h2>
              <p className="mb-4 leading-relaxed">
                ChallengerDaily is a local-first application. Most of your data
                is stored on your device for privacy and security.
              </p>
              <ul className="space-y-3 ml-4">
                <li className="flex gap-3">
                  <span className="text-primary font-bold shrink-0">•</span>
                  <span>
                    <strong>Challenge Data:</strong> Titles, durations, and
                    creation dates of your challenges
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold shrink-0">•</span>
                  <span>
                    <strong>Daily Logs:</strong> Records of your daily challenge
                    completions
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold shrink-0">•</span>
                  <span>
                    <strong>User Preferences:</strong> Theme preference
                    (light/dark mode)
                  </span>
                </li>
              </ul>
            </section>

            {/* LocalStorage Usage */}
            <section className="bg-white dark:bg-slate-800 p-6 md:p-8    -md border dark:border-slate-700 animate-slide-up">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                localStorage Usage
              </h2>
              <p className="mb-4 leading-relaxed">
                We use browser localStorage to store your data locally on your
                device. This includes:
              </p>
              <ul className="space-y-3 ml-4">
                <li className="flex gap-3">
                  <span className="text-primary font-bold shrink-0">•</span>
                  <span>
                    <strong>Challenges:</strong> All your challenge data (stored
                    as JSON)
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold shrink-0">•</span>
                  <span>
                    <strong>Logs:</strong> Daily completion records for each
                    challenge
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold shrink-0">•</span>
                  <span>
                    <strong>Theme Preference:</strong> Your selected light/dark
                    mode setting
                  </span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                All data stored in localStorage remains on your device and is
                never sent to our servers.
              </p>
            </section>

            {/* Cookies */}
            <section className="bg-white dark:bg-slate-800 p-6 md:p-8    -md border dark:border-slate-700 animate-slide-up">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Cookies
              </h2>
              <p className="mb-4 leading-relaxed">
                ChallengerDaily uses minimal cookies, primarily for:
              </p>
              <ul className="space-y-3 ml-4">
                <li className="flex gap-3">
                  <span className="text-primary font-bold shrink-0">•</span>
                  <span>
                    <strong>Analytics:</strong> To understand user behavior and
                    improve our service
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold shrink-0">•</span>
                  <span>
                    <strong>Advertisement:</strong> For serving personalized ads
                    through Google AdSense
                  </span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                You can control cookies through your browser settings. Disabling
                cookies may affect some functionality.
              </p>
            </section>

            {/* Advertising */}
            <section className="bg-white dark:bg-slate-800 p-6 md:p-8    -md border dark:border-slate-700 animate-slide-up">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Advertising (Google AdSense)
              </h2>
              <p className="mb-4 leading-relaxed">
                ChallengerDaily uses Google AdSense to display advertisements.
                Here's what you should know:
              </p>
              <ul className="space-y-3 ml-4">
                <li className="flex gap-3">
                  <span className="text-primary font-bold shrink-0">•</span>
                  <span>
                    <strong>Personalization:</strong> Google may use cookies and
                    identifiers to serve personalized ads based on your
                    interests
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold shrink-0">•</span>
                  <span>
                    <strong>Data Collection:</strong> Google collects
                    information about your browsing behavior across their
                    partner sites
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold shrink-0">•</span>
                  <span>
                    <strong>Opt-out:</strong> You can opt out of personalized
                    advertising in your Google account settings
                  </span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                For more information, visit{" "}
                <a
                  href="https://www.google.com/policies/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google's Privacy Policy
                </a>
              </p>
            </section>

            {/* Data Security */}
            <section className="bg-white dark:bg-slate-800 p-6 md:p-8    -md border dark:border-slate-700 animate-slide-up">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Data Security
              </h2>
              <p className="leading-relaxed">
                Since most data is stored locally on your device, security
                depends on your device's security. We recommend:
              </p>
              <ul className="space-y-3 ml-4 mt-4">
                <li className="flex gap-3">
                  <span className="text-primary font-bold shrink-0">•</span>
                  <span>
                    Using a secure browser and keeping your device software
                    updated
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold shrink-0">•</span>
                  <span>
                    Not sharing your device with others if data privacy is a
                    concern
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold shrink-0">•</span>
                  <span>
                    Regularly clearing cookies and browsing data if desired
                  </span>
                </li>
              </ul>
            </section>

            {/* User Rights */}
            <section className="bg-white dark:bg-slate-800 p-6 md:p-8    -md border dark:border-slate-700 animate-slide-up">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Your Rights
              </h2>
              <ul className="space-y-3 ml-4">
                <li className="flex gap-3">
                  <span className="text-primary font-bold shrink-0">•</span>
                  <span>
                    <strong>Access:</strong> You can access all your data
                    through your browser's localStorage
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold shrink-0">•</span>
                  <span>
                    <strong>Delete:</strong> You can clear all data by clearing
                    your browser's localStorage
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold shrink-0">•</span>
                  <span>
                    <strong>Control:</strong> You have full control over what
                    data is stored on your device
                  </span>
                </li>
              </ul>
            </section>

            {/* Contact */}
            <section className="bg-white dark:bg-slate-800 p-6 md:p-8    -md border dark:border-slate-700 animate-slide-up">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Contact Us
              </h2>
              <p className="leading-relaxed">
                If you have questions about this Privacy Policy or our privacy
                practices, please{" "}
                <a
                  href="/contact"
                  className="text-primary hover:underline font-semibold"
                >
                  contact us
                </a>
                .
              </p>
            </section>

            {/* Changes */}
            <section className="bg-white dark:bg-slate-800 p-6 md:p-8    -md border dark:border-slate-700 animate-slide-up">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Changes to This Privacy Policy
              </h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. Changes
                will be posted on this page with an updated "Last updated" date.
                Your continued use of ChallengerDaily after changes indicates
                your acceptance of the updated policy.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
