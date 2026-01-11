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
            amount: 89900, // ₹899 in paise (₹899 * 100)
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
 * Webhook Handler
 * @route POST /api/payment/webhook
 */
export const handleWebhook = async (req, res) => {
    try {
        // Get the signature from headers
        const webhookSignature = req.headers['x-razorpay-signature'];

        if (!webhookSignature) {
            console.error('Webhook signature missing');
            return res.status(400).json({ error: 'Signature missing' });
        }

        // Verify webhook signature
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

        if (!webhookSecret) {
            console.error('RAZORPAY_WEBHOOK_SECRET not configured');
            return res.status(500).json({ error: 'Webhook secret not configured' });
        }

        const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(JSON.stringify(req.body))
            .digest('hex');

        if (expectedSignature !== webhookSignature) {
            console.error('Invalid webhook signature');
            return res.status(400).json({ error: 'Invalid signature' });
        }

        // Signature verified - process the event
        const event = req.body.event;
        const payload = req.body.payload;

        console.log('Webhook received:', event);

        switch (event) {
            case 'payment.captured':
                await handlePaymentCaptured(payload);
                break;

            case 'payment.failed':
                await handlePaymentFailed(payload);
                break;

            case 'payment.authorized':
                console.log('Payment authorized:', payload.payment.entity.id);
                break;

            case 'order.paid':
                console.log('Order paid:', payload.order.entity.id);
                break;

            default:
                console.log('Unhandled webhook event:', event);
        }

        res.json({ received: true });
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
};

/**
 * Handle payment.captured event
 */
async function handlePaymentCaptured(payload) {
    try {
        const payment = payload.payment.entity;
        const userId = payment.notes?.user_id;

        if (!userId) {
            console.error('User ID not found in payment notes');
            return;
        }

        console.log(`Processing payment.captured for user ${userId}`);

        // Get current user data
        const { data: userData, error: fetchError } = await supabase.auth.admin.getUserById(userId);

        if (fetchError || !userData.user) {
            console.error('Failed to fetch user:', fetchError);
            return;
        }

        // Check if already premium (avoid duplicate processing)
        if (userData.user.user_metadata?.is_premium) {
            console.log('User already premium, skipping update');
            return;
        }

        // Update user to premium
        const { error: updateError } = await supabase.auth.admin.updateUserById(
            userId,
            {
                user_metadata: {
                    ...userData.user.user_metadata,
                    account_type: 'paid',
                    is_premium: true,
                    trial_ends_at: null,
                    premium_activated_at: new Date().toISOString(),
                    payment_id: payment.id,
                    order_id: payment.order_id,
                }
            }
        );

        if (updateError) {
            console.error('Failed to update user to premium:', updateError);
        } else {
            console.log(`Successfully upgraded user ${userId} to premium`);
        }
    } catch (error) {
        console.error('Error handling payment.captured:', error);
    }
}

/**
 * Handle payment.failed event
 */
async function handlePaymentFailed(payload) {
    try {
        const payment = payload.payment.entity;
        const userId = payment.notes?.user_id;

        console.log('Payment failed:', {
            paymentId: payment.id,
            userId: userId,
            reason: payment.error_description || 'Unknown',
        });

        // You can optionally notify the user via email or store failed payment attempts
        // For now, just log it
    } catch (error) {
        console.error('Error handling payment.failed:', error);
    }
}
