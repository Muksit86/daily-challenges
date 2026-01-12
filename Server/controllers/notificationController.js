import { supabase } from '../config/supabase.js';
import oneSignalService from '../services/oneSignalService.js';

/**
 * Register user's OneSignal Player ID
 */
export const registerPlayerId = async (req, res) => {
    try {
        const { playerId } = req.body;
        const userId = req.user.id; // From auth middleware

        if (!playerId) {
            return res.status(400).json({ error: 'Player ID is required' });
        }

        // Update user's OneSignal player ID in database
        const { data, error } = await supabase
            .from('users')
            .update({
                onesignal_player_id: playerId,
                notifications_enabled: true,
            })
            .eq('id', userId)
            .select()
            .single();

        if (error) {
            console.error('Error registering player ID:', error);
            return res.status(500).json({ error: 'Failed to register player ID' });
        }

        console.log(`Player ID registered for user ${userId}:`, playerId);
        res.json({
            success: true,
            message: 'Player ID registered successfully',
            data,
        });
    } catch (error) {
        console.error('Error in registerPlayerId:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Unregister user's OneSignal Player ID
 */
export const unregisterPlayerId = async (req, res) => {
    try {
        const userId = req.user.id;

        const { data, error } = await supabase
            .from('users')
            .update({
                onesignal_player_id: null,
                notifications_enabled: false,
            })
            .eq('id', userId)
            .select()
            .single();

        if (error) {
            console.error('Error unregistering player ID:', error);
            return res.status(500).json({ error: 'Failed to unregister player ID' });
        }

        res.json({
            success: true,
            message: 'Player ID unregistered successfully',
        });
    } catch (error) {
        console.error('Error in unregisterPlayerId:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Send test notification to current user
 */
export const sendTestNotification = async (req, res) => {
    try {
        const userId = req.user.id;

        // Get user's player ID
        const { data: user, error } = await supabase
            .from('users')
            .select('onesignal_player_id, email')
            .eq('id', userId)
            .single();

        if (error || !user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.onesignal_player_id) {
            return res.status(400).json({ error: 'No OneSignal player ID registered' });
        }

        // Send test notification
        const result = await oneSignalService.sendToUser(
            user.onesignal_player_id,
            'Test Notification 🔔',
            'This is a test notification from ChallengerDaily!',
            { type: 'test' }
        );

        if (!result.success) {
            return res.status(500).json({ error: result.error });
        }

        res.json({
            success: true,
            message: 'Test notification sent',
            data: result.data,
        });
    } catch (error) {
        console.error('Error in sendTestNotification:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Send notification to specific user (admin only - optional)
 */
export const sendNotificationToUser = async (req, res) => {
    try {
        const { userId, title, message, data } = req.body;

        if (!userId || !title || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Get user's player ID
        const { data: user, error } = await supabase
            .from('users')
            .select('onesignal_player_id')
            .eq('id', userId)
            .single();

        if (error || !user || !user.onesignal_player_id) {
            return res.status(404).json({ error: 'User not found or not subscribed' });
        }

        // Send notification
        const result = await oneSignalService.sendToUser(
            user.onesignal_player_id,
            title,
            message,
            data || {}
        );

        if (!result.success) {
            return res.status(500).json({ error: result.error });
        }

        res.json({
            success: true,
            message: 'Notification sent',
            data: result.data,
        });
    } catch (error) {
        console.error('Error in sendNotificationToUser:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
