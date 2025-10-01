import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useConsultationModal } from '../context/ConsultationModalContext';

const AboutMePage: React.FC = () => {
  const { openModal } = useConsultationModal();
  
  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: '#F5F5F5', color: '#0A1A2F' }}>
      
      {/* Main Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Title - Centered Above */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              O mnie
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Ekspert ds. unieważniania kredytów walutowych | Przedstawiciel DSA Investment S.A<br />
              Strateg sprzedaży i marketingu z 30-letnim doświadczeniem
            </p>
          </div>
          
          {/* Two Column Layout: Text Left, Image Right */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            
            {/* Left Column - Text Content */}
            <div className="space-y-8 p-8 text-lg leading-relaxed rounded-2xl shadow-lg border-4" 
                 style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37', color: '#F5F5F5' }}>
              
              {/* Experience Section */}
              <div>
                <p>
                  Przez blisko 3 dekady skutecznie zarządzałem projektami, budowałem ogólnopolskie zespoły sprzedażowe i wdrażałem strategie promocyjne dla wielu topowych marek w różnych branżach. Dziś koncentruję się na nowoczesnym marketingu w mediach społecznościowych oraz wykorzystaniu AI do tworzenia efektywnych zespołów handlowych.
                </p>
              </div>

              {/* Mission Section */}
              <div>
                <p>
                  W Votum Consumer Care pomagam osobom uwikłanym w toksyczne kredyty walutowe – zarówno aktywne, jak i spłacone – unieważnić umowy i odzyskać należne im środki. Na etapie wstępnej analizy wyliczam realne korzyści finansowe wynikające z unieważnienia umowy oraz rekomenduję najlepsze możliwe rozwiązanie. Doradzam na każdym etapie – od analizy po wyrok sądu.
                </p>
              </div>

              {/* Key Benefits List */}
              <ul className="list-none space-y-3">
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">✅</span>
                  <span>Analiza wstępna i wyliczenie korzyści są całkowicie <strong style={{ color: '#D4AF37' }}>BEZPŁATNE</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">✅</span>
                  <span>Nie ryzykujesz nic – możesz tylko zyskać.</span>
                </li>
              </ul>

              {/* Separator */}
              <hr className="my-8" style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }} />

              {/* Call to Action Section */}
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#D4AF37' }}>
                  Zrób pierwszy krok już dziś.
                </h2>
                <ul className="list-none space-y-3 text-lg">
                  <li className="flex items-center justify-center">
                    <span className="mr-2">📋</span>
                    <span>Sprawdź swoją umowę.</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <span className="mr-2">💰</span>
                    <span>Zobacz, ile możesz odzyskać.</span>
                  </li>
                  <li className="flex items-center justify-center mt-6">
                    <button
                      onClick={() => openModal(null, 'direct_consultation')}
                      className="inline-flex items-center justify-center text-xl font-semibold transition-all hover:opacity-80 hover:scale-105 transform duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0A1A2F] focus:ring-[#D4AF37] rounded-lg px-6 py-3 shadow-lg"
                      style={{ color: '#0A1A2F', backgroundColor: '#D4AF37' }}
                    >
                      <span className="mr-2">📩</span>
                      <span>Skontaktuj się ze mną</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Right Column - Image */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 transform hover:scale-105 transition-transform duration-300" 
                   style={{ borderColor: '#D4AF37' }}>
                <img
                  src="/miles-zdjecie.jpg"
                  alt="Krzysztof Milewski"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
            
          </div>
          
        </div>
      </section>
      
    </div>
  );
};

export default AboutMePage;