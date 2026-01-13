import ONE_SIGNAL_CONFIG from '../config/oneSignalConfig';

class NotificationService {
    constructor() {
        this.initialized = false;
        this.initializing = false;
        this.playerId = null;
    }

    /**
     * Initialize OneSignal SDK
     */
    async initializeOneSignal() {
        try {
            // Prevent multiple concurrent initializations
            if (this.initialized) {
                console.log('OneSignal already initialized');
                return true;
            }

            if (this.initializing) {
                console.log('OneSignal initialization in progress, waiting...');
                // Wait for initialization to complete
                while (this.initializing) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
                return this.initialized;
            }

            this.initializing = true;

            // Check if OneSignal is loaded
            if (!window.OneSignal) {
                console.error('OneSignal SDK not loaded');
                this.initializing = false;
                return false;
            }

            // Initialize OneSignal
            await window.OneSignal.init({
                appId: ONE_SIGNAL_CONFIG.appId,
                allowLocalhostAsSecureOrigin: ONE_SIGNAL_CONFIG.allowLocalhostAsSecureOrigin,
                serviceWorkerParam: ONE_SIGNAL_CONFIG.serviceWorkerParam,
                autoResubscribe: ONE_SIGNAL_CONFIG.autoResubscribe,
            });

            this.initialized = true;
            this.initializing = false;

            // Set up event listeners
            this.setupEventListeners();

            console.log('OneSignal initialized successfully');
            return true;
        } catch (error) {
            console.error('Error initializing OneSignal:', error);
            this.initializing = false;
            return false;
        }
    }

    /**
     * Setup event listeners for notifications
     */
    setupEventListeners() {
        if (!window.OneSignal) return;

        // Listen for subscription changes
        window.OneSignal.Notifications.addEventListener('permissionChange', (permission) => {
            console.log('Notification permission changed:', permission);
        });

        // Listen for notification displayed
        window.OneSignal.Notifications.addEventListener('foregroundWillDisplay', (event) => {
            console.log('Notification will display:', event);
        });

        // Listen for notification clicked
        window.OneSignal.Notifications.addEventListener('click', (event) => {
            console.log('Notification clicked:', event);
            // You can add custom navigation logic here based on notification data
        });
    }

    /**
     * Check if notifications are supported
     */
    isSupported() {
        return 'Notification' in window && 'serviceWorker' in navigator;
    }

    /**
     * Check current notification permission
     */
    async getPermission() {
        if (!this.isSupported()) return 'unsupported';

        try {
            if (window.OneSignal) {
                const permission = await window.OneSignal.Notifications.permission;
                return permission ? 'granted' : 'default';
            }
            return Notification.permission;
        } catch (error) {
            console.error('Error getting permission:', error);
            return 'default';
        }
    }

    /**
     * Request notification permission from user
     */
    async requestPermission() {
        try {
            if (!this.initialized || !window.OneSignal) {
                console.error('OneSignal must be initialized before requesting permission');
                return false;
            }

            // Request permission through OneSignal
            const permission = await window.OneSignal.Notifications.requestPermission();

            return permission;
        } catch (error) {
            console.error('Error requesting permission:', error);
            return false;
        }
    }

    /**
     * Check if user is subscribed to notifications
     */
    async isSubscribed() {
        try {
            if (!this.initialized || !window.OneSignal) {
                return false;
            }

            const isPushEnabled = await window.OneSignal.User.PushSubscription.optedIn;
            return isPushEnabled;
        } catch (error) {
            console.error('Error checking subscription:', error);
            return false;
        }
    }

    /**
     * Subscribe user to notifications
     */
    async subscribeUser() {
        try {
            if (!this.initialized || !window.OneSignal) {
                console.error('OneSignal must be initialized before subscribing');
                return { success: false, error: 'OneSignal not initialized' };
            }

            // Request permission first
            const hasPermission = await this.requestPermission();
            if (!hasPermission) {
                return { success: false, error: 'Permission denied' };
            }

            // Opt in to push notifications
            await window.OneSignal.User.PushSubscription.optIn();

            // Get Player ID
            const playerId = await this.getPlayerId();

            return { success: true, playerId };
        } catch (error) {
            console.error('Error subscribing user:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Unsubscribe user from notifications
     */
    async unsubscribeUser() {
        try {
            if (!this.initialized || !window.OneSignal) {
                return { success: false, error: 'OneSignal not initialized' };
            }

            await window.OneSignal.User.PushSubscription.optOut();

            return { success: true };
        } catch (error) {
            console.error('Error unsubscribing user:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Get OneSignal Player ID (Subscription ID)
     */
    async getPlayerId() {
        try {
            if (!this.initialized || !window.OneSignal) {
                return null;
            }

            const subscriptionId = await window.OneSignal.User.PushSubscription.id;
            this.playerId = subscriptionId;

            return subscriptionId;
        } catch (error) {
            console.error('Error getting player ID:', error);
            return null;
        }
    }

    /**
     * Sync Player ID with backend
     */
    async syncPlayerIdWithBackend(userId, token) {
        try {
            const playerId = await this.getPlayerId();

            if (!playerId) {
                return { success: false, error: 'No player ID' };
            }

            // Send to backend
            const response = await fetch(`${import.meta.env.VITE_API_URL}/notifications/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId,
                    playerId,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to sync player ID');
            }

            return { success: true, playerId };
        } catch (error) {
            console.error('Error syncing player ID:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Set external user ID (link OneSignal user to your user ID)
     */
    async setExternalUserId(userId) {
        try {
            if (!this.initialized || !window.OneSignal) {
                return false;
            }

            await window.OneSignal.login(userId);

            return true;
        } catch (error) {
            console.error('Error setting external user ID:', error);
            return false;
        }
    }
}

// Export singleton instance
const notificationService = new NotificationService();
export default notificationService;
