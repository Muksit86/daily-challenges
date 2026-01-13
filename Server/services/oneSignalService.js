import 'dotenv/config';



/**
 * OneSignal Notification Service
 * Handles sending push notifications via OneSignal REST API
 */
class OneSignalService {
    constructor() {
        this.appId = process.env.ONESIGNAL_APP_ID;
        this.restApiKey = process.env.ONESIGNAL_REST_API_KEY;
        this.apiUrl = 'https://onesignal.com/api/v1';
    }

    /**
     * Validate OneSignal configuration
     */
    isConfigured() {
        return !!(this.appId && this.restApiKey);
    }

    /**
     * Send notification to specific user by player ID
     */
    async sendToUser(playerId, title, message, data = {}) {
        try {
            if (!this.isConfigured()) {
                throw new Error('OneSignal is not configured. Check environment variables.');
            }

            const notification = {
                app_id: this.appId,
                include_player_ids: [playerId],
                headings: { en: title },
                contents: { en: message },
                data: data,
                // Web push specific settings
                web_push_topic: 'daily-challenge-reminder',
            };

            const response = await fetch(`${this.apiUrl}/notifications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${this.restApiKey}`,
                },
                body: JSON.stringify(notification),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.errors?.[0] || 'Failed to send notification');
            }

            return { success: true, data: result };
        } catch (error) {
            console.error('Error sending notification:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Send notification to multiple users
     */
    async sendToMultipleUsers(playerIds, title, message, data = {}) {
        try {
            if (!this.isConfigured()) {
                throw new Error('OneSignal is not configured.');
            }

            const notification = {
                app_id: this.appId,
                include_player_ids: playerIds,
                headings: { en: title },
                contents: { en: message },
                data: data,
            };

            const response = await fetch(`${this.apiUrl}/notifications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${this.restApiKey}`,
                },
                body: JSON.stringify(notification),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.errors?.[0] || 'Failed to send notifications');
            }

            return { success: true, data: result };
        } catch (error) {
            console.error('Error sending notifications:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Send broadcast notification to all subscribed users
     */
    async broadcast(title, message, data = {}) {
        try {
            if (!this.isConfigured()) {
                throw new Error('OneSignal is not configured.');
            }

            const notification = {
                app_id: this.appId,
                included_segments: ['All'], // Send to all subscribed users
                headings: { en: title },
                contents: { en: message },
                data: data,
            };

            const response = await fetch(`${this.apiUrl}/notifications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${this.restApiKey}`,
                },
                body: JSON.stringify(notification),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.errors?.[0] || 'Failed to broadcast notification');
            }

            return { success: true, data: result };
        } catch (error) {
            console.error('Error broadcasting notification:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Send daily challenge reminder
     */
    async sendDailyChallengeReminder(playerId, challengeName) {
        const title = "Don't forget to log your day! 📝";
        const message = `Keep your ${challengeName} streak alive. Log your progress now.`;
        const data = {
            type: 'daily_reminder',
            action: 'open_dashboard',
        };

        return await this.sendToUser(playerId, title, message, data);
    }
}

// Export singleton instance
const oneSignalService = new OneSignalService();
export default oneSignalService;
