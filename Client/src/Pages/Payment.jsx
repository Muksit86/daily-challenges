import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../Healper/AuthContext";
import { LuCheck, LuArrowLeft } from "react-icons/lu";
import { FREE_TRIAL_DAYS } from "../config/clientConfig";
import { createOrder, verifyPayment } from "../services/paymentService";
import { toast } from "react-toastify";

export default function Payment() {
    const navigate = useNavigate();
    const { user, trialStatus } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleUpgrade = async () => {
        try {
            setLoading(true);

            // Create order on backend
            const order = await createOrder();

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: 'ChallengerDaily',
                description: 'Premium Lifetime Access',
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
                            toast.success('Payment successful! You are now a premium user! 🎉');
                            // Redirect to dashboard
                            setTimeout(() => {
                                navigate('/dashboard');
                                // Refresh page to update user context
                                window.location.reload();
                            }, 1500);
                        } else {
                            toast.error('Payment verification failed. Please contact support.');
                        }
                    } catch (error) {
                        console.error('Payment verification error:', error);
                        toast.error('Payment verification failed. Please contact support.');
                    } finally {
                        setLoading(false);
                    }
                },
                prefill: {
                    email: user?.email || '',
                    name: user?.username || '',
                },
                theme: {
                    color: '#3B82F6', // primary color
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                        toast.info('Payment cancelled');
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                setLoading(false);
                toast.error('Payment failed. Please try again.');
                console.error('Payment failed:', response.error);
            });

            rzp.open();
        } catch (error) {
            setLoading(false);
            console.error('Create order error:', error);
            toast.error(error.message || 'Failed to initiate payment. Please try again.');
        }
    };

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
                        <Link to="/">Challenge Hub</Link>
                    </span>
                    <div className="w-20"></div> {/* Spacer for center alignment */}
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 md:py-16">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-4">
                        Unlock Your Full Potential
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                        Upgrade to premium and track unlimited challenges with advanced features
                    </p>
                    {trialStatus.isExpired && (
                        <div className="mt-4 inline-block bg-orange-100 dark:bg-orange-900/30 border-2 border-orange-500 px-4 py-2">
                            <p className="text-orange-800 dark:text-orange-200 font-semibold">
                                Your {FREE_TRIAL_DAYS}-day free trial has ended
                            </p>
                        </div>
                    )}
                </div>

                {/* Pricing Cards */}
                <div className="flex flex-col md:flex-row gap-8 items-center justify-center max-w-5xl mx-auto">
                    {/* Free Trial Card */}
                    <div className="w-full md:w-1/2 bg-white dark:bg-elevation-dark border-2 border-gray-300 dark:border-gray-600 p-8 shadow-sharp-lg">
                        <div className="text-center border-b-2 border-gray-300 dark:border-gray-600 pb-6 mb-6">
                            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">
                                Free Trial
                            </h3>
                            <div className="flex items-center justify-center">
                                <span className="text-5xl font-bold text-gray-600 dark:text-gray-400">₹0</span>
                                <span className="text-lg text-gray-500 dark:text-gray-500 ml-2">
                                    / {FREE_TRIAL_DAYS} days
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3 mb-8">
                            <div className="flex items-start gap-3">
                                <LuCheck className="text-primary text-xl flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300"><strong>Unlimited challenges</strong> (during trial)</span>
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
                                <span className="text-gray-700 dark:text-gray-300"><strong>Custom date options</strong></span>
                            </div>
                            <div className="flex items-start gap-3">
                                <LuCheck className="text-primary text-xl flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300">All premium features (for {FREE_TRIAL_DAYS} days)</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <LuCheck className="text-primary text-xl flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300">Data stored locally only</span>
                            </div>
                        </div>

                        <button
                            disabled
                            className="w-full px-6 py-3 bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 font-semibold cursor-not-allowed"
                        >
                            Trial Active / Ended
                        </button>
                    </div>

                    {/* Premium Card */}
                    <div className="w-full md:w-1/2 bg-white dark:bg-elevation-dark border-2 border-primary p-8 shadow-sharp-xl relative">
                        {/* Popular Badge */}
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 text-sm font-bold">
                            RECOMMENDED
                        </div>

                        <div className="text-center border-b-2 border-primary pb-6 mb-6">
                            <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
                                Premium Forever
                            </h3>
                            <div className="flex items-center justify-center">
                                <span className="text-5xl font-bold text-primary">₹499</span>
                                <span className="text-lg text-gray-600 dark:text-gray-400 ml-2">
                                    one-time
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3 mb-8">
                            <div className="flex items-start gap-3">
                                <LuCheck className="text-primary text-xl flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300">
                                    <strong>Unlimited challenges</strong>
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
                                <span className="text-gray-700 dark:text-gray-300">No ads</span>
                            </div>
                        </div>

                        <button
                            onClick={handleUpgrade}
                            disabled={loading}
                            className="block w-full text-center px-6 py-3 bg-primary text-white font-bold text-lg hover:scale-105 transition-all shadow-sharp disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {loading ? 'Processing...' : 'Upgrade Now'}
                        </button>
                    </div>
                </div>

                {/* Already Have Account */}
                <div className="text-center mt-12">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Already have an account?
                    </p>
                    <Link
                        to="/login"
                        className="inline-block px-8 py-3 border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all"
                    >
                        Sign In
                    </Link>
                </div>

                {/* FAQ/Info Section */}
                <div className="mt-16 max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-black dark:text-white mb-8">
                        Why Upgrade?
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
