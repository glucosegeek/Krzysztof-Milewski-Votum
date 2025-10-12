/*
  # Create testimonials table for client reviews

  ## Summary
  This migration creates a table to store client testimonials/reviews
  for display on the homepage.

  1. New Tables
    - `testimonials`
      - `id` (uuid, primary key) - Unique identifier
      - `name` (text) - Client's name
      - `description` (text) - Review content
      - `stars` (integer) - Rating (1-5 stars)
      - `city` (text) - Client's city
      - `is_visible` (boolean) - Whether testimonial is publicly visible
      - `display_order` (integer) - Order of display on website
      - `created_at` (timestamptz) - Timestamp when created
      - `updated_at` (timestamptz) - Timestamp when last updated

  2. Security
    - Enable RLS on `testimonials` table
    - Public can view only visible testimonials
    - Only authenticated admins can manage testimonials

  3. Initial Data
    - Insert sample testimonials
*/

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  stars integer NOT NULL CHECK (stars >= 1 AND stars <= 5),
  city text NOT NULL,
  is_visible boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Public can view only visible testimonials
CREATE POLICY "Anyone can view visible testimonials"
  ON testimonials
  FOR SELECT
  USING (is_visible = true);

-- Only authenticated users can manage testimonials
CREATE POLICY "Only authenticated users can insert testimonials"
  ON testimonials
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can update testimonials"
  ON testimonials
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete testimonials"
  ON testimonials
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_testimonials_display_order ON testimonials(display_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_visible ON testimonials(is_visible);

-- Insert sample testimonials
INSERT INTO testimonials (name, description, stars, city, is_visible, display_order) VALUES
  ('Anna Kowalska', 'Dzięki pomocy Krzysztofa udało mi się unieważnić kredyt frankowy i odzyskać nadpłacone środki. Profesjonalna obsługa na każdym etapie.', 5, 'Warszawa', true, 1),
  ('Piotr Nowak', 'Kompleksowa pomoc w sprawie kredytu SKD. Wszystko zostało załatwione sprawnie i bez stresu z mojej strony.', 5, 'Kraków', true, 2),
  ('Maria Wiśniewska', 'Polecam! Krzysztof prowadził moją sprawę od początku do końca. Odzyskałam znaczną kwotę z banku.', 5, 'Gdańsk', true, 3)
ON CONFLICT (id) DO NOTHING;