import Razorpay from 'razorpay';
import crypto from 'crypto';
import { supabase } from '../config/supabase.js';

/**
 * Create Razorpay Order
 * @route POST /api/payment/create-order
 */
export const createOrder = async (req, res) => {
    try {
        const user = req.user;

        // Check if user is already premium
        if (user.user_metadata?.is_premium) {
            return res.status(400).json({
                error: 'You are already a premium user'
            });
        }

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: 49900, // ₹499 in paise (₹499 * 100)
            currency: 'INR',
            receipt: `receipt_${user.id.slice(0, 10)}_${Date.now().toString().slice(-6)}`,
            notes: {
                user_id: user.id,
                email: user.email,
                username: user.user_metadata?.username || '',
            }
        };

        const order = await razorpay.orders.create(options);

        res.json({
            success: true,
            order: order
        });
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({
            error: 'Failed to create order. Please try again.'
        });
    }
};

/**
 * Verify Payment
 * @route POST /api/payment/verify
 */
export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const user = req.user;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                error: 'Missing payment details'
            });
        }

        // Verify signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                error: 'Invalid payment signature'
            });
        }

        // Payment is valid - Update user to premium and paid account
        const { error: updateError } = await supabase.auth.admin.updateUserById(
            user.id,
            {
                user_metadata: {
                    ...user.user_metadata,
                    account_type: 'paid',
                    is_premium: true,
                    trial_ends_at: null,
                    premium_activated_at: new Date().toISOString(),
                    payment_id: razorpay_payment_id,
                    order_id: razorpay_order_id,
                }
            }
        );

        if (updateError) {
            console.error('Failed to update user:', updateError);
            return res.status(500).json({
                error: 'Payment verified but failed to update account. Contact support.'
            });
        }

        res.json({
            success: true,
            message: 'Payment verified successfully. You are now a premium user!'
        });
    } catch (error) {
        console.error('Verify payment error:', error);
        res.status(500).json({
            error: 'Failed to verify payment. Please contact support.'
        });
    }
};

/**
 * Webhook Handler (for future use after deployment)
 * @route POST /api/payment/webhook
 */
export const handleWebhook = async (req, res) => {
    try {
        // TODO: Implement after deployment
        // Verify webhook signature
        // Handle payment.captured and payment.failed events

        res.json({ received: true });
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
};
