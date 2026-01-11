import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../Healper/AuthContext";
import { LuCheck, LuArrowLeft, LuSparkles, LuClock } from "react-icons/lu";
import { FREE_TRIAL_DAYS } from "../config/clientConfig";
import { createOrder, verifyPayment } from "../services/paymentService";
import { toast } from "react-toastify";

export default function Upgrade() {
    const navigate = useNavigate();
    const { user, trialStatus } = useAuth();
    const [loading, setLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null); // 'trial' or 'premium'

    const handleContinueWithTrial = () => {
        toast.success("Welcome! Enjoy your free trial! 🎉");
        navigate("/dashboard");
    };

    const handleUpgradeToPremium = async () => {
        try {
            setLoading(true);
            setSelectedPlan("premium");

            // Create order on backend
            const order = await createOrder();

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "ChallengerDaily",
                description: "Premium Lifetime Access",
                order_id: order.id,
                handler: async function (response) {
                    try {
                        // Verify payment on backend
                        const result = await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        if (result.success) {
                            toast.success("Payment successful! You are now a premium user! 🎉");
                            // Redirect to dashboard
                            setTimeout(() => {
                                navigate("/dashboard");
                                // Refresh page to update user context
                                window.location.reload();
                            }, 1500);
                        } else {
                            toast.error("Payment verification failed. Please contact support.");
                        }
                    } catch (error) {
                        console.error("Payment verification error:", error);
                        toast.error("Payment verification failed. Please contact support.");
                    } finally {
                        setLoading(false);
                        setSelectedPlan(null);
                    }
                },
                prefill: {
                    email: user?.email || "",
                    name: user?.username || "",
                },
                theme: {
                    color: "#3B82F6", // primary color
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                        setSelectedPlan(null);
                        toast.info("Payment cancelled");
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", function (response) {
                setLoading(false);
                setSelectedPlan(null);
                toast.error("Payment failed. Please try again.");
                console.error("Payment failed:", response.error);
            });

            rzp.open();
        } catch (error) {
            setLoading(false);
            setSelectedPlan(null);
            console.error("Create order error:", error);
            toast.error(error.message || "Failed to initiate payment. Please try again.");
        }
    };

    // Check if user is already premium
    const isPremium = user?.is_premium;

    return (
        <div className="min-h-screen bg-background dark:bg-background-dark">
            {/* Header */}
            <nav className="w-full bg-white dark:bg-elevation-dark border-b-2 border-black dark:border-white">
                <div className="flex justify-between items-center md:px-4 md:py-3 p-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-black dark:text-white hover:text-primary dark:hover:text-primary transition-all"
                    >
                        <LuArrowLeft size={20} />
                        <span className="text-sm md:text-base font-medium">Back</span>
                    </button>
                    <span className="text-xl font-bold text-primary">
                        <Link to="/">ChallengerDaily</Link>
                    </span>
                    <div className="w-20"></div> {/* Spacer for center alignment */}
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 md:py-16">
                {/* Hero Section */}
                <div className="text-center mb-12 animate-fade-in">
                    <div className="text-5xl mb-4">🚀</div>
                    <h1 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-4">
                        Choose Your Plan
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                        Start your journey with a free trial or unlock unlimited potential with premium
                    </p>
                    {isPremium && (
                        <div className="mt-4 inline-block bg-green-100 dark:bg-green-900/30 border-2 border-green-500 px-4 py-2">
                            <p className="text-green-800 dark:text-green-200 font-semibold">
                                ✅ You are already a Premium user!
                            </p>
                        </div>
                    )}
                </div>

                {/* Pricing Cards */}
                <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center max-w-5xl mx-auto animate-slide-up">
                    {/* Free Trial Card */}
                    <div className="w-full md:w-1/2 bg-white dark:bg-elevation-dark border-2 border-gray-300 dark:border-gray-600 p-6 md:p-8 shadow-sharp-lg flex flex-col">
                        <div className="text-center border-b-2 border-gray-300 dark:border-gray-600 pb-6 mb-6">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <LuClock className="text-gray-600 dark:text-gray-400 text-2xl" />
                                <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                                    Free Trial
                                </h3>
                            </div>
                            <div className="flex items-center justify-center">
                                <span className="text-5xl font-bold text-gray-600 dark:text-gray-400">₹0</span>
                                <span className="text-lg text-gray-500 dark:text-gray-500 ml-2">
                                    / {FREE_TRIAL_DAYS} days
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3 mb-8 flex-1">
                            <div className="flex items-start gap-3">
                                <LuCheck className="text-primary text-xl flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300">
                                    <strong>Unlimited challenges</strong> (during trial)
                                </span>
                            </div>
                            <div className="flex items-start gap-3">
                                <LuCheck className="text-primary text-xl flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300">Track daily progress</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <LuCheck className="text-primary text-xl flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300">Visual progress tracking</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <LuCheck className="text-primary text-xl flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300">
                                    <strong>Custom date options</strong>
                                </span>
                            </div>
                            <div className="flex items-start gap-3">
                                <LuCheck className="text-primary text-xl flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300">
                                    All premium features for {FREE_TRIAL_DAYS} days
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleContinueWithTrial}
                            disabled={loading || isPremium}
                            className="w-full px-6 py-3 bg-gray-700 dark:bg-gray-600 text-white font-semibold hover:bg-gray-800 dark:hover:bg-gray-500 transition-all hover:scale-102 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {isPremium ? "Already Premium" : "Continue with Free Trial"}
                        </button>
                    </div>

                    {/* Premium Card */}
                    <div className="w-full md:w-1/2 bg-white dark:bg-elevation-dark border-2 border-primary p-6 md:p-8 shadow-sharp-xl relative flex flex-col">
                        {/* Popular Badge */}
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 text-sm font-bold">
                            RECOMMENDED
                        </div>

                        <div className="text-center border-b-2 border-primary pb-6 mb-6">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <LuSparkles className="text-primary text-2xl" />
                                <h3 className="text-2xl font-bold text-black dark:text-white">
                                    Premium Forever
                                </h3>
                            </div>
                            <div className="flex items-center justify-center">
                                <span className="text-5xl font-bold text-primary">₹499</span>
                                <span className="text-lg text-gray-600 dark:text-gray-400 ml-2">
                                    one-time
                                </span>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                                No subscriptions • Pay once, use forever
                            </p>
                        </div>

                        <div className="space-y-3 mb-8 flex-1">
                            <div className="flex items-start gap-3">
                                <LuCheck className="text-primary text-xl flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300">
                                    <strong>Unlimited challenges</strong> forever
                                </span>
                            </div>
                            <div className="flex items-start gap-3">
                                <LuCheck className="text-primary text-xl flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300">Track daily progress</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <LuCheck className="text-primary text-xl flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300">Visual progress tracking</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <LuCheck className="text-primary text-xl flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300">
                                    <strong>Custom date options</strong>
                                </span>
                            </div>
                            <div className="flex items-start gap-3">
                                <LuCheck className="text-primary text-xl flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300">
                                    <strong>Sync across devices</strong>
                                </span>
                            </div>
                            <div className="flex items-start gap-3">
                                <LuCheck className="text-primary text-xl flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300">
                                    <strong>Secure cloud backup</strong>
                                </span>
                            </div>
                            <div className="flex items-start gap-3">
                                <LuCheck className="text-primary text-xl flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300">No ads, no limits</span>
                            </div>
                        </div>

                        <button
                            onClick={handleUpgradeToPremium}
                            disabled={loading || isPremium}
                            className="w-full px-6 py-3 bg-primary text-white font-bold text-lg hover:scale-105 transition-all shadow-sharp disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                        >
                            {loading && selectedPlan === "premium" ? (
                                "Processing..."
                            ) : isPremium ? (
                                "Already Premium"
                            ) : (
                                <>
                                    <LuSparkles size={20} />
                                    Upgrade Now
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Info Section */}
                <div className="mt-16 max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-black dark:text-white mb-8">
                        Why Choose Premium?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-elevation-dark border-2 border-black dark:border-white p-6">
                            <div className="text-4xl mb-3">🚀</div>
                            <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                                Unlimited Growth
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                                Track as many challenges as you want. No limits, no restrictions.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-elevation-dark border-2 border-black dark:border-white p-6">
                            <div className="text-4xl mb-3">☁️</div>
                            <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                                Sync Everywhere
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                                Access your challenges from any device. Your progress is always backed up.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-elevation-dark border-2 border-black dark:border-white p-6">
                            <div className="text-4xl mb-3">⚡</div>
                            <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                                Advanced Features
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                                Set custom challenge durations and get more control over your goals.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-elevation-dark border-2 border-black dark:border-white p-6">
                            <div className="text-4xl mb-3">💰</div>
                            <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                                One-Time Payment
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                                Pay once, use forever. No subscriptions or recurring charges.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
