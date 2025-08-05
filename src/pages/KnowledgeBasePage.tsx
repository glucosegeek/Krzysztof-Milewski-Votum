import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, FileText, DollarSign, Shield, Gavel, BookOpen, Search } from 'lucide-react';
import { useConsultationModal } from '../context/ConsultationModalContext';
import ArticleDetailModal from '../components/ArticleDetailModal'; // Import the new modal

interface Article {
  id: number;
  title: string;
  excerpt: string;
  fullContent: string; // Added fullContent
  icon: React.ReactNode;
  category: string;
}

const KnowledgeBasePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { openModal } = useConsultationModal();

  // State for the ArticleDetailModal
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: 1,
      title: "Kredyty frankowe – co to jest i dlaczego są problemem?",
      excerpt: "Kredyty frankowe to kredyty hipoteczne udzielane w walucie szwajcarskiej (CHF). Ich popularność w Polsce wynikała z niższych stóp procentowych w Szwajcarii. Jednak gwałtowny wzrost kursu franka szwajcarskiego spowodował, że raty kredytów stały się dla wielu kredytobiorców niebotycznie wysokie, a zadłużenie znacznie przewyższało wartość nieruchomości. Wiele umów zawierało klauzule abuzywne, co stało się podstawą do dochodzenia roszczeń w sądzie.",
      fullContent: `
        <p>Kredyty frankowe to rodzaj kredytów hipotecznych, które były udzielane w Polsce w latach 2004-2011, głównie w walucie szwajcarskiej (CHF), ale także w euro (EUR) czy dolarach (USD). Ich popularność wynikała z niższych stóp procentowych w Szwajcarii w porównaniu do Polski, co przekładało się na niższe początkowe raty.</p>
        <p><strong>Dlaczego stały się problemem?</strong></p>
        <ul>
          <li>Gwałtowny wzrost kursu franka szwajcarskiego (CHF) po 2008 roku, a zwłaszcza po 2015 roku, spowodował drastyczny wzrost wysokości rat kredytowych.</li>
          <li>Wiele umów zawierało tzw. klauzule abuzywne (niedozwolone), które dawały bankom jednostronną swobodę w ustalaniu kursów walutowych do przeliczania rat.</li>
          <li>Banki często nie informowały kredytobiorców o pełnym ryzyku walutowym, co naruszało prawa konsumentów.</li>
          <li>W efekcie, zadłużenie wielu kredytobiorców znacznie przewyższało wartość nieruchomości, a spłata kredytu stała się ogromnym obciążeniem finansowym.</li>
        </ul>
        <p>Te problemy stały się podstawą do masowego dochodzenia roszczeń w sądzie, a orzecznictwo sądów polskich i Trybunału Sprawiedliwości Unii Europejskiej (TSUE) w dużej mierze potwierdziło racje kredytobiorców.</p>
      `,
      icon: <Scale size={24} />,
      category: "kredyty-walutowe",
    },
    {
      id: 2,
      title: "Jak unieważnić umowę kredytu frankowego?",
      excerpt: "Unieważnienie umowy kredytu frankowego jest procesem sądowym, który ma na celu stwierdzenie nieważności całej umowy lub usunięcie z niej nieuczciwych klauzul. Najczęściej stosowaną podstawą jest tzw. odfrankowienie, czyli przeliczenie kredytu na złotówki z zachowaniem oprocentowania LIBOR/SARON, lub całkowite unieważnienie umowy, co skutkuje zwrotem wszystkich wpłaconych rat.",
      fullContent: `
        <p>Unieważnienie umowy kredytu frankowego to proces prawny, który ma na celu wyeliminowanie nieuczciwych zapisów z umowy lub stwierdzenie jej całkowitej nieważności. Istnieją dwie główne ścieżki:</p>
        <ul>
          <li><strong>Odfrankowienie (tzw. "mała sankcja")</strong>: Polega na usunięciu z umowy klauzul indeksacyjnych lub denominacyjnych, co skutkuje przeliczeniem kredytu na złotówki, ale z zachowaniem oprocentowania opartego na stawce LIBOR/SARON. Kredytobiorca spłaca kredyt w PLN, a bank zwraca nadpłacone kwoty.</li>
          <li><strong>Całkowite unieważnienie umowy (tzw. "duża sankcja")</strong>: Sąd stwierdza, że umowa jest nieważna od samego początku. Strony muszą zwrócić sobie wzajemnie świadczenia – bank zwraca wszystkie wpłacone raty i opłaty, a kredytobiorca zwraca kwotę kapitału, którą otrzymał od banku. W praktyce często oznacza to, że bank musi zwrócić kredytobiorcy znaczną sumę pieniędzy.</li>
        </ul>
        <p><strong>Kroki do unieważnienia umowy:</strong></p>
        <ol>
          <li><strong>Analiza umowy</strong>: Prawnik analizuje umowę kredytową pod kątem klauzul abuzywnych.</li>
          <li><strong>Wezwanie do zapłaty/reklamacja</strong>: Wysłanie do banku wezwania do zapłaty lub reklamacji.</li>
          <li><strong>Pozew sądowy</strong>: W przypadku braku porozumienia, złożenie pozwu do sądu.</li>
          <li><strong>Postępowanie sądowe</strong>: Reprezentacja w sądzie, gromadzenie dowodów, przesłuchania.</li>
          <li><strong>Wyrok</strong>: Ostateczne orzeczenie sądu.</li>
        </ol>
        <p>Współpraca z doświadczoną kancelarią prawną jest kluczowa dla sukcesu w tego typu sprawach.</p>
      `,
      icon: <FileText size={24} />,
      category: "kredyty-walutowe",
    },
    {
      id: 3,
      title: "Koszty procesu sądowego o kredyt frankowy – ile to kosztuje?",
      excerpt: "Koszty procesu sądowego o kredyt frankowy mogą być znaczące, ale w wielu kancelariach stosuje się model wynagrodzenia 'success fee', gdzie główna część honorarium jest płatna dopiero po wygranej sprawie. Do kosztów zalicza się opłata sądowa od pozwu, koszty zastępstwa procesowego oraz ewentualne koszty biegłego. W przypadku wygranej, większość tych kosztów pokrywa bank.",
      fullContent: `
        <p>Koszty związane z procesem sądowym o kredyt frankowy mogą wydawać się wysokie, jednak wiele kancelarii, w tym Votum Consumer Care, oferuje elastyczne modele rozliczeń, które minimalizują ryzyko finansowe dla kredytobiorcy.</p>
        <p><strong>Główne składniki kosztów:</strong></p>
        <ul>
          <li><strong>Opłata sądowa od pozwu</strong>: Jest to stała opłata, zazwyczaj 1000 zł, niezależnie od wartości przedmiotu sporu.</li>
          <li><strong>Koszty zastępstwa procesowego (honorarium prawnika)</strong>: To największa część kosztów. Wiele kancelarii stosuje model "success fee" (wynagrodzenie za sukces), co oznacza, że znaczna część honorarium jest płatna dopiero po wygranej sprawie. Może to być procent od odzyskanej kwoty lub stała suma.</li>
          <li><strong>Koszty biegłego sądowego</strong>: W niektórych sprawach sąd może powołać biegłego (np. z zakresu rachunkowości) do wyliczenia roszczeń. Koszty te są zazwyczaj dzielone między strony lub pokrywane przez stronę przegrywającą.</li>
          <li><strong>Koszty korespondencji i inne drobne opłaty</strong>.</li>
        </ul>
        <p><strong>Ważne:</strong> W przypadku wygranej sprawy, sąd zazwyczaj zasądza zwrot kosztów procesu od banku na rzecz kredytobiorcy. Oznacza to, że bank pokrywa większość poniesionych przez Ciebie wydatków, w tym opłatę sądową i część honorarium prawnika.</p>
        <p>Dzięki modelowi "success fee" możesz rozpocząć proces bez ponoszenia dużych kosztów początkowych, co czyni dochodzenie roszczeń bardziej dostępnym.</p>
      `,
      icon: <DollarSign size={24} />,
      category: "kredyty-walutowe",
    },
    {
      id: 4,
      title: "Umowy SKD – co to jest i jak się przed nimi bronić?",
      excerpt: "Umowy Sprzedaży Konsumenckiej na Odległość (SKD) to umowy zawierane poza lokalem przedsiębiorstwa, np. przez telefon, internet. Często dotyczą produktów finansowych, ubezpieczeń czy usług telekomunikacyjnych. Problemem są nieuczciwe praktyki sprzedażowe, ukryte koszty czy brak informacji o prawie do odstąpienia od umowy. Konsumenci mają prawo do odstąpienia od takiej umowy w ciągu 14 dni.",
      fullContent: `
        <p>Umowy Sprzedaży Konsumenckiej na Odległość (SKD) to kontrakty zawierane z konsumentem bez jednoczesnej fizycznej obecności obu stron, np. przez telefon, internet, pocztę, czy poza lokalem przedsiębiorstwa (np. podczas prezentacji handlowych w hotelach).</p>
        <p><strong>Najczęstsze problemy z umowami SKD:</strong></p>
        <ul>
          <li><strong>Nieuczciwe praktyki sprzedażowe</strong>: Wprowadzanie w błąd, wywieranie presji, manipulacja informacjami.</li>
          <li><strong>Ukryte koszty</strong>: Brak pełnej informacji o wszystkich opłatach i warunkach przed zawarciem umowy.</li>
          <li><strong>Brak informacji o prawie do odstąpienia</strong>: Sprzedawca nie informuje konsumenta o jego prawie do odstąpienia od umowy w określonym terminie.</li>
          <li><strong>Produkty finansowe</strong>: Często dotyczą skomplikowanych produktów finansowych, ubezpieczeń, czy usług telekomunikacyjnych, których warunki są trudne do zrozumienia.</li>
        </ul>
        <p><strong>Jak się bronić?</strong></p>
        <ol>
          <li><strong>Prawo do odstąpienia</strong>: Konsument ma prawo odstąpić od umowy SKD w terminie 14 dni od jej zawarcia (lub od otrzymania towaru) bez podawania przyczyny. Jeśli sprzedawca nie poinformował o tym prawie, termin ten może wydłużyć się nawet do 12 miesięcy.</li>
          <li><strong>Dokładne czytanie umów</strong>: Zawsze dokładnie zapoznaj się z treścią umowy przed jej podpisaniem.</li>
          <li><strong>Dokumentowanie komunikacji</strong>: Zachowuj wszelką korespondencję, nagrania rozmów (jeśli są dostępne) i dokumenty.</li>
          <li><strong>Zgłoszenie nieprawidłowości</strong>: W przypadku podejrzenia nieuczciwych praktyk, skontaktuj się z prawnikiem lub rzecznikiem praw konsumentów.</li>
        </ol>
        <p>Pomagamy w analizie umów SKD i dochodzeniu roszczeń, w tym w unieważnianiu umów zawartych niezgodnie z prawem.</p>
      `,
      icon: <BookOpen size={24} />,
      category: "umowy-skd",
    },
    {
      id: 5,
      title: "Rola Votum S.A. w sprawach frankowych i SKD",
      excerpt: "Votum S.A. to jedna z największych firm w Polsce specjalizujących się w dochodzeniu roszczeń od banków w sprawach kredytów frankowych. Współpracuje z doświadczonymi kancelariami prawnymi, oferując kompleksowe wsparcie od analizy umowy, przez przygotowanie dokumentacji, aż po reprezentację w sądzie. Działają w oparciu o model 'success fee', co minimalizuje ryzyko finansowe dla klienta.",
      fullContent: `
        <p>Votum S.A. jest liderem na polskim rynku w zakresie dochodzenia roszczeń od instytucji finansowych, w szczególności w sprawach dotyczących kredytów frankowych oraz umów Sprzedaży Konsumenckiej na Odległość (SKD).</p>
        <p><strong>Jak Votum S.A. wspiera klientów:</strong></p>
        <ul>
          <li><strong>Kompleksowa analiza</strong>: Przeprowadzają szczegółową analizę umowy kredytowej lub SKD pod kątem klauzul abuzywnych i możliwości dochodzenia roszczeń.</li>
          <li><strong>Współpraca z kancelariami</strong>: Votum S.A. współpracuje z siecią doświadczonych kancelarii prawnych, które specjalizują się w prawie bankowym i konsumenckim, zapewniając najwyższą jakość usług prawnych.</li>
          <li><strong>Przygotowanie dokumentacji</strong>: Pomagają w zgromadzeniu wszystkich niezbędnych dokumentów i przygotowaniu pozwu.</li>
          <li><strong>Reprezentacja sądowa</strong>: Zapewniają pełną reprezentację klienta na każdym etapie postępowania sądowego, aż do prawomocnego wyroku.</li>
          <li><strong>Model "success fee"</strong>: Oferują model wynagrodzenia oparty na sukcesie, co oznacza, że klient płaci główne honorarium dopiero po wygranej sprawie. Minimalizuje to ryzyko finansowe dla kredytobiorcy.</li>
          <li><strong>Wsparcie i doradztwo</strong>: Klienci otrzymują stałe wsparcie i doradztwo na każdym etapie procesu.</li>
        </ul>
        <p>Dzięki Votum S.A. tysiące kredytobiorców odzyskało swoje pieniądze i uwolniło się od toksycznych kredytów, a konsumenci uzyskali pomoc w sporach z nieuczciwymi sprzedawcami.</p>
      `,
      icon: <Shield size={24} />,
      category: "ogolne",
    },
    {
      id: 6,
      title: "Najnowsze orzecznictwo TSUE i Sądu Najwyższego w sprawach frankowych",
      excerpt: "Orzeczenia Trybunału Sprawiedliwości Unii Europejskiej (TSUE) oraz Sądu Najwyższego w Polsce mają kluczowe znaczenie dla spraw frankowych. Potwierdzają one abuzywny charakter wielu klauzul w umowach kredytowych i umacniają pozycję kredytobiorców. Najnowsze wyroki często skutkują unieważnieniem umów i zwrotem nadpłaconych kwot.",
      fullContent: `
        <p>Orzecznictwo Trybunału Sprawiedliwości Unii Europejskiej (TSUE) oraz Sądu Najwyższego w Polsce odgrywa fundamentalną rolę w kształtowaniu linii orzeczniczej w sprawach kredytów frankowych. Te wyroki mają charakter wiążący i stanowią podstawę dla sądów krajowych.</p>
        <p><strong>Kluczowe orzeczenia TSUE:</strong></p>
        <ul>
          <li><strong>Wyrok w sprawie Dziubak (C-260/18)</strong>: Potwierdził, że polskie sądy mogą unieważniać umowy kredytowe zawierające nieuczciwe klauzule walutowe, a konsument nie może być zmuszony do utrzymania takiej umowy.</li>
          <li><strong>Wyrok w sprawie K.B. i in. (C-19/20)</strong>: Wskazał, że bankom nie przysługuje wynagrodzenie za korzystanie z kapitału w przypadku unieważnienia umowy kredytu frankowego, co jest niezwykle korzystne dla kredytobiorców.</li>
          <li><strong>Kolejne orzeczenia</strong>: TSUE konsekwentnie stoi na stanowisku ochrony konsumentów, co umacnia ich pozycję w sporach z bankami.</li>
        </ul>
        <p><strong>Orzecznictwo Sądu Najwyższego:</strong></p>
        <ul>
          <li>Sąd Najwyższy, kierując się wyrokami TSUE, również wydał szereg uchwał i orzeczeń korzystnych dla frankowiczów, ujednolicając orzecznictwo sądów niższych instancji.</li>
          <li>Potwierdzono m.in. możliwość unieważniania umów oraz brak podstaw do roszczeń banków o wynagrodzenie za korzystanie z kapitału.</li>
        </ul>
        <p>Te orzeczenia sprawiły, że sprawy frankowe stały się znacznie bardziej przewidywalne i korzystne dla kredytobiorców, co zachęca do dochodzenia swoich praw w sądzie.</p>
      `,
      icon: <Gavel size={24} />,
      category: "orzecznictwo",
    },
  ];

  const categories = [
    { name: "Wszystkie", value: "all" },
    { name: "Kredyty walutowe", value: "kredyty-walutowe" },
    { name: "Umowy SKD", value: "umowy-skd" },
    { name: "Orzecznictwo", value: "orzecznictwo" },
    { name: "Ogólne", value: "ogolne" },
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleReadMoreClick = (article: Article) => {
    setSelectedArticle(article);
    setShowArticleModal(true);
  };

  const closeArticleModal = () => {
    setShowArticleModal(false);
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5' }}>
      {/* Header */}
      <section className="py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 mb-8 text-lg transition-colors hover:opacity-80"
            style={{ color: '#D4AF37' }}
          >
            <ArrowLeft size={20} />
            <span>Powrót do strony głównej</span>
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Baza wiedzy
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Znajdź odpowiedzi na najczęściej zadawane pytania i pogłębij swoją wiedzę 
            na temat kredytów walutowych i umów SKD.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-10" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Szukaj artykułów..."
                className="w-full px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'rgba(245, 245, 245, 0.1)',
                  border: '1px solid rgba(245, 245, 245, 0.2)',
                  color: '#F5F5F5',
                  '--tw-ring-color': '#D4AF37'
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2" style={{ color: '#D4AF37' }} />
            </div>
            <select
              className="px-4 py-3 rounded-lg focus:outline-none focus:ring-2 appearance-none"
              style={{
                backgroundColor: 'rgba(245, 245, 245, 0.1)',
                border: '1px solid rgba(245, 245, 245, 0.2)',
                color: '#F5F5F5',
                '--tw-ring-color': '#D4AF37'
              }}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value} style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5' }}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArticles.length === 0 ? (
            <div className="text-center p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <p className="text-xl" style={{ color: '#F5F5F5' }}>
                Brak artykułów spełniających kryteria wyszukiwania.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="p-8 rounded-2xl shadow-xl border-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}
                >
                  <div className="w-16 h-16 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                    {React.cloneElement(article.icon as React.ReactElement, { size: 32, style: { color: '#0A1A2F' } })}
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: '#F5F5F5' }}>
                    {article.title}
                  </h2>
                  <p className="text-lg leading-relaxed mb-6 text-center" style={{ color: '#F5F5F5' }}>
                    {article.excerpt}
                  </p>
                  <div className="text-center">
                    <button
                      onClick={() => handleReadMoreClick(article)} // Updated onClick handler
                      className="inline-block font-bold py-3 px-6 rounded-lg text-md transition-all hover:-translate-y-1 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4"
                      style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}
                    >
                      Czytaj więcej →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-12 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#0A1A2F' }}>
              Nie znalazłeś odpowiedzi na swoje pytanie?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: '#0A1A2F' }}>
              Skontaktuj się z nami bezpośrednio. Każda sytuacja jest inna i wymaga indywidualnego podejścia. 
              Chętnie odpowiemy na wszystkie Twoje pytania podczas bezpłatnej konsultacji.
            </p>
            <button
              onClick={openModal}
              className="inline-block font-bold py-4 px-8 rounded-lg text-lg transition-all hover:-translate-y-2 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4"
              style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37', color: '#F5F5F5' }}
            >
              Umów bezpłatną konsultację
            </button>
          </div>
        </div>
      </section>

      {/* Article Detail Modal */}
      {showArticleModal && selectedArticle && (
        <ArticleDetailModal article={selectedArticle} onClose={closeArticleModal} />
      )}
    </div>
  );
};

export default KnowledgeBasePage;
