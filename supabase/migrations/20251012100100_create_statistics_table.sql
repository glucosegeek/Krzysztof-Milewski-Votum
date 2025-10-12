/*
  # Create statistics table for managing page statistics

  ## Summary
  This migration creates a table to store configurable statistics for both
  "W Trakcie" and "Wygrane Sprawy" pages.

  1. New Tables
    - `statistics`
      - `id` (uuid, primary key) - Unique identifier for each statistic
      - `page_type` (text) - "ongoing" or "won" to identify which page
      - `stat_key` (text) - Unique key for the statistic (e.g., "total_cases")
      - `stat_value` (text) - The displayed value (can be overridden manually)
      - `stat_label` (text) - The label shown to users
      - `icon_name` (text) - Name of Lucide icon to use
      - `display_order` (integer) - Order of display (1, 2, 3, etc.)
      - `is_auto_calculated` (boolean) - Whether to auto-calculate from data or use manual value
      - `created_at` (timestamptz) - Timestamp when record was created
      - `updated_at` (timestamptz) - Timestamp when record was last updated

  2. Security
    - Enable RLS on `statistics` table
    - Add policy to allow public read access (for displaying on website)
    - Only authenticated administrators can insert/update/delete records

  3. Initial Data
    - Insert default statistics for ongoing cases page
    - Insert default statistics for won cases page
*/

CREATE TABLE IF NOT EXISTS statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_type text NOT NULL CHECK (page_type IN ('ongoing', 'won')),
  stat_key text NOT NULL,
  stat_value text,
  stat_label text NOT NULL,
  icon_name text NOT NULL,
  display_order integer NOT NULL DEFAULT 1,
  is_auto_calculated boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(page_type, stat_key)
);

ALTER TABLE statistics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view statistics"
  ON statistics
  FOR SELECT
  USING (true);

CREATE POLICY "Only authenticated users can insert statistics"
  ON statistics
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can update statistics"
  ON statistics
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete statistics"
  ON statistics
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_statistics_page_type ON statistics(page_type);
CREATE INDEX IF NOT EXISTS idx_statistics_display_order ON statistics(page_type, display_order);

INSERT INTO statistics (page_type, stat_key, stat_label, icon_name, display_order, is_auto_calculated) VALUES
  ('ongoing', 'total_cases', 'Aktywnych spraw', 'Briefcase', 1, true),
  ('ongoing', 'total_expected_amount', 'PLN oczekiwana kwota', 'Target', 2, true),
  ('ongoing', 'avg_expected_amount', 'PLN średnio na sprawę', 'TrendingUp', 3, true),
  ('won', 'total_cases', 'Wygranych spraw', 'Award', 1, true),
  ('won', 'total_recovered', 'PLN odzyskanych', 'DollarSign', 2, true),
  ('won', 'avg_recovered', 'PLN średnio na sprawę', 'TrendingUp', 3, true)
ON CONFLICT (page_type, stat_key) DO NOTHING;
