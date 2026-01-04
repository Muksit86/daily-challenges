/**
 * Challenge Model
 * Represents a user's challenge in the database
 */

export class Challenge {
    constructor(data) {
        this.id = data.id;
        this.user_id = data.user_id;
        this.title = data.title;
        this.description = data.description;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    /**
     * Validate challenge data
     * @param {Object} data - Challenge data to validate
     * @returns {Object} - Validation result
     */
    static validate(data) {
        const errors = [];

        if (!data.title) {
            errors.push('Title is required');
        } else if (data.title.trim().length < 3) {
            errors.push('Title must be at least 3 characters long');
        }

        if (data.description && data.description.length > 500) {
            errors.push('Description cannot exceed 500 characters');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}
