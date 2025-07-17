-- Database schema update for enhanced user management
-- This script adds the required fields for the new user management system

-- First, check if the table exists and add missing columns
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS email VARCHAR(255) UNIQUE,
ADD COLUMN IF NOT EXISTS full_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS profile_image TEXT;

-- Update existing users with default values if needed
UPDATE users SET 
  email = CONCAT(username, '@example.com'),
  full_name = username
WHERE email IS NULL OR full_name IS NULL;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Show updated table structure
DESCRIBE users;