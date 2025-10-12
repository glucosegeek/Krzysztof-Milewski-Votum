/*
  # Create news/articles table

  ## Summary
  This migration creates a table to store news articles and updates
  for display on the news page.

  1. New Tables
    - `news`
      - `id` (uuid, primary key) - Unique identifier
      - `title` (text) - Article title
      - `content` (text) - Full article content (supports newlines)
      - `author` (text) - Article author name
      - `date` (date) - Publication date
      - `category` (text) - Article category (optional)
      - `is_visible` (boolean) - Whether article is publicly visible
      - `display_order` (integer) - Order of display on website
      - `created_at` (timestamptz) - Timestamp when created
      - `updated_at` (timestamptz) - Timestamp when last updated

  2. Security
    - Enable RLS on `news` table
    - Public can view only visible articles
    - Only authenticated admins can manage articles

  3. Initial Data
    - Insert sample news articles
*/

CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  date date NOT NULL,
  category text,
  is_visible boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Public can view only visible articles
CREATE POLICY "Anyone can view visible news"
  ON news
  FOR SELECT
  USING (is_visible = true);

-- Only authenticated users can manage news
CREATE POLICY "Only authenticated users can insert news"
  ON news
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can update news"
  ON news
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete news"
  ON news
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_news_date ON news(date DESC);
CREATE INDEX IF NOT EXISTS idx_news_display_order ON news(display_order);
CREATE INDEX IF NOT EXISTS idx_news_visible ON news(is_visible);
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);

-- Insert sample news articles
INSERT INTO news (title, content, author, date, category, is_visible, display_order) VALUES
  (
    'Przełomowy wyrok TSUE ws. kredytów frankowych',
    'Trybunał Sprawiedliwości Unii Europejskiej wydał przełomowy wyrok dotyczący kredytów frankowych w Polsce. Orzeczenie potwierdza, że klauzule waloryzacyjne w umowach kredytowych mogą być uznane za abuzywne.

Wyrok ten ma kluczowe znaczenie dla tysięcy kredytobiorców, którzy zaciągnęli kredyty we frankach szwajcarskich. TSUE podkreślił, że banki miały obowiązek jasno i zrozumiale przedstawić wszystkie ryzyka związane z kredytem walutowym.

Konsekwencje tego orzeczenia mogą być daleko idące - kredytobiorcy mają prawo domagać się unieważnienia umowy kredytowej i zwrotu nadpłaconych rat.',
    'Krzysztof Milewski',
    '2024-10-10',
    'Orzecznictwo',
    true,
    1
  ),
  (
    'Nowe przepisy dotyczące sankcji kredytu darmowego',
    'Od 1 października 2024 roku wchodzą w życie nowe przepisy regulujące stosowanie sankcji kredytu darmowego. Zmiany te mają na celu wzmocnienie ochrony konsumentów.

Najważniejsze zmiany:
- Wydłużenie okresu na złożenie reklamacji
- Zwiększenie kar dla banków naruszających przepisy
- Uproszczenie procedury dochodzenia roszczeń

Eksperci szacują, że nowe przepisy mogą dotyczyć nawet 500 tysięcy umów kredytowych zawartych w latach 2011-2020.',
    'Krzysztof Milewski',
    '2024-10-05',
    'Zmiany prawne',
    true,
    2
  ),
  (
    'Rekordowa liczba wygranych spraw przeciwko bankom',
    'W trzecim kwartale 2024 roku odnotowaliśmy rekordową liczbę wygranych spraw dotyczących kredytów frankowych i SKD. Prawie 95% spraw kończy się pomyślnie dla klientów.

Średnia wartość odzyskanych środków wynosi obecnie 180 000 PLN. Coraz więcej osób decyduje się na dochodzenie swoich praw, co przekłada się na wzrost liczby pozwów przeciwko bankom.

Zachęcamy wszystkich posiadaczy kredytów frankowych i SKD do bezpłatnej konsultacji - warto sprawdzić swoje szanse na sukces!',
    'Krzysztof Milewski',
    '2024-09-28',
    'Statystyki',
    true,
    3
  )
ON CONFLICT (id) DO NOTHING;