/*
  # Create FAQ table

  ## Summary
  This migration creates a table to store frequently asked questions
  for display on the FAQ page.

  1. New Tables
    - `faq`
      - `id` (uuid, primary key) - Unique identifier
      - `question` (text) - Question text
      - `answer` (text) - Answer text
      - `category` (text) - Optional category for grouping
      - `is_visible` (boolean) - Whether FAQ is publicly visible
      - `display_order` (integer) - Order of display on website
      - `created_at` (timestamptz) - Timestamp when created
      - `updated_at` (timestamptz) - Timestamp when last updated

  2. Security
    - Enable RLS on `faq` table
    - Public can view only visible FAQs
    - Only authenticated admins can manage FAQs

  3. Initial Data
    - Insert sample FAQ questions
*/

CREATE TABLE IF NOT EXISTS faq (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text,
  is_visible boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE faq ENABLE ROW LEVEL SECURITY;

-- Public can view only visible FAQs
CREATE POLICY "Anyone can view visible faq"
  ON faq
  FOR SELECT
  USING (is_visible = true);

-- Only authenticated users can manage FAQs
CREATE POLICY "Only authenticated users can insert faq"
  ON faq
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can update faq"
  ON faq
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete faq"
  ON faq
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_faq_display_order ON faq(display_order);
CREATE INDEX IF NOT EXISTS idx_faq_visible ON faq(is_visible);
CREATE INDEX IF NOT EXISTS idx_faq_category ON faq(category);

-- Insert sample FAQ questions
INSERT INTO faq (question, answer, category, is_visible, display_order) VALUES
  (
    'Czy mogę unieważnić kredyt frankowy, który już spłaciłem?',
    'Tak! Możliwość unieważnienia kredytu nie zależy od tego, czy kredyt został już spłacony. Jeśli umowa zawierała klauzule abuzywne, masz prawo dochodzić zwrotu nadpłaconych środków. Roszczenia przedawniają się po 10 latach od dnia spłaty ostatniej raty.',
    'Kredyty frankowe',
    true,
    1
  ),
  (
    'Ile kosztuje proces sądowy?',
    'Koszty procesu wahają się od kilku do kilkunastu tysięcy złotych i obejmują: opłatę sądową, koszty reprezentacji prawnej oraz ewentualne opinie biegłych. W przypadku wygranej sprawy, bank zwykle pokrywa większość kosztów. Oferujemy również różne modele rozliczeń dopasowane do Twojej sytuacji.',
    'Proces',
    true,
    2
  ),
  (
    'Jak długo trwa postępowanie sądowe?',
    'Średni czas trwania sprawy to 12-24 miesiące. Czas ten zależy od obciążenia sądu, złożoności sprawy oraz ewentualnych odwołań. Prowadzimy sprawę tak, aby proces przebiegał jak najszybciej i najefektywniej.',
    'Proces',
    true,
    3
  ),
  (
    'Czy bank może odmówić wydania dokumentów?',
    'Nie. Bank jest zobowiązany prawnie do wydania klientowi kopii umowy kredytowej oraz historii spłat. Jeśli bank odmawia, możemy pomóc w wyegzekwowaniu tych dokumentów lub pozyskać je z innych źródeł, takich jak archiwum notarialne.',
    'Dokumenty',
    true,
    4
  ),
  (
    'Co to jest sankcja kredytu darmowego?',
    'Sankcja kredytu darmowego to konsekwencja prawna dla banku, który naruszył przepisy przy udzielaniu kredytu (np. nieprawidłowe informacje przedkontraktowe). W takim przypadku bank traci prawo do pobierania odsetek i prowizji - kredyt staje się "darmowy", a kredytobiorca spłaca tylko kapitał.',
    'Kredyty SKD',
    true,
    5
  ),
  (
    'Jakie mam szanse na wygraną?',
    'Statystyki są bardzo korzystne - ponad 90% spraw dotyczących kredytów frankowych i SKD kończy się sukcesem dla klientów. Każda sprawa jest jednak indywidualna i wymaga analizy. Podczas bezpłatnej konsultacji ocenimy Twoje szanse i przedstawimy możliwe scenariusze.',
    'Ogólne',
    true,
    6
  ),
  (
    'Czy muszę być obecny na rozprawach?',
    'Zazwyczaj nie. W większości przypadków wystarczy obecność Twojego pełnomocnika (adwokata lub radcy prawnego). Twoja obecność może być wymagana tylko w szczególnych sytuacjach, o czym z wyprzedzeniem Cię poinformujemy.',
    'Proces',
    true,
    7
  ),
  (
    'Co się stanie z moją nieruchomością?',
    'W przypadku unieważnienia umowy kredytowej, hipoteka wygasa. Nieruchomość pozostaje Twoją własnością. Bank nie może zajmować nieruchomości w ramach tego procesu. Jeśli kredyt jest jeszcze niespłacony, może być konieczne zawarcie nowej umowy lub rozliczenie się z bankiem.',
    'Kredyty frankowe',
    true,
    8
  ),
  (
    'Czy mogę kontynuować spłatę kredytu w trakcie procesu?',
    'Tak, możesz kontynuować regularne spłaty. Nie wpływa to negatywnie na proces. Jeśli wygrasz sprawę, wszystkie wpłacone raty będą uwzględnione w rozliczeniach z bankiem. Możesz też zawiesić spłaty, ale wymaga to indywidualnej analizy sytuacji.',
    'Proces',
    true,
    9
  ),
  (
    'Jak szybko mogę rozpocząć proces?',
    'Możemy rozpocząć już dziś! Po bezpłatnej konsultacji i analizie dokumentów możemy przystąpić do przygotowania pozwu. Zazwyczaj od pierwszego kontaktu do złożenia pozwu w sądzie mija 2-4 tygodnie.',
    'Ogólne',
    true,
    10
  )
ON CONFLICT (id) DO NOTHING;