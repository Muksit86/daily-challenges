import React from "react";
import { Link } from "react-router";
import SEO from "../Component/SEO";

export default function TermsOfService() {
    return (
        <>
            <SEO
                title="Terms of Service - ChallengerDaily"
                description="Terms and conditions for using ChallengerDaily challenge tracking service. Information about payments, refunds, and user responsibilities."
                keywords="terms of service, terms and conditions, legal, user agreement"
                ogType="article"
            />

            <div className="bg-background dark:bg-background-dark flex-1 flex flex-col items-center justify-start py-10 md:py-20 px-5">
                <div className="max-w-3xl w-full animate-fade-in">
                    {/* Header */}
                    <div className="mb-12 animate-slide-up">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">
                            Terms of Service
                        </h1>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Last updated: January 12, 2026
                        </p>
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-6 text-slate-700 dark:text-slate-300">
                        {/* Introduction */}
                        <section className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-md border dark:border-slate-700 animate-slide-up">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                Agreement to Terms
                            </h2>
                            <p className="leading-relaxed">
                                By accessing or using ChallengerDaily ("Service"), you agree to be
                                bound by these Terms of Service. If you disagree with any part of
                                these terms, you may not access the Service.
                            </p>
                        </section>

                        {/* Account Registration */}
                        <section className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-md border dark:border-slate-700 animate-slide-up">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                Account Registration
                            </h2>
                            <p className="mb-4 leading-relaxed">
                                To access premium features, you must create an account. You agree
                                to:
                            </p>
                            <ul className="space-y-3 ml-4">
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>
                                        Provide accurate, current, and complete information during
                                        registration
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>
                                        Maintain the security of your password and account
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>
                                        Accept all responsibility for activities that occur under your
                                        account
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>
                                        Notify us immediately of any unauthorized use of your account
                                    </span>
                                </li>
                            </ul>
                        </section>

                        {/* Free Trial & Payments */}
                        <section className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-md border dark:border-slate-700 animate-slide-up">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                Free Trial & Payment Terms
                            </h2>
                            <p className="mb-4 leading-relaxed">
                                <strong>Free Trial:</strong> We offer a 7-day free trial with full
                                access to all features. No payment information is required during
                                the trial period.
                            </p>
                            <p className="mb-4 leading-relaxed">
                                <strong>Premium Plan:</strong> After the trial, you can purchase
                                lifetime access for a one-time payment of ₹899.
                            </p>
                            <ul className="space-y-3 ml-4">
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>
                                        All payments are processed securely through Razorpay
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>Payment is one-time and grants lifetime access</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>All prices are in Indian Rupees (INR)</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>
                                        Premium features include: unlimited challenges, data sync
                                        across devices, and custom date options
                                    </span>
                                </li>
                            </ul>
                        </section>

                        {/* Refund Policy */}
                        <section className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-md border dark:border-slate-700 animate-slide-up">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                Refund Policy
                            </h2>
                            <p className="mb-4 leading-relaxed">
                                Due to the nature of digital products and the availability of a
                                free trial, we generally do not offer refunds. However, we will
                                consider refund requests on a case-by-case basis within 7 days of
                                purchase if:
                            </p>
                            <ul className="space-y-3 ml-4">
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>You experienced technical issues preventing service use</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>You were charged incorrectly or multiple times</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>
                                        You can demonstrate that the service did not function as
                                        advertised
                                    </span>
                                </li>
                            </ul>
                            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                                To request a refund, please{" "}
                                <Link
                                    to="/contact"
                                    className="text-primary hover:underline font-semibold"
                                >
                                    contact us
                                </Link>{" "}
                                with your payment details and reason for the request.
                            </p>
                        </section>

                        {/* User Responsibilities */}
                        <section className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-md border dark:border-slate-700 animate-slide-up">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                User Responsibilities
                            </h2>
                            <p className="mb-4 leading-relaxed">You agree NOT to:</p>
                            <ul className="space-y-3 ml-4">
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>
                                        Use the Service for any illegal or unauthorized purpose
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>
                                        Attempt to gain unauthorized access to the Service or related
                                        systems
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>
                                        Interfere with or disrupt the Service or servers/networks
                                        connected to the Service
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>
                                        Share your account credentials with others or create multiple
                                        accounts to circumvent payment
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>
                                        Reverse engineer, decompile, or disassemble any part of the
                                        Service
                                    </span>
                                </li>
                            </ul>
                        </section>

                        {/* Data & Privacy */}
                        <section className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-md border dark:border-slate-700 animate-slide-up">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                Data & Privacy
                            </h2>
                            <p className="mb-4 leading-relaxed">
                                Your use of the Service is also governed by our{" "}
                                <Link
                                    to="/privacy"
                                    className="text-primary hover:underline font-semibold"
                                >
                                    Privacy Policy
                                </Link>
                                , which describes how we collect, use, and protect your data.
                            </p>
                            <ul className="space-y-3 ml-4">
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>
                                        <strong>Free Trial Users:</strong> Data is stored locally on
                                        your device using browser localStorage
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>
                                        <strong>Premium Users:</strong> Data is stored securely in our
                                        database and synced across your devices
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>
                                        You retain ownership of all data you create in the Service
                                    </span>
                                </li>
                            </ul>
                        </section>

                        {/* Service Availability */}
                        <section className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-md border dark:border-slate-700 animate-slide-up">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                Service Availability
                            </h2>
                            <p className="leading-relaxed">
                                We strive to provide reliable service, but we do not guarantee
                                uninterrupted or error-free operation. We reserve the right to:
                            </p>
                            <ul className="space-y-3 ml-4 mt-4">
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>Modify or discontinue the Service with reasonable notice</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>
                                        Perform scheduled maintenance (we'll notify you in advance)
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>
                                        Suspend or terminate access to users who violate these terms
                                    </span>
                                </li>
                            </ul>
                        </section>

                        {/* Intellectual Property */}
                        <section className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-md border dark:border-slate-700 animate-slide-up">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                Intellectual Property
                            </h2>
                            <p className="leading-relaxed">
                                The Service and its original content, features, and functionality
                                are owned by ChallengerDaily and are protected by international
                                copyright, trademark, and other intellectual property laws. You
                                may not copy, modify, distribute, sell, or lease any part of the
                                Service without our express written permission.
                            </p>
                        </section>

                        {/* Limitation of Liability */}
                        <section className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-md border dark:border-slate-700 animate-slide-up">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                Limitation of Liability
                            </h2>
                            <p className="mb-4 leading-relaxed">
                                To the maximum extent permitted by law, ChallengerDaily shall not
                                be liable for:
                            </p>
                            <ul className="space-y-3 ml-4">
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>
                                        Any indirect, incidental, special, consequential, or punitive
                                        damages
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>
                                        Loss of profits, revenue, data, or other intangible losses
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>
                                        Damages resulting from unauthorized access to or alteration of
                                        your data
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>Damages resulting from Service interruptions or errors</span>
                                </li>
                            </ul>
                            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                                In any case, our total liability shall not exceed the amount you
                                paid for the Service (₹899 for premium users, ₹0 for trial users).
                            </p>
                        </section>

                        {/* Account Termination */}
                        <section className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-md border dark:border-slate-700 animate-slide-up">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                Account Termination
                            </h2>
                            <p className="mb-4 leading-relaxed">
                                <strong>Your Rights:</strong> You may delete your account at any
                                time from the Profile page. Upon deletion:
                            </p>
                            <ul className="space-y-3 ml-4 mb-4">
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>All your data will be permanently deleted from our servers</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>You will lose access to premium features immediately</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>This action cannot be undone</span>
                                </li>
                            </ul>
                            <p className="leading-relaxed">
                                <strong>Our Rights:</strong> We reserve the right to suspend or
                                terminate your account if you violate these Terms of Service or
                                engage in fraudulent activity.
                            </p>
                        </section>

                        {/* Changes to Terms */}
                        <section className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-md border dark:border-slate-700 animate-slide-up">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                Changes to Terms
                            </h2>
                            <p className="leading-relaxed">
                                We may update these Terms of Service from time to time. We will
                                notify you of any material changes by posting the new Terms on this
                                page and updating the "Last updated" date. Your continued use of
                                the Service after changes become effective constitutes your
                                acceptance of the revised terms.
                            </p>
                        </section>

                        {/* Governing Law */}
                        <section className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-md border dark:border-slate-700 animate-slide-up">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                Governing Law
                            </h2>
                            <p className="leading-relaxed">
                                These Terms shall be governed by and construed in accordance with
                                the laws of India. Any disputes arising from these Terms or your use
                                of the Service shall be subject to the exclusive jurisdiction of the
                                courts in India.
                            </p>
                        </section>

                        {/* Contact */}
                        <section className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-md border dark:border-slate-700 animate-slide-up">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                Contact Us
                            </h2>
                            <p className="leading-relaxed">
                                If you have any questions about these Terms of Service, please{" "}
                                <Link
                                    to="/contact"
                                    className="text-primary hover:underline font-semibold"
                                >
                                    contact us
                                </Link>
                                .
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
