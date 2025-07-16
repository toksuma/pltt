-- Migration script to add profile fields to users table
-- Run this script to add the necessary columns for the profile page

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS email VARCHAR(255),
ADD COLUMN IF NOT EXISTS full_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS profile_image TEXT,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Update existing users to have created_at if it's NULL
UPDATE users SET created_at = CURRENT_TIMESTAMP WHERE created_at IS NULL;