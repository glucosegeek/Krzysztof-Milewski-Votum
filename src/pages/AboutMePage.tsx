import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useConsultationModal } from '../context/ConsultationModalContext';

const AboutMePage: React.FC = () => {
  const { openModal } = useConsultationModal();
  
  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: '#0A1A2F' }}>
      
      {/* Main Content Section with Background */}
      <section className="relative py-20" style={{
        backgroundImage: "/miles-zdjecie.jpg",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}>
        {/* Dark overlay - same as landing page */}
        <div className="absolute inset-0 bg-black/70"></div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Title - Centered Above */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-8" style={{ color: '#F5F5F5' }}>
              O mnie
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
              Ekspert ds. unieważniania kredytów walutowych | Przedstawiciel DSA Investment S.A<br />
              <span className="font-semibold" style={{ color: '#D4AF37' }}>Strateg sprzedaży i marketingu z 30-letnim doświadczeniem</span>
            </p>
          </div>
          
          {/* Two Column Layout: Text Left, Image Right */}
          <div className="grid lg:grid-cols-5 gap-12 items-center mb-16">
            
            {/* Left Column - Text Content (3/5 width) */}
            <div className="lg:col-span-3 space-y-8 p-10 text-lg leading-relaxed rounded-3xl shadow-2xl border-4 backdrop-blur-sm" 
                 style={{ backgroundColor: 'rgba(10, 26, 47, 0.95)', borderColor: '#D4AF37', color: '#F5F5F5' }}>
              
              {/* Experience Section */}
              <div>
                <p className="text-base md:text-lg leading-loose">
                  Przez blisko <strong className="font-bold" style={{ color: '#D4AF37' }}>3 dekady</strong> skutecznie zarządzałem projektami, budowałem ogólnopolskie zespoły sprzedażowe i wdrażałem strategie promocyjne dla wielu topowych marek w różnych branżach. Dziś koncentruję się na nowoczesnym marketingu w mediach społecznościowych oraz wykorzystaniu <strong className="font-bold" style={{ color: '#D4AF37' }}>AI</strong> do tworzenia efektywnych zespołów handlowych.
                </p>
              </div>

              {/* Divider */}
              <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}></div>

              {/* Mission Section */}
              <div>
                <p className="text-base md:text-lg leading-loose">
                  W <strong className="font-bold" style={{ color: '#D4AF37' }}>Votum Consumer Care</strong> pomagam osobom uwikłanym w toksyczne kredyty walutowe – zarówno aktywne, jak i spłacone – unieważnić umowy i odzyskać należne im środki. Na etapie wstępnej analizy wyliczam realne korzyści finansowe wynikające z unieważnienia umowy oraz rekomenduję najlepsze możliwe rozwiązanie. <strong className="font-bold" style={{ color: '#D4AF37' }}>Doradzam na każdym etapie</strong> – od analizy po wyrok sądu.
                </p>
              </div>

              {/* Divider */}
              <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}></div>

              {/* Key Benefits List */}
              <div className="space-y-4">
                <ul className="list-none space-y-4">
                  <li className="flex items-start">
                    <span className="mr-4 text-3xl flex-shrink-0" style={{ color: '#D4AF37' }}>✓</span>
                    <span className="text-base md:text-lg leading-relaxed">
                      Analiza wstępna i wyliczenie korzyści są całkowicie <strong className="font-bold text-xl" style={{ color: '#D4AF37' }}>BEZPŁATNE</strong>.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-4 text-3xl flex-shrink-0" style={{ color: '#D4AF37' }}>✓</span>
                    <span className="text-base md:text-lg leading-relaxed">
                      Nie ryzykujesz nic – <strong className="font-bold" style={{ color: '#D4AF37' }}>możesz tylko zyskać</strong>.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Divider */}
              <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}></div>

              {/* Call to Action Section */}
              <div className="text-center pt-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#D4AF37' }}>
                  Zrób pierwszy krok już dziś
                </h2>
                <ul className="list-none space-y-4 text-base md:text-lg mb-8">
                  <li className="flex items-center justify-center">
                    <span className="mr-3 text-2xl">📋</span>
                    <span>Sprawdź swoją umowę</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <span className="mr-3 text-2xl">💰</span>
                    <span>Zobacz, ile możesz odzyskać</span>
                  </li>
                </ul>
                
                <button
                  onClick={() => openModal(null, 'direct_consultation')}
                  className="inline-flex items-center justify-center text-lg md:text-xl font-bold transition-all hover:scale-105 transform duration-300 focus:outline-none focus:ring-4 focus:ring-offset-4 focus:ring-offset-[#0A1A2F] rounded-xl px-8 py-4 shadow-2xl hover:shadow-xl"
                  style={{ 
                    color: '#0A1A2F', 
                    backgroundColor: '#D4AF37',
                    border: '3px solid #F5F5F5'
                  }}
                >
                  <span className="mr-3 text-2xl">📩</span>
                  <span>Skontaktuj się ze mną</span>
                </button>
                
                <p className="mt-6 text-sm opacity-90">
                  To nic nie kosztuje, a może zmienić Twoją przyszłość
                </p>
              </div>
            </div>
            
            {/* Right Column - Image (2/5 width) */}
            <div className="lg:col-span-2 flex items-center justify-center">
              <div className="relative group">
                {/* Main image container */}
                <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden border-4 transform group-hover:scale-105 transition-all duration-500 backdrop-blur-sm" 
                     style={{ borderColor: '#D4AF37', backgroundColor: 'rgba(10, 26, 47, 0.3)' }}>
                  <img
                    src="/miles-zdjecie.jpg"
                    alt="Krzysztof Milewski - Ekspert ds. unieważniania kredytów"
                    className="w-full h-full object-cover object-center"
                  />
                  
                  {/* Overlay gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Name tag below image */}
                <div className="mt-6 text-center p-4 rounded-2xl backdrop-blur-md" style={{ backgroundColor: 'rgba(10, 26, 47, 0.8)' }}>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: '#F5F5F5' }}>
                    Krzysztof Milewski
                  </h3>
                  <p className="text-base font-semibold" style={{ color: '#D4AF37' }}>
                    +48 601 227 876
                  </p>
                  <p className="text-sm mt-1" style={{ color: '#F5F5F5' }}>
                    krzysztof.milewski@dsa.pl
                  </p>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
      </section>
      
    </div>
  );
};

export default AboutMePage;