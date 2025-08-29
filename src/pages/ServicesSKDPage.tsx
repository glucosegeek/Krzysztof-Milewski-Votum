import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, AlertCircle, CheckCircle, DollarSign } from 'lucide-react';
import { useConsultationModal } from '../context/ConsultationModalContext';

const ServicesSKDPage: React.FC = () => {
  const { openModal } = useConsultationModal();

  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: '#0A1A2F' }}>
      {/* Header */}
      <section className="py-20" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">            
            <div className="text-center mb-16">
              <div className="w-24 h-24 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-8" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <CreditCard size={48} style={{ color: '#0A1A2F' }} />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
                Unieważnianie umów SKD
              </h1>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
                Pomoc prawna w sprawach dotyczących umów sprzedaży konsumenckiej na odległość (SKD) 
                oraz nieuczciwych praktyk handlowych.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#0A1A2F' }}>
                  Czym są umowy SKD?
                </h2>
                <p className="text-lg mb-6 leading-relaxed" style={{ color: '#0A1A2F' }}>
                  Umowy sprzedaży konsumenckiej na odległość (SKD) to kontrakty zawierane bez 
                  jednoczesnej fizycznej obecności stron, często przez telefon, internet lub pocztę. 
                  Obejmują one różnorodne produkty i usługi finansowe.
                </p>
                <p className="text-lg leading-relaxed" style={{ color: '#0A1A2F' }}>
                  Niestety, wiele takich umów zawiera nieuczciwe klauzule lub zostało zawartych 
                  z naruszeniem praw konsumenta, co daje podstawy do ich unieważnienia.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-80 h-80 rounded-2xl shadow-xl border-8 flex items-center justify-center" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                  <CreditCard size={120} style={{ color: '#F5F5F5' }} />
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#0A1A2F' }}>
                Najczęstsze problemy z umowami SKD
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-8 rounded-2xl shadow-lg border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                  <AlertCircle size={40} style={{ color: '#D4AF37' }} className="mb-4" />
                  <h3 className="text-xl font-semibold mb-4" style={{ color: '#F5F5F5' }}>Nieuczciwe praktyki</h3>
                  <p style={{ color: '#F5F5F5' }}>
                    Wprowadzanie w błąd co do warunków umowy, ukrywanie istotnych informacji 
                    lub wywieranie presji na konsumenta.
                  </p>
                </div>
                
                <div className="p-8 rounded-2xl shadow-lg border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                  <DollarSign size={40} style={{ color: '#D4AF37' }} className="mb-4" />
                  <h3 className="text-xl font-semibold mb-4" style={{ color: '#F5F5F5' }}>Ukryte koszty</h3>
                  <p style={{ color: '#F5F5F5' }}>
                    Nieujawnienie wszystkich opłat i kosztów związanych z produktem 
                    lub usługą przed zawarciem umowy.
                  </p>
                </div>
                
                <div className="p-8 rounded-2xl shadow-lg border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                  <CheckCircle size={40} style={{ color: '#D4AF37' }} className="mb-4" />
                  <h3 className="text-xl font-semibold mb-4" style={{ color: '#F5F5F5' }}>Naruszenie prawa odstąpienia</h3>
                  <p style={{ color: '#F5F5F5' }}>
                    Niepoinformowanie o prawie do odstąpienia od umowy w terminie 14 dni 
                    lub utrudnianie skorzystania z tego prawa.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#0A1A2F' }}>
                Rodzaje umów SKD, z którymi pomagamy
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl shadow-md border-2" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#F5F5F5' }}>Produkty finansowe</h3>
                  <p style={{ color: '#F5F5F5' }}>Ubezpieczenia, pożyczki, karty kredytowe, lokaty</p>
                </div>
                
                <div className="p-6 rounded-xl shadow-md border-2" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#F5F5F5' }}>Usługi telekomunikacyjne</h3>
                  <p style={{ color: '#F5F5F5' }}>Abonamenti telefoniczne, internet, telewizja</p>
                </div>
                
                <div className="p-6 rounded-xl shadow-md border-2" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#F5F5F5' }}>Usługi energetyczne</h3>
                  <p style={{ color: '#F5F5F5' }}>Umowy na dostawę prądu, gazu, fotowoltaika</p>
                </div>
                
                <div className="p-6 rounded-xl shadow-md border-2" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#F5F5F5' }}>Inne produkty</h3>
                  <p style={{ color: '#F5F5F5' }}>Sprzęt AGD, elektronika, kursy, szkolenia</p>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#0A1A2F' }}>
                Jak pomagamy
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: '#0A1A2F' }}>
                    <span className="text-sm font-bold" style={{ color: '#D4AF37' }}>1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: '#0A1A2F' }}>
                      Analiza umowy i okoliczności jej zawarcia
                    </h3>
                    <p className="text-lg leading-relaxed" style={{ color: '#0A1A2F' }}>
                      Sprawdzamy, czy umowa została zawarta zgodnie z prawem i czy nie zawiera 
                      klauzul abuzywnych lub niekorzystnych dla konsumenta.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: '#0A1A2F' }}>
                    <span className="text-sm font-bold" style={{ color: '#D4AF37' }}>2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: '#0A1A2F' }}>
                      Próba polubownego rozwiązania
                    </h3>
                    <p className="text-lg leading-relaxed" style={{ color: '#0A1A2F' }}>
                      Najpierw próbujemy rozwiązać sprawę w drodze negocjacji z drugą stroną, 
                      co często pozwala uniknąć długotrwałego procesu sądowego.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: '#0A1A2F' }}>
                    <span className="text-sm font-bold" style={{ color: '#D4AF37' }}>3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: '#0A1A2F' }}>
                      Postępowanie sądowe
                    </h3>
                    <p className="text-lg leading-relaxed" style={{ color: '#0A1A2F' }}>
                      W przypadku braku porozumienia, reprezentujemy klienta w sądzie, 
                      dążąc do unieważnienia umowy i odzyskania wpłaconych środków.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center p-12 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
                Masz problem z umową SKD?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
                Nie czekaj! Skontaktuj się z nami już dziś, aby otrzymać bezpłatną ocenę swojej sytuacji 
                i dowiedzieć się, jakie masz możliwości prawne.
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
        </div>
      </section>
    </div>
  );
};

export default ServicesSKDPage;