/**
 * User Model
 * Represents the user entity in the database
 */

export class User {
    constructor(data) {
        this.id = data.id;
        this.email = data.email;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    /**
     * Validate user data
     * @param {Object} data - User data to validate
     * @returns {Object} - Validation result
     */
    static validate(data) {
        const errors = [];

        if (!data.email) {
            errors.push('Email is required');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.push('Invalid email format');
        }

        if (!data.password) {
            errors.push('Password is required');
        } else if (data.password.length < 6) {
            errors.push('Password must be at least 6 characters long');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}
