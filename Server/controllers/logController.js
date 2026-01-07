import { supabase } from '../config/supabase.js';
import { Log } from '../models/Log.js';

/**
 * Create a new log entry
 * @route POST /api/logs
 */
export const createLog = async (req, res) => {
    try {
        const { challenge_id, date, completed, notes, mood } = req.body;
        const user = req.user;

        // Validate input
        const validation = Log.validate({ date, mood, notes });
        if (!validation.isValid) {
            return res.status(400).json({
                error: validation.errors.join(', ')
            });
        }

        // Insert log into database
        const { data, error } = await supabase
            .from('daily_logs')
            .insert([
                {
                    user_id: user.id,
                    challenge_id: challenge_id || null,
                    log_date: date,
                    completed: completed || false
                }
            ])
            .select()
            .single();

        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Failed to create log' });
        }

        res.status(201).json({
            message: 'Log created successfully',
            log: data
        });
    } catch (error) {
        console.error('Create log error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get all logs for the authenticated user
 * @route GET /api/logs?challenge_id=xxx&date=xxx
 */
export const getLogs = async (req, res) => {
    try {
        const user = req.user;
        const { challenge_id, date, start_date, end_date } = req.query;

        let query = supabase
            .from('daily_logs')
            .select('*')
            .eq('user_id', user.id);

        // Filter by challenge_id if provided
        if (challenge_id) {
            query = query.eq('challenge_id', challenge_id);
        }

        // Filter by specific date if provided
        if (date) {
            query = query.eq('log_date', date);
        }

        // Filter by date range if provided
        if (start_date && end_date) {
            query = query.gte('log_date', start_date).lte('log_date', end_date);
        }

        query = query.order('log_date', { ascending: false });

        const { data, error } = await query;

        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Failed to fetch logs' });
        }

        res.json({ logs: data });
    } catch (error) {
        console.error('Get logs error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get a specific log by ID
 * @route GET /api/logs/:id
 */
export const getLogById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;

        const { data, error } = await supabase
            .from('daily_logs')
            .select('*')
            .eq('id', id)
            .eq('user_id', user.id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return res.status(404).json({ error: 'Log not found' });
            }
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Failed to fetch log' });
        }

        res.json({ log: data });
    } catch (error) {
        console.error('Get log error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Update a log
 * @route PUT /api/logs/:id
 */
export const updateLog = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, completed, notes, mood } = req.body;
        const user = req.user;

        // Validate input
        const validation = Log.validate({ date, mood, notes });
        if (!validation.isValid) {
            return res.status(400).json({
                error: validation.errors.join(', ')
            });
        }

        // Build update object
        const updateData = {
            updated_at: new Date().toISOString()
        };

        if (date) updateData.log_date = date;
        if (completed !== undefined) updateData.completed = completed;

        // Update log
        const { data, error } = await supabase
            .from('daily_logs')
            .update(updateData)
            .eq('id', id)
            .eq('user_id', user.id)
            .select()
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return res.status(404).json({ error: 'Log not found' });
            }
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Failed to update log' });
        }

        res.json({
            message: 'Log updated successfully',
            log: data
        });
    } catch (error) {
        console.error('Update log error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Delete a log
 * @route DELETE /api/logs/:id
 */
export const deleteLog = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;

        const { error } = await supabase
            .from('daily_logs')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id);

        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Failed to delete log' });
        }

        res.json({ message: 'Log deleted successfully' });
    } catch (error) {
        console.error('Delete log error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
