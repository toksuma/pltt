# User Profile Feature

## Overview
This feature adds a user profile page to the admin panel where users can view and edit their personal information.

## Features
- **Profile Display**: Shows user avatar, full name, username, role, and join date
- **Edit Mode**: Allows users to update their full name, email, and profile image
- **Role Display**: Shows user permissions with color-coded badges
- **Responsive Design**: Works on desktop and mobile devices

## Files Added/Modified

### Backend
- `Backend/routes/profile.js` - API endpoints for profile management
- `Backend/index.js` - Added profile route
- `Backend/migrations/add_profile_fields.sql` - Database migration

### Frontend  
- `Frontend/src/admin/UserProfile.jsx` - Main profile component
- `Frontend/src/admin/Sidebar.jsx` - Added profile menu item
- `Frontend/src/App.jsx` - Added profile route

## API Endpoints
- `GET /api/profile` - Get current user profile
- `PUT /api/profile` - Update user profile

## Database Schema
The following columns are added to the `users` table:
- `email` (VARCHAR(255)) - User email address
- `full_name` (VARCHAR(255)) - User's full name
- `profile_image` (TEXT) - URL to profile image
- `created_at` (TIMESTAMP) - Account creation date

## Usage
1. Navigate to Admin Panel → Thông tin cá nhân
2. View current profile information
3. Click "Chỉnh sửa" to enter edit mode
4. Update information and click "Lưu" to save changes
5. Click "Hủy" to cancel editing

## Security
- Requires authentication (JWT token)
- Users can only access/modify their own profile
- Username and role cannot be modified by users