import React, { useState, useEffect } from 'react';
import { Clock, TrendingUp, Users, FileText, ChevronDown, ChevronUp, Briefcase, Target } from 'lucide-react';
import { useConsultationModal } from '../context/ConsultationModalContext';
import { ongoingCasesApi, type OngoingCase } from '../lib/supabase';

const WTrakcePage: React.FC = () => {
  const { openModal } = useConsultationModal();
  const [ongoingCases, setOngoingCases] = useState<OngoingCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCase, setExpandedCase] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    const fetchOngoingCases = async () => {
      try {
        setLoading(true);
        setError(null);

        const cases = await ongoingCasesApi.getAll();
        setOngoingCases(cases);
      } catch (e: any) {
        console.error('Error fetching ongoing cases:', e);
        setError(e.message || 'Wystąpił błąd podczas ładowania spraw w trakcie');
      } finally {
        setLoading(false);
      }
    };

    fetchOngoingCases();
  }, []);

  const toggleCase = (caseId: string) => {
    setExpandedCase(expandedCase === caseId ? null : caseId);
  };

  const filteredCases = filterType === 'all'
    ? ongoingCases
    : ongoingCases.filter(c => c.case_type.toLowerCase().includes(filterType.toLowerCase()));

  const totalExpectedAmount = ongoingCases.reduce((sum, c) => sum + c.expected_amount, 0);
  const totalCases = ongoingCases.length;
  const avgExpectedAmount = totalCases > 0 ? Math.round(totalExpectedAmount / totalCases) : 0;

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
                <Clock size={48} style={{ color: '#0A1A2F' }} />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
                Sprawy W Trakcie
              </h1>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
                Poznaj aktualne sprawy, nad którymi obecnie pracujemy. Każda z nich jest krokiem bliżej
                do sprawiedliwości i odzyskania należnych środków dla naszych klientów.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#0A1A2F' }}>
              Aktualne sprawy w liczbach
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#0A1A2F' }}>
              Statystyki naszych bieżących postępowań prawnych
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center group p-8 rounded-2xl shadow-xl border-4 transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <div className="w-20 h-20 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <Briefcase size={40} style={{ color: '#0A1A2F' }} />
              </div>
              <div className="text-5xl font-bold mb-2" style={{ color: '#D4AF37' }}>
                {totalCases}
              </div>
              <div className="text-xl font-semibold" style={{ color: '#F5F5F5' }}>
                Aktywnych spraw
              </div>
            </div>

            <div className="text-center group p-8 rounded-2xl shadow-xl border-4 transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <div className="w-20 h-20 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <Target size={40} style={{ color: '#0A1A2F' }} />
              </div>
              <div className="text-5xl font-bold mb-2" style={{ color: '#D4AF37' }}>
                {(totalExpectedAmount / 1000000).toFixed(1)}M
              </div>
              <div className="text-xl font-semibold" style={{ color: '#F5F5F5' }}>
                PLN oczekiwana kwota
              </div>
            </div>

            <div className="text-center group p-8 rounded-2xl shadow-xl border-4 transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <div className="w-20 h-20 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <TrendingUp size={40} style={{ color: '#0A1A2F' }} />
              </div>
              <div className="text-5xl font-bold mb-2" style={{ color: '#D4AF37' }}>
                {(avgExpectedAmount / 1000).toFixed(0)}K
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
              Bieżące postępowania prawne
            </h2>
            <p className="text-xl mb-8" style={{ color: '#F5F5F5' }}>
              Zobacz szczegóły spraw, nad którymi obecnie pracujemy dla naszych klientów
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
                Ładowanie spraw w trakcie...
              </p>
            </div>
          )}

          {error && (
            <div className="text-center p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <p className="text-xl text-red-400 mb-4">
                Błąd podczas ładowania spraw w trakcie
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
              {filteredCases.map((ongoingCase) => (
                <div
                  key={ongoingCase.id}
                  className="rounded-2xl shadow-lg border-4 overflow-hidden"
                  style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
                >
                  <button
                    onClick={() => toggleCase(ongoingCase.id)}
                    className="w-full p-6 text-left flex items-center justify-between transition-all hover:bg-opacity-90"
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold" style={{ color: '#0A1A2F' }}>
                          {ongoingCase.case_type}
                        </h3>
                        <span className="text-2xl font-bold ml-4" style={{ color: '#D4AF37' }}>
                          ~{ongoingCase.expected_amount.toLocaleString('pl-PL')} PLN
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm mb-2" style={{ color: '#0A1A2F' }}>
                        <span className="font-medium">{ongoingCase.client_location}</span>
                        <span>•</span>
                        <span>Rozpoczęto: {new Date(ongoingCase.start_date).toLocaleDateString('pl-PL')}</span>
                      </div>
                      <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#D4AF37', color: '#0A1A2F' }}>
                        {ongoingCase.stage}
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      {expandedCase === ongoingCase.id ? (
                        <ChevronUp size={24} style={{ color: '#D4AF37' }} />
                      ) : (
                        <ChevronDown size={24} style={{ color: '#D4AF37' }} />
                      )}
                    </div>
                  </button>
                  {expandedCase === ongoingCase.id && (
                    <div className="px-6 pb-6">
                      <div className="pt-4 border-t" style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }}>
                        <div className="mb-4">
                          <p className="text-sm font-semibold mb-1" style={{ color: '#0A1A2F' }}>
                            Aktualny status:
                          </p>
                          <p className="text-base" style={{ color: '#0A1A2F' }}>
                            {ongoingCase.current_status}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold mb-1" style={{ color: '#0A1A2F' }}>
                            Szczegóły sprawy:
                          </p>
                          <p className="text-lg leading-relaxed" style={{ color: '#0A1A2F' }}>
                            {ongoingCase.description}
                          </p>
                        </div>
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
              Dołącz do grona naszych klientów
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
              Nie zwlekaj z podjęciem działań. Skontaktuj się z nami już dziś, aby otrzymać bezpłatną
              analizę swojej sprawy i poznać swoje możliwości prawne.
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

export default WTrakcePage;
