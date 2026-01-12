-- Database Migration for OneSignal Push Notifications
-- Run this in your Supabase SQL Editor

-- 1. Add notification fields to users table
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS onesignal_player_id TEXT,
ADD COLUMN IF NOT EXISTS notifications_enabled BOOLEAN DEFAULT true;

-- 2. Add notification fields to challenges table
ALTER TABLE public.challenges
ADD COLUMN IF NOT EXISTS notifications_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS reminder_time TEXT;

-- 3. Add comment for documentation
COMMENT ON COLUMN public.users.onesignal_player_id IS 'OneSignal Player ID for push notifications';
COMMENT ON COLUMN public.users.notifications_enabled IS 'Global notification preference for the user';
COMMENT ON COLUMN public.challenges.notifications_enabled IS 'Whether daily reminders are enabled for this challenge';
COMMENT ON COLUMN public.challenges.reminder_time IS 'Time to send daily reminder (HH:MM format, e.g., 20:00)';

-- 4. Create index for faster queries on notification-enabled challenges
CREATE INDEX IF NOT EXISTS idx_challenges_notifications_enabled 
ON public.challenges(notifications_enabled) 
WHERE notifications_enabled = true;

-- 5. Verify the changes
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'users' 
AND column_name IN ('onesignal_player_id', 'notifications_enabled');

SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'challenges' 
AND column_name IN ('notifications_enabled', 'reminder_time');
