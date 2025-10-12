import React, { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Users, CheckCircle, ChevronDown, ChevronUp, Award, DollarSign } from 'lucide-react';
import { useConsultationModal } from '../context/ConsultationModalContext';

interface WonCase {
  id: string;
  case_type: string;
  amount_recovered: number;
  date_won: string;
  description: string;
  client_location: string;
}

const WygraneSsprawyPage: React.FC = () => {
  const { openModal } = useConsultationModal();
  const [wonCases, setWonCases] = useState<WonCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCase, setExpandedCase] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    const fetchWonCases = async () => {
      try {
        setLoading(true);
        setError(null);

        const fallbackCases: WonCase[] = [
          {
            id: 'case-1',
            case_type: 'Kredyt walutowy CHF',
            amount_recovered: 250000,
            date_won: '2024-09-15',
            description: 'Unieważnienie umowy kredytu frankowego. Klient odzyskał nadpłacone raty i został zwolniony z pozostałego zadłużenia wobec banku.',
            client_location: 'Warszawa'
          },
          {
            id: 'case-2',
            case_type: 'Kredyt SKD',
            amount_recovered: 180000,
            date_won: '2024-08-22',
            description: 'Skuteczne zastosowanie sankcji kredytu darmowego. Bank zobowiązany do zwrotu wszystkich odsetek i prowizji.',
            client_location: 'Kraków'
          },
          {
            id: 'case-3',
            case_type: 'Kredyt walutowy EUR',
            amount_recovered: 320000,
            date_won: '2024-07-10',
            description: 'Wyrok unieważniający umowę kredytu denominowanego w euro. Zwrot nadpłaconych środków oraz anulowanie zadłużenia.',
            client_location: 'Gdańsk'
          },
          {
            id: 'case-4',
            case_type: 'Kredyt walutowy CHF',
            amount_recovered: 410000,
            date_won: '2024-06-18',
            description: 'Sprawa przeciwko dużemu bankowi komercyjnemu. Całkowite unieważnienie umowy kredytowej z tytułu klauzul abuzywnych.',
            client_location: 'Wrocław'
          },
          {
            id: 'case-5',
            case_type: 'Kredyt SKD',
            amount_recovered: 95000,
            date_won: '2024-05-30',
            description: 'Sankcja kredytu darmowego za nieprawidłowe informacje przedkontraktowe. Zwrot wszystkich kosztów kredytu.',
            client_location: 'Poznań'
          },
          {
            id: 'case-6',
            case_type: 'Kredyt walutowy USD',
            amount_recovered: 275000,
            date_won: '2024-04-12',
            description: 'Unieważnienie kredytu denominowanego w dolarach. Klient odzyskał znaczną część wpłaconych środków.',
            client_location: 'Łódź'
          }
        ];

        setWonCases(fallbackCases);
      } catch (e: any) {
        console.error('Error fetching won cases:', e);
        setError(e.message || 'Wystąpił błąd podczas ładowania wygranych spraw');
      } finally {
        setLoading(false);
      }
    };

    fetchWonCases();
  }, []);

  const toggleCase = (caseId: string) => {
    setExpandedCase(expandedCase === caseId ? null : caseId);
  };

  const filteredCases = filterType === 'all'
    ? wonCases
    : wonCases.filter(c => c.case_type.toLowerCase().includes(filterType.toLowerCase()));

  const totalRecovered = wonCases.reduce((sum, c) => sum + c.amount_recovered, 0);
  const totalCases = wonCases.length;
  const avgRecovered = totalCases > 0 ? Math.round(totalRecovered / totalCases) : 0;

  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: '#0A1A2F' }}>
      <section
        className="py-20 relative overflow-hidden"
        style={{
          backgroundImage: 'url(/hero-background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="w-24 h-24 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-8 transition-all duration-500" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <Trophy size={48} style={{ color: '#0A1A2F' }} />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
                Wygrane Sprawy
              </h1>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
                Poznaj historie sukcesu naszych klientów i zobacz, jak pomogliśmy im odzyskać należne środki
                oraz uwolnić się od niesprawiedliwych umów kredytowych.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#0A1A2F' }}>
              Nasze osiągnięcia w liczbach
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#0A1A2F' }}>
              Rzeczywiste wyniki, które zmieniły życie naszych klientów
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center group p-8 rounded-2xl shadow-xl border-4 transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <div className="w-20 h-20 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <Award size={40} style={{ color: '#0A1A2F' }} />
              </div>
              <div className="text-5xl font-bold mb-2" style={{ color: '#D4AF37' }}>
                {totalCases}
              </div>
              <div className="text-xl font-semibold" style={{ color: '#F5F5F5' }}>
                Wygranych spraw
              </div>
            </div>

            <div className="text-center group p-8 rounded-2xl shadow-xl border-4 transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <div className="w-20 h-20 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <DollarSign size={40} style={{ color: '#0A1A2F' }} />
              </div>
              <div className="text-5xl font-bold mb-2" style={{ color: '#D4AF37' }}>
                {(totalRecovered / 1000000).toFixed(1)}M
              </div>
              <div className="text-xl font-semibold" style={{ color: '#F5F5F5' }}>
                PLN odzyskanych
              </div>
            </div>

            <div className="text-center group p-8 rounded-2xl shadow-xl border-4 transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <div className="w-20 h-20 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <TrendingUp size={40} style={{ color: '#0A1A2F' }} />
              </div>
              <div className="text-5xl font-bold mb-2" style={{ color: '#D4AF37' }}>
                {(avgRecovered / 1000).toFixed(0)}K
              </div>
              <div className="text-xl font-semibold" style={{ color: '#F5F5F5' }}>
                PLN średnio na sprawę
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
              Historie sukcesu naszych klientów
            </h2>
            <p className="text-xl mb-8" style={{ color: '#F5F5F5' }}>
              Każda wygrana sprawa to nie tylko liczby - to zmienione życie naszego klienta
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={() => setFilterType('all')}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all border-2 ${
                  filterType === 'all'
                    ? 'shadow-lg scale-105'
                    : 'hover:scale-105'
                }`}
                style={filterType === 'all'
                  ? { backgroundColor: '#D4AF37', borderColor: '#D4AF37', color: '#0A1A2F' }
                  : { backgroundColor: 'transparent', borderColor: '#D4AF37', color: '#F5F5F5' }
                }
              >
                Wszystkie
              </button>
              <button
                onClick={() => setFilterType('chf')}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all border-2 ${
                  filterType === 'chf'
                    ? 'shadow-lg scale-105'
                    : 'hover:scale-105'
                }`}
                style={filterType === 'chf'
                  ? { backgroundColor: '#D4AF37', borderColor: '#D4AF37', color: '#0A1A2F' }
                  : { backgroundColor: 'transparent', borderColor: '#D4AF37', color: '#F5F5F5' }
                }
              >
                Kredyty CHF
              </button>
              <button
                onClick={() => setFilterType('skd')}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all border-2 ${
                  filterType === 'skd'
                    ? 'shadow-lg scale-105'
                    : 'hover:scale-105'
                }`}
                style={filterType === 'skd'
                  ? { backgroundColor: '#D4AF37', borderColor: '#D4AF37', color: '#0A1A2F' }
                  : { backgroundColor: 'transparent', borderColor: '#D4AF37', color: '#F5F5F5' }
                }
              >
                Kredyty SKD
              </button>
              <button
                onClick={() => setFilterType('eur')}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all border-2 ${
                  filterType === 'eur'
                    ? 'shadow-lg scale-105'
                    : 'hover:scale-105'
                }`}
                style={filterType === 'eur'
                  ? { backgroundColor: '#D4AF37', borderColor: '#D4AF37', color: '#0A1A2F' }
                  : { backgroundColor: 'transparent', borderColor: '#D4AF37', color: '#F5F5F5' }
                }
              >
                Kredyty EUR
              </button>
            </div>
          </div>

          {loading && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: '#D4AF37' }}></div>
              <p className="text-xl mt-4" style={{ color: '#F5F5F5' }}>
                Ładowanie wygranych spraw...
              </p>
            </div>
          )}

          {error && (
            <div className="text-center p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <p className="text-xl text-red-400 mb-4">
                Błąd podczas ładowania wygranych spraw
              </p>
              <p className="text-sm" style={{ color: '#F5F5F5' }}>
                {error}
              </p>
            </div>
          )}

          {!loading && !error && filteredCases.length === 0 && (
            <div className="text-center p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
              <p className="text-xl" style={{ color: '#0A1A2F' }}>
                Brak spraw dla wybranego filtra.
              </p>
            </div>
          )}

          {!loading && !error && filteredCases.length > 0 && (
            <div className="space-y-4 max-w-4xl mx-auto">
              {filteredCases.map((wonCase) => (
                <div
                  key={wonCase.id}
                  className="rounded-2xl shadow-lg border-4 overflow-hidden"
                  style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
                >
                  <button
                    onClick={() => toggleCase(wonCase.id)}
                    className="w-full p-6 text-left flex items-center justify-between transition-all hover:bg-opacity-90"
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold" style={{ color: '#0A1A2F' }}>
                          {wonCase.case_type}
                        </h3>
                        <span className="text-2xl font-bold ml-4" style={{ color: '#D4AF37' }}>
                          {wonCase.amount_recovered.toLocaleString('pl-PL')} PLN
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm" style={{ color: '#0A1A2F' }}>
                        <span className="font-medium">{wonCase.client_location}</span>
                        <span>•</span>
                        <span>{new Date(wonCase.date_won).toLocaleDateString('pl-PL')}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      {expandedCase === wonCase.id ? (
                        <ChevronUp size={24} style={{ color: '#D4AF37' }} />
                      ) : (
                        <ChevronDown size={24} style={{ color: '#D4AF37' }} />
                      )}
                    </div>
                  </button>
                  {expandedCase === wonCase.id && (
                    <div className="px-6 pb-6">
                      <div className="pt-4 border-t" style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }}>
                        <p className="text-lg leading-relaxed" style={{ color: '#0A1A2F' }}>
                          {wonCase.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center p-12 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
              Twoja sprawa może być następnym sukcesem
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
              Nie czekaj dłużej. Skontaktuj się z nami już dziś, aby otrzymać bezpłatną analizę
              swojej sytuacji i dowiedzieć się, jak możemy Ci pomóc.
            </p>
            <button
              onClick={() => openModal(null, 'direct_consultation')}
              className="inline-block font-bold py-4 px-8 rounded-lg text-lg transition-all hover:-translate-y-2 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4"
              style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}
            >
              Bezpłatna konsultacja
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WygraneSsprawyPage;
