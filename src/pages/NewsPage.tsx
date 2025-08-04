import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NewsPage: React.FC = () => {
const newsArticles = [
    {
      id: 1,
      title: "Sankcja kredytu darmowego – Sąd Najwyższy czeka na TSUE",
      date: "2025-07-28",
      content: `30 lipca 2025 r. w Izbie Cywilnej Sądu Najwyższego odbyła się rozprawa w sprawie III CZP 15/25 dotycząca tzw. sankcji kredytu darmowego (SKD). Sprawa trafiła do SN na skutek pytań prawnych zadanych przez Sąd Okręgowy w Poznaniu. Dotyczą one m.in.:
      <ul>
        <li>momentu, w którym konsument może skutecznie złożyć oświadczenie o SKD,</li>
        <li>abuzywności postanowień umownych i jej wpływu na skuteczność oświadczenia,</li>
        <li>legalności naliczania odsetek od prowizji, której kredytobiorca nie otrzymał,</li>
        <li>nieprawidłowego wyliczania RRSO i całkowitej kwoty do zapłaty.</li>
      </ul>
      Sąd Najwyższy nie wydał uchwały – zdecydował o wstrzymaniu się z rozstrzygnięciem do czasu orzeczenia Trybunału Sprawiedliwości UE w sprawie C-566/24. To decyzja, która pokazuje powagę sprawy – potencjalne skutki mogą być przełomowe. Jeżeli TSUE opowie się po stronie konsumentów, możliwa będzie fala roszczeń wobec banków, podobnie jak miało to miejsce w sprawach frankowych.`
    },
    {
      id: 2,
      title: "Odsetki od nieważnej umowy frankowej należne już od dnia złożenia pozwu – wyrok SN z 29 kwietnia 2025 r.",
      date: "2025-07-20",
      content: "Sąd Najwyższy potwierdził, że umowy frankowe zawierające niedozwolone klauzule indeksacyjne (waloryzacja kursem CHF ustalanym jednostronnie przez bank) są nieważne. W efekcie kredytobiorca ma prawo domagać się zwrotu wszystkich wpłaconych środków. W rozpatrywanej sprawie SN uznał, że bank popadł w opóźnienie już w momencie otrzymania wezwania do zapłaty od klientki – jeszcze przed złożeniem pozwu. Zasądzenie odsetek ustawowych za opóźnienie od dnia wniesienia sprawy (19 sierpnia 2017 r.) było więc zasadne. Wyrok: SN, sygn. II CSKP 1211/22 z 29.04.2025 r. Sędziowie: Monika Koba, Karol Weitz, Agnieszka Piotrowska. To ważne orzeczenie wzmacnia pozycję frankowiczów i potwierdza prawo do pełnego zwrotu wpłat – z ustawowymi odsetkami."
    }
  ];
  
  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5' }}>
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
            Aktualności
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Tutaj znajdziesz najnowsze wiadomości i aktualizacje.
          </p>
          <section className="py-20">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-12">
                  {newsArticles.map((article) => (
                    <div key={article.id} className="p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                      <h2 className="text-3xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
                        {article.title}
                      </h2>
                      <p className="text-sm mb-4" style={{ color: '#D4AF37' }}>
                        Opublikowano: {article.date}
                      </p>
                      <p className="text-lg leading-relaxed" style={{ color: '#F5F5F5' }}>
                        {article.content}
                      </p>
                      {/* You can add a "Read More" link here if you plan to have full article pages */}
                    </div>
                  ))}
                </div>
              </div>
          </section>

        </div>
      </section>
      {/* Add your news content here */}
    </div>
  );
};

export default NewsPage;
