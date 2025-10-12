-- Create admin_users table for role-based access control
--
-- Summary:
-- This migration creates a secure admin user management system with invitation tracking
-- and status management. Only users with emails registered in this table can access
-- the admin panel.
--
-- 1. New Tables
--    - admin_users
--      - id (uuid, primary key) - Unique identifier for each admin
--      - email (text, unique, not null) - Admin's email address (must match auth.users)
--      - invited_by (uuid, nullable) - Reference to admin who sent the invitation
--      - invited_at (timestamptz) - Timestamp when invitation was sent
--      - status (text) - Current status: 'pending', 'active', 'deactivated'
--      - accepted_at (timestamptz, nullable) - When admin accepted invitation and set password
--      - last_login_at (timestamptz, nullable) - Last successful login timestamp
--      - created_at (timestamptz) - Record creation timestamp
--      - updated_at (timestamptz) - Last update timestamp
--
-- 2. Security
--    - Enable RLS on admin_users table
--    - Only authenticated admins can view admin list
--    - Only active admins can invite new admins and update admin status
--    - Public can check if an email is an active admin (for login verification)
--
-- 3. Helper Functions
--    - is_active_admin(user_email) - Check if email belongs to active admin
--
-- 4. Indexes
--    - Unique index on email for fast lookups
--    - Index on status for filtering active admins

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  invited_by uuid REFERENCES admin_users(id) ON DELETE SET NULL,
  invited_at timestamptz DEFAULT now(),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'deactivated')),
  accepted_at timestamptz,
  last_login_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Helper function to check if a user is an active admin
CREATE OR REPLACE FUNCTION is_active_admin(user_email text)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE email = user_email AND status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to get current user's email
CREATE OR REPLACE FUNCTION auth_user_email()
RETURNS text AS $$
BEGIN
  RETURN (SELECT email FROM auth.users WHERE id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policy: Authenticated admins can view all admin users
CREATE POLICY "Active admins can view all admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (is_active_admin(auth_user_email()));

-- Policy: Active admins can invite new admins
CREATE POLICY "Active admins can invite new admins"
  ON admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (is_active_admin(auth_user_email()));

-- Policy: Active admins can update admin status
CREATE POLICY "Active admins can update admin status"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING (is_active_admin(auth_user_email()))
  WITH CHECK (is_active_admin(auth_user_email()));

-- Policy: Active admins can delete admin users
CREATE POLICY "Active admins can delete admin users"
  ON admin_users
  FOR DELETE
  TO authenticated
  USING (is_active_admin(auth_user_email()));

-- Create indexes
CREATE UNIQUE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_status ON admin_users(status);
CREATE INDEX IF NOT EXISTS idx_admin_users_invited_by ON admin_users(invited_by);

-- Note: Initial admin emails should be inserted manually through Supabase dashboard
-- Example: INSERT INTO admin_users (email, status) VALUES ('your-email@example.com', 'active');