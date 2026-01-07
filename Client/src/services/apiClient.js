/**
 * Centralized API client for making HTTP requests
 * Handles authentication, error handling, and common request patterns
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';



/**
 * Check if user is in free version
 */
export const isFreeVersion = () => {
    return localStorage.getItem('authType') === 'free';
};

/**
 * Make a GET request
 */
export const get = async (endpoint, options = {}) => {
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'GET',
            headers,
            credentials: 'include', // Send cookies
            ...options,
        });

        return handleResponse(response);
    } catch (error) {
        throw handleError(error);
    }
};

/**
 * Make a POST request
 */
export const post = async (endpoint, data = {}, options = {}) => {
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers,
            credentials: 'include', // Send cookies
            body: JSON.stringify(data),
            ...options,
        });

        return handleResponse(response);
    } catch (error) {
        throw handleError(error);
    }
};

/**
 * Make a PUT request
 */
export const put = async (endpoint, data = {}, options = {}) => {
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            headers,
            credentials: 'include', // Send cookies
            body: JSON.stringify(data),
            ...options,
        });

        return handleResponse(response);
    } catch (error) {
        throw handleError(error);
    }
};

/**
 * Make a DELETE request
 */
export const del = async (endpoint, options = {}) => {
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE',
            headers,
            credentials: 'include', // Send cookies
            ...options,
        });

        return handleResponse(response);
    } catch (error) {
        throw handleError(error);
    }
};

/**
 * Handle response from API
 */
const handleResponse = async (response) => {
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');

    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
        const error = new Error(data.error || data.message || 'Request failed');
        error.status = response.status;
        error.data = data;
        throw error;
    }

    return data;
};

/**
 * Handle errors
 */
const handleError = (error) => {
    if (error.message === 'Failed to fetch') {
        return new Error('Network error. Please check your connection.');
    }
    return error;
};

export default {
    get,
    post,
    put,
    del,
    isFreeVersion,
};
