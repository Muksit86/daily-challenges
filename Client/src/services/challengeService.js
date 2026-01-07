/**
 * Challenge API service
 * Handles all challenge-related API requests
 */

import { get, post, put, del } from './apiClient.js';

/**
 * Create a new challenge
 * @param {string} title - Challenge title
 * @param {number} duration - Challenge duration in days
 * @param {string} description - Optional challenge description
 * @returns {Promise<Object>} Created challenge
 */
export const createChallenge = async (title, duration, description = '') => {
    const response = await post('/challenges', {
        title,
        duration,
        description,
    });
    return response.challenge;
};

/**
 * Get all challenges for the authenticated user
 * @returns {Promise<Array>} Array of challenges
 */
export const getChallenges = async () => {
    const response = await get('/challenges');
    return response.challenges;
};

/**
 * Get a specific challenge by ID
 * @param {number} id - Challenge ID
 * @returns {Promise<Object>} Challenge object
 */
export const getChallengeById = async (id) => {
    const response = await get(`/challenges/${id}`);
    return response.challenge;
};

/**
 * Update a challenge
 * @param {number} id - Challenge ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated challenge
 */
export const updateChallenge = async (id, updates) => {
    const response = await put(`/challenges/${id}`, updates);
    return response.challenge;
};

/**
 * Delete a challenge
 * @param {number} id - Challenge ID
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteChallenge = async (id) => {
    return await del(`/challenges/${id}`);
};

export default {
    createChallenge,
    getChallenges,
    getChallengeById,
    updateChallenge,
    deleteChallenge,
};
