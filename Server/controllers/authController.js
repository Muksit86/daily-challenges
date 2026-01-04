import { supabase } from '../config/supabase.js';
import { User } from '../models/User.js';

/**
 * User Signup
 * @route POST /api/auth/signup
 */
export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        const validation = User.validate({ email, password });
        if (!validation.isValid) {
            return res.status(400).json({
                error: validation.errors.join(', ')
            });
        }

        // Create user with Supabase Auth
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.status(201).json({
            message: 'User created successfully',
            user: data.user,
            session: data.session
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * User Login
 * @route POST /api/auth/login
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required'
            });
        }

        // Sign in with Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.json({
            message: 'Login successful',
            user: data.user,
            session: data.session
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * User Logout
 * @route POST /api/auth/logout
 */
export const logout = async (req, res) => {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Delete User Account
 * @route DELETE /api/auth/delete-account
 */
export const deleteAccount = async (req, res) => {
    try {
        const user = req.user; // From auth middleware

        // Delete user using admin API
        const { error } = await supabase.auth.admin.deleteUser(user.id);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Delete account error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Verify Session
 * @route POST /api/auth/verify
 */
export const verifySession = async (req, res) => {
    try {
        // User is already attached by auth middleware
        const user = req.user;

        res.json({ user });
    } catch (error) {
        console.error('Verify error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
