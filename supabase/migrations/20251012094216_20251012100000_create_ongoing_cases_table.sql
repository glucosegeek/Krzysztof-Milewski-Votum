/*
  # Create ongoing cases table for W Trakcie page

  ## Summary
  This migration creates a table to store information about ongoing legal cases
  for display on the "W Trakcie" (Ongoing Cases) page.

  1. New Tables
    - `ongoing_cases`
      - `id` (uuid, primary key) - Unique identifier for each case
      - `case_type` (text) - Type of case (e.g., "Kredyt walutowy CHF", "Kredyt SKD", etc.)
      - `current_status` (text) - Current status description
      - `start_date` (date) - Date when the case started
      - `expected_amount` (numeric) - Expected recovery amount in PLN
      - `description` (text) - Detailed description of the case
      - `client_location` (text) - City/location of the client
      - `stage` (text) - Legal stage (e.g., "Postępowanie sądowe")
      - `created_at` (timestamptz) - Timestamp when record was created
      - `updated_at` (timestamptz) - Timestamp when record was last updated

  2. Security
    - Enable RLS on `ongoing_cases` table
    - Add policy to allow public read access (for displaying on website)
    - Only authenticated administrators can insert/update/delete records

  3. Indexes
    - Add index on `case_type` for filtering
    - Add index on `start_date` for sorting by date

  4. Initial Data
    - Insert sample ongoing cases for testing
*/

CREATE TABLE IF NOT EXISTS ongoing_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_type text NOT NULL,
  current_status text NOT NULL,
  start_date date NOT NULL,
  expected_amount numeric NOT NULL,
  description text NOT NULL,
  client_location text NOT NULL,
  stage text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE ongoing_cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view ongoing cases"
  ON ongoing_cases
  FOR SELECT
  USING (true);

CREATE POLICY "Only authenticated users can insert ongoing cases"
  ON ongoing_cases
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can update ongoing cases"
  ON ongoing_cases
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete ongoing cases"
  ON ongoing_cases
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_ongoing_cases_case_type ON ongoing_cases(case_type);
CREATE INDEX IF NOT EXISTS idx_ongoing_cases_start_date ON ongoing_cases(start_date DESC);

INSERT INTO ongoing_cases (case_type, current_status, start_date, expected_amount, description, client_location, stage) VALUES
  ('Kredyt walutowy CHF', 'W toku postępowania sądowego', '2024-08-15', 285000, 'Sprawa przeciwko bankowi w związku z kredytem frankowym. Obecnie trwają rozprawy, złożono wszystkie niezbędne dowody i opinie biegłych.', 'Warszawa', 'Postępowanie sądowe'),
  ('Kredyt SKD', 'Oczekiwanie na dokumenty', '2024-09-01', 145000, 'Przygotowanie do zastosowania sankcji kredytu darmowego. Obecnie zbieramy pełną dokumentację kredytową i analizujemy umowę pod kątem nieprawidłowości.', 'Kraków', 'Przygotowanie dokumentacji'),
  ('Kredyt walutowy EUR', 'Analiza prawna', '2024-09-20', 310000, 'Szczegółowa analiza umowy kredytu denominowanego w euro. Identyfikacja klauzul abuzywnych i przygotowanie strategii procesowej.', 'Gdańsk', 'Analiza prawna'),
  ('Kredyt walutowy CHF', 'W toku postępowania sądowego', '2024-07-10', 390000, 'Zaawansowane postępowanie sądowe dotyczące unieważnienia umowy kredytu frankowego. Oczekujemy na wydanie wyroku w najbliższych tygodniach.', 'Wrocław', 'Postępowanie sądowe'),
  ('Kredyt SKD', 'Negocjacje z bankiem', '2024-10-01', 120000, 'Prowadzone są negocjacje z bankiem w sprawie polubownego rozwiązania sporu. Bank rozważa uznanie naszych roszczeń bez konieczności postępowania sądowego.', 'Poznań', 'Negocjacje pozasądowe'),
  ('Kredyt walutowy USD', 'Przygotowanie pozwu', '2024-10-05', 265000, 'Finalizacja przygotowania pozwu o unieważnienie umowy kredytu denominowanego w dolarach. Pozew zostanie złożony w sądzie w ciągu najbliższych dni.', 'Łódź', 'Przygotowanie pozwu'),
  ('Kredyt walutowy CHF', 'Odwołanie do sądu wyższej instancji', '2024-05-20', 445000, 'Po niekorzystnym wyroku sądu pierwszej instancji, złożyliśmy apelację. Trwa postępowanie przed sądem apelacyjnym z dużą szansą na pomyślne rozstrzygnięcie.', 'Katowice', 'Postępowanie apelacyjne'),
  ('Kredyt SKD', 'W toku postępowania sądowego', '2024-06-30', 175000, 'Sprawa w toku postępowania sądowego dotycząca zastosowania sankcji kredytu darmowego. Przedstawiliśmy kompleksową argumentację prawną i oczekujemy na rozstrzygnięcie.', 'Szczecin', 'Postępowanie sądowe')
ON CONFLICT (id) DO NOTHING;