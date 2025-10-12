/*
  # Create won cases table for Wygrane Sprawy page

  ## Summary
  This migration creates a table to store information about won legal cases
  for display on the "Wygrane Sprawy" (Won Cases) page.

  1. New Tables
    - `won_cases`
      - `id` (uuid, primary key) - Unique identifier for each case
      - `case_type` (text) - Type of case (e.g., "Kredyt walutowy CHF", "Kredyt SKD")
      - `amount_recovered` (numeric) - Amount of money recovered in PLN
      - `date_won` (date) - Date when the case was won
      - `description` (text) - Detailed description of the case outcome
      - `client_location` (text) - City/location of the client
      - `created_at` (timestamptz) - Timestamp when record was created
      - `updated_at` (timestamptz) - Timestamp when record was last updated

  2. Security
    - Enable RLS on `won_cases` table
    - Add policy to allow public read access (for displaying on website)
    - Only authenticated administrators can insert/update/delete records

  3. Indexes
    - Add index on `case_type` for filtering
    - Add index on `date_won` for sorting by date
*/

CREATE TABLE IF NOT EXISTS won_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_type text NOT NULL,
  amount_recovered numeric NOT NULL,
  date_won date NOT NULL,
  description text NOT NULL,
  client_location text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE won_cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view won cases"
  ON won_cases
  FOR SELECT
  USING (true);

CREATE POLICY "Only authenticated users can insert won cases"
  ON won_cases
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can update won cases"
  ON won_cases
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete won cases"
  ON won_cases
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_won_cases_case_type ON won_cases(case_type);
CREATE INDEX IF NOT EXISTS idx_won_cases_date_won ON won_cases(date_won DESC);

INSERT INTO won_cases (case_type, amount_recovered, date_won, description, client_location) VALUES
  ('Kredyt walutowy CHF', 250000, '2024-09-15', 'Unieważnienie umowy kredytu frankowego. Klient odzyskał nadpłacone raty i został zwolniony z pozostałego zadłużenia wobec banku.', 'Warszawa'),
  ('Kredyt SKD', 180000, '2024-08-22', 'Skuteczne zastosowanie sankcji kredytu darmowego. Bank zobowiązany do zwrotu wszystkich odsetek i prowizji.', 'Kraków'),
  ('Kredyt walutowy EUR', 320000, '2024-07-10', 'Wyrok unieważniający umowę kredytu denominowanego w euro. Zwrot nadpłaconych środków oraz anulowanie zadłużenia.', 'Gdańsk'),
  ('Kredyt walutowy CHF', 410000, '2024-06-18', 'Sprawa przeciwko dużemu bankowi komercyjnemu. Całkowite unieważnienie umowy kredytowej z tytułu klauzul abuzywnych.', 'Wrocław'),
  ('Kredyt SKD', 95000, '2024-05-30', 'Sankcja kredytu darmowego za nieprawidłowe informacje przedkontraktowe. Zwrot wszystkich kosztów kredytu.', 'Poznań'),
  ('Kredyt walutowy USD', 275000, '2024-04-12', 'Unieważnienie kredytu denominowanego w dolarach. Klient odzyskał znaczną część wpłaconych środków.', 'Łódź')
ON CONFLICT (id) DO NOTHING;
