import { supabase } from '../config/supabase.js';
import { Challenge } from '../models/Challenge.js';

/**
 * Create a new challenge
 * @route POST /api/challenges
 */
export const createChallenge = async (req, res) => {
    try {
        const { title, duration } = req.body;
        const user = req.user;

        // Validate input
        const validation = Challenge.validate({ title, duration });
        if (!validation.isValid) {
            return res.status(400).json({
                error: validation.errors.join(', ')
            });
        }

        // Insert challenge into database
        const { data, error } = await supabase
            .from('challenges')
            .insert([
                {
                    user_id: user.id,
                    title: title.trim(),
                    duration: parseInt(duration),
                    start_date: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
                }
            ])
            .select()
            .single();

        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Failed to create challenge' });
        }

        res.status(201).json({
            message: 'Challenge created successfully',
            challenge: data
        });
    } catch (error) {
        console.error('Create challenge error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get all challenges for the authenticated user
 * @route GET /api/challenges
 */
export const getChallenges = async (req, res) => {
    try {
        const user = req.user;

        const { data, error } = await supabase
            .from('challenges')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Failed to fetch challenges' });
        }

        res.json({ challenges: data });
    } catch (error) {
        console.error('Get challenges error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get a specific challenge by ID
 * @route GET /api/challenges/:id
 */
export const getChallengeById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;

        const { data, error } = await supabase
            .from('challenges')
            .select('*')
            .eq('id', id)
            .eq('user_id', user.id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return res.status(404).json({ error: 'Challenge not found' });
            }
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Failed to fetch challenge' });
        }

        res.json({ challenge: data });
    } catch (error) {
        console.error('Get challenge error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Update a challenge
 * @route PUT /api/challenges/:id
 */
export const updateChallenge = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, duration } = req.body;
        const user = req.user;

        // Build update object
        const updateData = {
            updated_at: new Date().toISOString()
        };

        if (title) updateData.title = title.trim();
        if (duration) updateData.duration = parseInt(duration);

        // Update challenge
        const { data, error } = await supabase
            .from('challenges')
            .update(updateData)
            .eq('id', id)
            .eq('user_id', user.id)
            .select()
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return res.status(404).json({ error: 'Challenge not found' });
            }
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Failed to update challenge' });
        }

        res.json({
            message: 'Challenge updated successfully',
            challenge: data
        });
    } catch (error) {
        console.error('Update challenge error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Delete a challenge
 * @route DELETE /api/challenges/:id
 */
export const deleteChallenge = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;

        const { error } = await supabase
            .from('challenges')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id);

        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Failed to delete challenge' });
        }

        res.json({ message: 'Challenge deleted successfully' });
    } catch (error) {
        console.error('Delete challenge error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
