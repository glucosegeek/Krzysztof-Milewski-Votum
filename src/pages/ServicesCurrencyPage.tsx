import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { useConsultationModal } from '../context/ConsultationModalContext';

const ServicesCurrencyPage: React.FC = () => {
  const [currentIconIndex, setCurrentIconIndex] = React.useState(0);
  const { openModal } = useConsultationModal();
  
  const currencyIcons = [
    { name: 'EUR' },
    { name: 'USD' },
    { name: 'CHF' }
  ];
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % currencyIcons.length);
    }, 2000); // Change icon every 2 seconds
    
    return () => clearInterval(interval);
  }, [currencyIcons.length]);
  

  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: '#0A1A2F' }}>
      {/* Header */}
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
          <span className="text-2xl font-bold" style={{ color: '#0A1A2F' }}>
            {currencyIcons[currentIconIndex].name}
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
          Unieważnianie umów walutowych
        </h1>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
          Specjalizujemy się w sprawach dotyczących kredytów denominowanych w walutach obcych, 
          szczególnie we frankach szwajcarskich (CHF).
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
                  Czym są kredyty walutowe?
                </h2>
                <p className="text-lg mb-6 leading-relaxed" style={{ color: '#0A1A2F' }}>
                  Kredyty walutowe to pożyczki udzielane w walucie obcej (najczęściej CHF, EUR), 
                  które były popularne w Polsce w latach 2004-2011. Banki oferowały je jako 
                  alternatywę dla kredytów złotowych ze względu na niższe oprocentowanie.
                </p>
                <p className="text-lg leading-relaxed" style={{ color: '#0A1A2F' }}>
                  Jednak wraz ze wzrostem kursu walut obcych, szczególnie franka szwajcarskiego, 
                  zadłużenie kredytobiorców znacznie wzrosło, co doprowadziło do licznych sporów sądowych.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-80 h-80 rounded-2xl shadow-xl border-8 flex items-center justify-center" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                  <Scale size={120} style={{ color: '#F5F5F5' }} />
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#0A1A2F' }}>
                Problemy z kredytami walutowymi
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 rounded-2xl shadow-lg border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                  <AlertTriangle size={40} style={{ color: '#D4AF37' }} className="mb-4" />
                  <h3 className="text-xl font-semibold mb-4" style={{ color: '#F5F5F5' }}>Klauzule abuzywne</h3>
                  <p style={{ color: '#F5F5F5' }}>
                    Wiele umów kredytowych zawierało nieuczciwe klauzule dotyczące przeliczania walut, 
                    które były niekorzystne dla kredytobiorców.
                  </p>
                </div>
                
                <div className="p-8 rounded-2xl shadow-lg border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                  <FileText size={40} style={{ color: '#D4AF37' }} className="mb-4" />
                  <h3 className="text-xl font-semibold mb-4" style={{ color: '#F5F5F5' }}>Brak transparentności</h3>
                  <p style={{ color: '#F5F5F5' }}>
                    Banki często nie informowały klientów o rzeczywistym ryzyku związanym 
                    z kredytami walutowymi i możliwymi konsekwencjami.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#0A1A2F' }}>
                Nasze działania
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: '#0A1A2F' }}>
                    <CheckCircle size={20} style={{ color: '#D4AF37' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: '#0A1A2F' }}>
                      Analiza umowy kredytowej
                    </h3>
                    <p className="text-lg leading-relaxed" style={{ color: '#0A1A2F' }}>
                      Szczegółowe sprawdzenie wszystkich klauzul umownych pod kątem ich zgodności z prawem 
                      i identyfikacja postanowień abuzywnych.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: '#0A1A2F' }}>
                    <CheckCircle size={20} style={{ color: '#D4AF37' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: '#0A1A2F' }}>
                      Przygotowanie pozwu
                    </h3>
                    <p className="text-lg leading-relaxed" style={{ color: '#0A1A2F' }}>
                      Profesjonalne przygotowanie dokumentacji procesowej i strategii prawnej 
                      dostosowanej do specyfiki każdej sprawy.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: '#0A1A2F' }}>
                    <CheckCircle size={20} style={{ color: '#D4AF37' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: '#0A1A2F' }}>
                      Reprezentacja w sądzie
                    </h3>
                    <p className="text-lg leading-relaxed" style={{ color: '#0A1A2F' }}>
                      Pełna reprezentacja procesowa we wszystkich instancjach sądowych 
                      aż do prawomocnego zakończenia sprawy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center p-12 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
                Gotowy na walkę o swoje prawa?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
                Skontaktuj się z nami już dziś, aby otrzymać bezpłatną analizę swojej umowy kredytowej 
                i dowiedzieć się o swoich możliwościach prawnych.
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

export default ServicesCurrencyPage;