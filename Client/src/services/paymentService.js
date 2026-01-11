/**
 * Payment API service
 * Handles all payment-related API requests
 */

import { post } from './apiClient.js';

/**
 * Create Razorpay order
 * @returns {Promise<Object>} Order object with order_id, amount, currency
 */
export const createOrder = async () => {
    const response = await post('/payment/create-order');
    return response.order;
};

/**
 * Verify payment after successful Razorpay checkout
 * @param {Object} paymentData - Payment response from Razorpay
 * @param {string} paymentData.razorpay_order_id - Order ID
 * @param {string} paymentData.razorpay_payment_id - Payment ID
 * @param {string} paymentData.razorpay_signature - Payment signature
 * @returns {Promise<Object>} Verification result
 */
export const verifyPayment = async (paymentData) => {
    return await post('/payment/verify', paymentData);
};

export default {
    createOrder,
    verifyPayment,
};
