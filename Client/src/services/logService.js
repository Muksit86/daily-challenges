/**
 * Log API service
 * Handles all log-related API requests
 */

import { get, post, put, del } from './apiClient.js';

/**
 * Create a new log entry
 * @param {number} challengeId - Challenge ID
 * @param {string} date - ISO date string
 * @param {boolean} completed - Whether the challenge was completed
 * @param {string} notes - Optional notes
 * @param {string} mood - Optional mood
 * @returns {Promise<Object>} Created log
 */
export const createLog = async (challengeId, date, completed = true, notes = '', mood = null) => {
    const response = await post('/logs', {
        challenge_id: challengeId,
        date,
        completed,
        notes,
        mood,
    });
    return response.log;
};

/**
 * Get logs with optional filters
 * @param {Object} filters - Query parameters
 * @param {number} filters.challenge_id - Filter by challenge ID
 * @param {string} filters.date - Filter by specific date
 * @param {string} filters.start_date - Filter by start date range
 * @param {string} filters.end_date - Filter by end date range
 * @returns {Promise<Array>} Array of logs
 */
export const getLogs = async (filters = {}) => {
    const queryParams = new URLSearchParams();

    if (filters.challenge_id) queryParams.append('challenge_id', filters.challenge_id);
    if (filters.date) queryParams.append('date', filters.date);
    if (filters.start_date) queryParams.append('start_date', filters.start_date);
    if (filters.end_date) queryParams.append('end_date', filters.end_date);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/logs?${queryString}` : '/logs';

    const response = await get(endpoint);
    return response.logs;
};

/**
 * Get a specific log by ID
 * @param {number} id - Log ID
 * @returns {Promise<Object>} Log object
 */
export const getLogById = async (id) => {
    const response = await get(`/logs/${id}`);
    return response.log;
};

/**
 * Update a log
 * @param {number} id - Log ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated log
 */
export const updateLog = async (id, updates) => {
    const response = await put(`/logs/${id}`, updates);
    return response.log;
};

/**
 * Delete a log
 * @param {number} id - Log ID
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteLog = async (id) => {
    return await del(`/logs/${id}`);
};

export default {
    createLog,
    getLogs,
    getLogById,
    updateLog,
    deleteLog,
};
