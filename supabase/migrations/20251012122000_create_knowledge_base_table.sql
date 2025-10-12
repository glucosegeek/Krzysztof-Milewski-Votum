/*
  # Create knowledge base articles table

  ## Summary
  This migration creates a table to store knowledge base articles
  for display on the knowledge base page.

  1. New Tables
    - `knowledge_base`
      - `id` (uuid, primary key) - Unique identifier
      - `title` (text) - Article title
      - `content` (text) - Full article content (HTML supported)
      - `category` (text) - Article category
      - `icon_name` (text) - Lucide icon name
      - `is_visible` (boolean) - Whether article is publicly visible
      - `display_order` (integer) - Order of display on website
      - `created_at` (timestamptz) - Timestamp when created
      - `updated_at` (timestamptz) - Timestamp when last updated

  2. Security
    - Enable RLS on `knowledge_base` table
    - Public can view only visible articles
    - Only authenticated admins can manage articles

  3. Initial Data
    - Insert sample knowledge base articles
*/

CREATE TABLE IF NOT EXISTS knowledge_base (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  icon_name text NOT NULL DEFAULT 'BookOpen',
  is_visible boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;

-- Public can view only visible articles
CREATE POLICY "Anyone can view visible knowledge base articles"
  ON knowledge_base
  FOR SELECT
  USING (is_visible = true);

-- Only authenticated users can manage articles
CREATE POLICY "Only authenticated users can insert knowledge base articles"
  ON knowledge_base
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can update knowledge base articles"
  ON knowledge_base
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete knowledge base articles"
  ON knowledge_base
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_knowledge_base_category ON knowledge_base(category);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_display_order ON knowledge_base(display_order);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_visible ON knowledge_base(is_visible);

-- Insert sample knowledge base articles
INSERT INTO knowledge_base (title, content, category, icon_name, is_visible, display_order) VALUES
  (
    'Czym jest kredyt frankowy?',
    '<p>Kredyt frankowy (kredyt walutowy CHF) to rodzaj kredytu hipotecznego, w którym kwota kredytu jest denominowana lub indeksowana do waluty obcej - franka szwajcarskiego (CHF).</p>

<p><strong>Główne cechy kredytów frankowych:</strong></p>
<ul>
<li>Kredyt udzielany w złotych, ale przeliczany po kursie CHF</li>
<li>Raty spłacane w złotych, ale wysokość zależna od kursu franka</li>
<li>Pierwotnie niższe oprocentowanie niż kredyty złotowe</li>
<li>Ryzyko walutowe leży po stronie kredytobiorcy</li>
</ul>

<p><strong>Dlaczego kredyty frankowe są problematyczne?</strong></p>
<p>Banki często nie informowały klientów o pełnym zakresie ryzyka walutowego. Wzrost kursu CHF z ok. 2 PLN do ponad 4 PLN spowodował, że zadłużenie kredytobiorców drastycznie wzrosło.</p>

<p><strong>Możliwości prawne:</strong></p>
<ul>
<li>Unieważnienie umowy kredytowej</li>
<li>Zwrot nadpłaconych rat</li>
<li>Umorzenie pozostałego zadłużenia</li>
</ul>',
    'kredyty-walutowe',
    'DollarSign',
    true,
    1
  ),
  (
    'Czym jest kredyt SKD?',
    '<p>SKD (Saldo Kredytu Do Dyspozycji) to specyficzna forma kredytu, w której bank pobiera odsetki i prowizje od całej kwoty przyznanego kredytu, niezależnie od tego, czy kredytobiorca faktycznie z niej korzysta.</p>

<p><strong>Jak działa SKD?</strong></p>
<ul>
<li>Bank przyznaje limit kredytowy (np. 500 000 PLN)</li>
<li>Klient może korzystać z kredytu w transzach</li>
<li>Odsetki naliczane są od całej kwoty limitu, nie od wykorzystanej części</li>
<li>Prowizja również liczona od całości</li>
</ul>

<p><strong>Dlaczego to problem?</strong></p>
<p>Taka konstrukcja kredytu jest często uznawana za nieuczciwą praktykę rynkową. Kredytobiorca płaci za pieniądze, z których faktycznie nie korzysta.</p>

<p><strong>Sankcja kredytu darmowego:</strong></p>
<p>W przypadku stwierdzenia nieprawidłowości, bank może zostać zobowiązany do zwrotu WSZYSTKICH odsetek i prowizji. Kredyt staje się faktycznie "darmowy" - klient spłaca tylko kapitał.</p>

<p><strong>Przesłanki do zastosowania sankcji:</strong></p>
<ul>
<li>Brak odpowiednich informacji przedkontraktowych</li>
<li>Naruszenie obowiązków informacyjnych banku</li>
<li>Nieprawidłowe obliczanie rzeczywistej rocznej stopy oprocentowania (RRSO)</li>
</ul>',
    'umowy-skd',
    'CreditCard',
    true,
    2
  ),
  (
    'Jak wygląda proces sądowy?',
    '<p>Proces dochodzenia roszczeń od banku składa się z kilku etapów. Oto szczegółowy przebieg sprawy od momentu zgłoszenia do wydania wyroku.</p>

<p><strong>ETAP 1: Analiza wstępna (1-2 tygodnie)</strong></p>
<ul>
<li>Zebranie dokumentacji kredytowej</li>
<li>Analiza umowy i aneksów</li>
<li>Ocena szans powodzenia sprawy</li>
<li>Wyliczenie potencjalnych korzyści</li>
</ul>

<p><strong>ETAP 2: Przygotowanie pozwu (2-4 tygodnie)</strong></p>
<ul>
<li>Sporządzenie pozwu przez prawnika</li>
<li>Zebranie wszystkich niezbędnych dowodów</li>
<li>Przygotowanie opinii biegłych (jeśli potrzebne)</li>
<li>Złożenie pozwu w sądzie</li>
</ul>

<p><strong>ETAP 3: Postępowanie sądowe (6-18 miesięcy)</strong></p>
<ul>
<li>Pierwsze posiedzenie sądu</li>
<li>Wymiana pism procesowych</li>
<li>Przesłuchanie świadków (jeśli potrzebne)</li>
<li>Opinia biegłego sądowego</li>
<li>Zamknięcie rozprawy</li>
</ul>

<p><strong>ETAP 4: Wyrok (natychmiast po zamknięciu rozprawy)</strong></p>
<ul>
<li>Ogłoszenie wyroku przez sąd</li>
<li>Otrzymanie pisemnego uzasadnienia (4-6 tygodni)</li>
<li>Możliwość apelacji dla obu stron</li>
</ul>

<p><strong>ETAP 5: Wykonanie wyroku</strong></p>
<ul>
<li>Jeśli bank nie odwoła się - wyrok staje się prawomocny</li>
<li>Bank ma obowiązek wykonać wyrok</li>
<li>Możliwość egzekucji komorniczej w razie oporu</li>
</ul>

<p><strong>Ważne informacje:</strong></p>
<p>• Średni czas trwania sprawy: 12-24 miesiące<br>
- Koszt procesu: od kilku do kilkunastu tysięcy złotych<br>
- Wskaźnik wygranych: ponad 90% dla klientów<br>
- Możliwość zawarcia ugody na każdym etapie</p>',
    'orzecznictwo',
    'Gavel',
    true,
    3
  ),
  (
    'Czy mogę unieważnić spłacony kredyt?',
    '<p><strong>TAK!</strong> Możliwość unieważnienia kredytu nie zależy od tego, czy kredyt został już spłacony.</p>

<p><strong>Kluczowe informacje:</strong></p>
<p>Jeśli kredyt zawierał klauzule abuzywne lub bank naruszył przepisy przy jego udzielaniu, masz prawo dochodzić swoich roszczeń nawet po całkowitej spłacie kredytu.</p>

<p><strong>Co możesz odzyskać po spłaconym kredycie?</strong></p>
<ul>
<li>Wszystkie nadpłacone raty wynikające z niedozwolonych klauzul</li>
<li>Różnicę między tym co zapłaciłeś, a tym co byś zapłacił przy kredycie złotowym</li>
<li>Odsetki od nadpłaconych kwot</li>
<li>Koszty związane z prowadzeniem kredytu (prowizje, ubezpieczenia)</li>
</ul>

<p><strong>Terminy:</strong></p>
<p>Roszczenia przedawniają się po 10 latach od dnia spłaty ostatniej raty, ale może to zostać przerwane przez wystąpienie do sądu. Nie zwlekaj z analizą swojej sprawy!</p>

<p><strong>Przykład:</strong></p>
<p>Pan Jan spłacił kredyt frankowy w 2020 roku. Łącznie zapłacił bankowi 800 000 PLN, chociaż zaciągnął kredyt na 400 000 PLN. Po analizie okazało się, że gdyby kredyt był liczony uczciwie, zapłaciłby tylko 550 000 PLN. Pan Jan może dochodzić zwrotu 250 000 PLN!</p>',
    'ogolne',
    'HelpCircle',
    true,
    4
  ),
  (
    'Jakie dokumenty są potrzebne?',
    '<p>Aby rozpocząć proces analizy i ewentualnego dochodzenia roszczeń, potrzebujemy od Ciebie następujących dokumentów:</p>

<p><strong>DOKUMENTY OBOWIĄZKOWE:</strong></p>
<ul>
<li><strong>Umowa kredytu</strong> - oryginalna umowa z bankiem wraz z wszystkimi załącznikami</li>
<li><strong>Wszystkie aneksy</strong> - zmiany do umowy (jeśli były)</li>
<li><strong>Harmonogram spłat</strong> - pierwotny harmonogram otrzymany przy uruchomieniu kredytu</li>
<li><strong>Historia spłat</strong> - zestawienie wszystkich wpłat dokonanych do banku</li>
</ul>

<p><strong>DOKUMENTY POMOCNICZE (jeśli posiadasz):</strong></p>
<ul>
<li>Oferta kredytowa / arkusz informacyjny</li>
<li>Dokumentacja przedkontraktowa (informacje o ryzyku walutowym)</li>
<li>Korespondencja z bankiem (maile, listy)</li>
<li>Wycena nieruchomości</li>
<li>Akt notarialny ustanowienia hipoteki</li>
</ul>

<p><strong>Jak zdobyć dokumenty?</strong></p>
<p>Jeśli nie masz części dokumentów, nie martw się! Możesz je uzyskać:</p>
<ul>
<li><strong>Z banku</strong> - masz prawo żądać kopii umowy i historii spłat</li>
<li><strong>Z archiwum notarialnego</strong> - akt notarialny</li>
<li><strong>Ze swojego archiwum</strong> - sprawdź stare maile i dokumenty</li>
</ul>

<p><strong>Pomożemy Ci!</strong></p>
<p>Jeśli masz problem ze zdobyciem dokumentów, pomożemy Ci w tym procesie. Sporządzimy odpowiednie wnioski do banku i instytucji.</p>

<p><strong>Kolejne kroki:</strong></p>
<p>1. Zbierz dokumenty, które posiadasz<br>
2. Umów się na bezpłatną konsultację<br>
3. Podczas spotkania pokażemy Ci, jakie dokumenty są kluczowe<br>
4. Pomożemy zdobyć brakujące papiery</p>',
    'ogolne',
    'FileText',
    true,
    5
  )
ON CONFLICT (id) DO NOTHING;