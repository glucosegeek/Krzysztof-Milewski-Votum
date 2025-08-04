import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NewsPage: React.FC = () => {
const newsArticles = [
    {
      id: 1,
      title: "Nowe orzeczenie TSUE w sprawie kredytów frankowych",
      date: "2025-07-28",
      content: "Trybunał Sprawiedliwości Unii Europejskiej wydał kolejne ważne orzeczenie, które umacnia pozycję frankowiczów w sporach z bankami. Orzeczenie dotyczyło kwestii przedawnienia roszczeń banków o zwrot kapitału po unieważnieniu umowy kredytowej."
    },
    {
      id: 2,
      title: "Zmiany w prawie konsumenckim dotyczące umów SKD",
      date: "2025-07-20",
      content: "Weszły w życie nowe przepisy chroniące konsumentów przed nieuczciwymi praktykami w umowach sprzedaży konsumenckiej na odległość. Zmiany obejmują m.in. wydłużenie terminu na odstąpienie od umowy."
    },
    {
      id: 3,
      title: "Sukcesy kancelarii Votum Consumer Care w lipcu",
      date: "2025-07-15",
      content: "W minionym miesiącu kancelaria Votum Consumer Care odnotowała rekordową liczbę wygranych spraw przeciwko bankom, co potwierdza wysoką skuteczność w walce o prawa kredytobiorców."
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
        </div>
      </section>
      {/* Add your news content here */}
    </div>
  );
};

export default NewsPage;
