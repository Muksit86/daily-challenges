/**
 * Log Model
 * Represents a daily challenge log entry in the database
 */

export class Log {
    constructor(data) {
        this.id = data.id;
        this.user_id = data.user_id;
        this.challenge_id = data.challenge_id;
        this.date = data.date;
        this.completed = data.completed || false;
        this.notes = data.notes;
        this.mood = data.mood;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    /**
     * Validate log data
     * @param {Object} data - Log data to validate
     * @returns {Object} - Validation result
     */
    static validate(data) {
        const errors = [];

        if (!data.date) {
            errors.push('Date is required');
        } else if (isNaN(Date.parse(data.date))) {
            errors.push('Invalid date format');
        }

        if (data.mood && !['happy', 'sad', 'neutral'].includes(data.mood)) {
            errors.push('Mood must be one of: happy, sad, neutral');
        }

        if (data.notes && data.notes.length > 1000) {
            errors.push('Notes cannot exceed 1000 characters');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}
