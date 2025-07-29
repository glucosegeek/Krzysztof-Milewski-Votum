import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useConsultationModal } from '../context/ConsultationModalContext';

const FAQPage: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const { openModal } = useConsultationModal();

  const faqs = [
    {
      id: 1,
      question: "Czy konsultacja jest rzeczywiście bezpłatna?",
      answer: "Tak, pierwsza konsultacja jest całkowicie bezpłatna i bez zobowiązań. Podczas niej analizujemy Twoją sytuację, sprawdzamy dokumenty i informujemy o możliwościach prawnych. Nie ponosisz żadnych kosztów za tę usługę.",
    },
    {
      id: 2,
      question: "Ile trwa proces sądowy z bankiem?",
      answer: "Czas trwania procesu sądowego może się różnić w zależności od złożoności sprawy i obciążenia sądu. Zazwyczaj postępowanie w pierwszej instancji trwa od 12 do 24 miesięcy. W przypadku apelacji proces może się wydłużyć o kolejne 6-12 miesięcy.",
    },
    {
      id: 3,
      question: "Co się stanie, jeśli przegram sprawę?",
      answer: "Działamy w oparciu o sukces, co oznacza, że nasze wynagrodzenie uzależnione jest od wygranej. W przypadku przegranej nie płacisz nam honorarium. Jednak mogą wystąpić koszty sądowe, które zazwyczaj pokrywa przegrywająca strona. Szczegóły omawiamy podczas konsultacji.",
    },
    {
      id: 4,
      question: "Czy mogę dochodzić roszczeń, jeśli spłaciłem już kredyt?",
      answer: "Tak, możesz dochodzić zwrotu nadpłaconych kwot nawet po spłaceniu kredytu. Jeśli umowa zawierała klauzule abuzywne, masz prawo do odzyskania różnicy między tym, co zapłaciłeś, a tym, co powinieneś był zapłacić zgodnie z prawem.",
    },
    {
      id: 5,
      question: "Jakie dokumenty potrzebuję do analizy sprawy?",
      answer: "Do wstępnej analizy potrzebujemy: umowę kredytową, harmonogram spłat, wyciągi z konta kredytowego, korespondencję z bankiem. Jeśli nie masz wszystkich dokumentów, pomożemy Ci je uzyskać od banku.",
    },
    {
      id: 6,
      question: "Czy każdy kredyt CHF można skutecznie zaskarżyć?",
      answer: "Nie każdy kredyt CHF automatycznie daje podstawy do wygranej sprawy. Sukces zależy od konkretnych zapisów w umowie, sposobu jej zawarcia i innych czynników. Dlatego każdą sprawę analizujemy indywidualnie podczas bezpłatnej konsultacji.",
    },
    {
      id: 7,
      question: "Co to znaczy 'działanie w oparciu o sukces'?",
      answer: "Oznacza to, że nasze wynagrodzenie uzależnione jest od pozytywnego wyniku sprawy. Jeśli nie wygramy, nie płacisz nam honorarium. Nasze wynagrodzenie stanowi procent od odzyskanej kwoty, co motywuje nas do jak najlepszego reprezentowania Twoich interesów.",
    },
    {
      id: 8,
      question: "Czy mogę odstąpić od umowy SKD po jej podpisaniu?",
      answer: "Tak, w przypadku umów SKD (sprzedaży konsumenckiej na odległość) masz prawo odstąpić od umowy w terminie 14 dni bez podania przyczyny. Termin liczy się od dnia zawarcia umowy lub otrzymania produktu. Sprzedawca musi Cię o tym prawie poinformować.",
    },
    {
      id: 9,
      question: "Jak długo trwa analiza mojej umowy?",
      answer: "Wstępną analizę przeprowadzamy zazwyczaj w ciągu 2-3 dni roboczych od otrzymania dokumentów. Szczegółowa analiza prawna może zająć do tygodnia. O wynikach informujemy telefonicznie lub mailowo, a następnie omawiamy dalsze kroki.",
    },
    {
      id: 10,
      question: "Czy bank może podwyższyć ratę podczas procesu?",
      answer: "Bank nie może arbitralnie podwyższać rat podczas toczącego się procesu sądowego. Jeśli jednak nadal spłacasz kredyt, raty mogą się zmieniać zgodnie z zapisami umowy (np. ze względu na zmiany stóp procentowych). Szczegóły zależą od konkretnej umowy.",
    }
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: '#0A1A2F' }}>
      {/* Header */}
      <section className="py-20" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 mb-8 text-lg transition-colors hover:opacity-80"
              style={{ color: '#D4AF37' }}
            >
              <ArrowLeft size={20} />
              <span>Powrót do strony głównej</span>
            </Link>
            
            <div className="text-center mb-16">
              <div className="w-24 h-24 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-8" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <HelpCircle size={48} style={{ color: '#0A1A2F' }} />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
                Najczęściej zadawane pytania
              </h1>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
                Znajdź odpowiedzi na najważniejsze pytania dotyczące kredytów walutowych, 
                umów SKD i procesu prawnego. Jeśli nie znajdziesz odpowiedzi, skontaktuj się z nami.
              </p>
              <button
                onClick={openModal}
      </section>

      {/* FAQ Section */}
      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div 
                key={faq.id}
                className="rounded-2xl shadow-lg border-4 overflow-hidden"
                style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}
              >
                <button
              </button>
                  className="w-full p-6 text-left flex items-center justify-between transition-all hover:bg-opacity-90"
                  style={{ backgroundColor: 'transparent' }}
                >
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold" style={{ color: '#F5F5F5' }}>
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    {openFAQ === faq.id ? (
                      <ChevronUp size={24} style={{ color: '#D4AF37' }} />
                    ) : (
                      <ChevronDown size={24} style={{ color: '#D4AF37' }} />
                    )}
                  </div>
                </button>
                
                {openFAQ === faq.id && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t" style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }}>
                      <p className="text-lg leading-relaxed" style={{ color: '#F5F5F5' }}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
              Nasze doświadczenie w liczbach
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
              <div className="text-4xl font-bold mb-2" style={{ color: '#0A1A2F' }}>200+</div>
              <div className="text-lg" style={{ color: '#0A1A2F' }}>Wygranych spraw</div>
            </div>
            
            <div className="text-center p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
              <div className="text-4xl font-bold mb-2" style={{ color: '#0A1A2F' }}>99%</div>
              <div className="text-lg" style={{ color: '#0A1A2F' }}>Wskaźnik skuteczności</div>
            </div>
            
            <div className="text-center p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
              <div className="text-4xl font-bold mb-2" style={{ color: '#0A1A2F' }}>8+</div>
              <div className="text-lg" style={{ color: '#0A1A2F' }}>Lat doświadczenia</div>
            </div>
            
            <div className="text-center p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
              <div className="text-4xl font-bold mb-2" style={{ color: '#0A1A2F' }}>24h</div>
              <div className="text-lg" style={{ color: '#0A1A2F' }}>Średni czas odpowiedzi</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-12 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
              Nie znalazłeś odpowiedzi na swoje pytanie?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
              Skontaktuj się z nami bezpośrednio. Każda sytuacja jest inna i wymaga indywidualnego podejścia. 
              Chętnie odpowiemy na wszystkie Twoje pytania podczas bezpłatnej konsultacji.
            </p>
            <Link 
              to="/"
              state={{ scrollToContact: true }}
              className="inline-block font-bold py-4 px-8 rounded-lg text-lg transition-all hover:-translate-y-2 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4"
              style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}
            >
              Zadaj pytanie
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;