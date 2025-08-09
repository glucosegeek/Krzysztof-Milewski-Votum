import React, { useState, useEffect, useRef } from 'react';
import { useStickyButtonVisibility } from '../context/StickyButtonVisibilityContext';
import { useConsultationModal } from '../context/ConsultationModalContext';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  FileText, 
  Users, 
  CheckCircle, 
  Phone, 
  Mail, 
  MessageCircle,
  Star,
  Scale,
  ClipboardList,
  Gavel,
  LineChart,
  Briefcase,
  Search,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const HomePage: React.FC = () => {
  const heroSectionRef = useRef<HTMLElement>(null);
  const { registerHeroSection } = useStickyButtonVisibility();
  const { isModalOpen, closeModal, submittedData, openModal } = useConsultationModal();

  useEffect(() => {
    registerHeroSection(heroSectionRef.current);
  }, [registerHeroSection]);

const [openStep, setOpenStep] = useState<number | null>(null);

// Concierge items
const [openConciergeItem, setOpenConciergeItem] = useState<number | null>(null);
const toggleConciergeItem = (id: number) => {
  setOpenConciergeItem(openConciergeItem === id ? null : id);
};
  
const conciergeItems = [
  {
    id: 1,
    title: "Holistyczna opieka",
    description: "To ja jestem Twoim pierwszym kontaktem. Zbiorę od Ciebie wszystkie niezbędne informacje i dokumenty, a następnie przekazuję je do współpracującej ze mną kancelarii, która specjalizuje się w sprawach kredytów frankowych lub SKD.",
  },
  {
    id: 2,
    title: "Współpraca z ekspertami",
    description: "Kancelaria zajmie się całą, formalną stroną prawną, w tym kontaktem z bankiem. Natomiast w sądzie reprezentować Cię będzie Pełnomocnik, który jest ekspertem w tej dziedzinie. Dzięki temu masz pewność, że sprawą zajmują się specjaliści na każdym etapie.",
  },
  {
    id: 3,
    title: "Ty jesteś w centrum",
    description: "Moją misją jest, abyś czuł się zaopiekowany i na bieżąco informowany, bez konieczności zagłębiania się w skomplikowane kwestie prawne. To ja przekażę Ci wszystkie najważniejsze informacje i wyjaśnię je w przystępny sposób.",
  },
  {
    id: 4,
    title: "Minimalny wysiłek z Twojej strony",
    description: "Dzięki takiemu podziałowi ról, Twój udział w procesie ograniczony jest do absolutnego minimum. Dbam o to, aby wszystkie działania przebiegały płynnie i bezproblemowo, pozwalając Ci odzyskać kontrolę nad finansami bez niepotrzebnego stresu.",
  },
];

// How it works 
  const howItWorksSteps = [
    {
      id: 1,
      title: "Analiza i oferta",
      description: "Przeprowadzę bezpłatną analizę umowy kredytowej i ocenę Twojej sytuacji prawnej. Na jej podstawie przygotuję ofertę dalszego działania, dopasowaną do Twoich potrzeb i możliwości.",
    },
    {
      id: 2,
      title: "Podpisanie umowy",
      description: "Po analizie Twojej sytuacji przygotuję indywidualną ofertę współpracy, dopasowaną do rodzaju umowy kredytowej. Podpisanie umowy to początek kompleksowego działania – zawsze z myślą o Twoim bezpieczeństwie.",
    },
    {
      id: 3,
      title: "Zgromadzenie dokumentów",
      description: "Wspólnie ustalimy, jakie dokumenty są niezbędne do rozpoczęcia postępowania – większość z nich możesz dostarczyć w formie elektronicznej. Na każdym etapie służę wsparciem, aby cały proces przebiegł sprawnie i bez zbędnych formalności.",
    },
    {
      id: 4,
      title: "Zgłoszenie roszczeń",
      description: "Po skompletowaniu niezbędnych dokumentów przygotowuję i złożę w Twoim imieniu reklamację do banku, jasno i precyzyjnie przedstawiając roszczenia. Dbam o każdy szczegół – od podstawy prawnej po spełnienie wszystkich wymogów formalnych – aby zwiększyć szanse na pozytywne rozpatrzenie sprawy.",
    },
    {
      id: 5,
      title: "Wytoczenie powództwa",
      description: "Jeśli bank nie uwzględni roszczeń na etapie reklamacyjnym, zapewniam wsparcie kancelarii prawnej, która może poprowadzić postępowanie sądowe w Twoim imieniu. Dzięki doświadczeniu prawników i starannie opracowanej strategii procesowej zwiększa się szansa na unieważnienie umowy lub odzyskanie nadpłaconych środków.",
    },
    {
      id: 6,
      title: "Wypłata świadczeń",
      description: "Po zakończeniu sprawy uczestniczę w przekazaniu należnych Ci środków od banku. Dbam o to, by proces wypłaty przebiegł sprawnie i bez zbędnych opóźnień – aż do momentu pełnego rozliczenia.",
    },
  ];

  const toggleStep = (id: number) => {
    setOpenStep(openStep === id ? null : id);
  };

  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: '#0A1A2F' }}>
      {/* Hero Section */}
      <section ref={heroSectionRef} className="relative overflow-hidden" style={{
        backgroundImage: 'url(/hero-background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span style={{ color: '#F5F5F5' }}>Krzysztof Milewski</span>
            </h1>
            <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
  Ekspert ds. unieważniania kredytów walutowych (CHF | EUR | USD) oraz kredytów SKD
</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block mt-2" style={{ color: '#D4AF37' }}>Przedstawiciel Votum Consumer Care</span>
            </h1>
            <button 
              className="font-bold py-4 px-8 rounded-lg text-lg transition-all hover:-translate-y-2 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4"
              style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
              onClick={() => openModal(null, 'direct_consultation')}
            >
              Bezpłatna konsultacja
            </button>
          </div>
        </div>
      </section>

      {/* About the Agent */}
      <section className="py-20" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-80 h-80 rounded-2xl mx-auto lg:mx-0 flex items-center justify-center shadow-xl border-8 overflow-hidden" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
  <img
  src="/votum-background.jpg"
  alt="Krzysztof Milewski - Expert ds. unieważniania kredytów walutowych"
  className="w-full h-full object-cover" // Ensure the image covers the div
/>

</div>

              </div>
              <div>
                <h2 className="text-4xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
                  Pomagam osobom z kredytem we frankach (CHF), euro (EUR), dolarach (USD) oraz z kredytem SKD
                </h2>
                <ul className="text-lg mb-6 leading-relaxed" style={{ color: '#F5F5F5' }}>
                  <li className="text-lg mb-6 leading-relaxed">✅ Analizuję wstępnie i wyliczam korzyści.
Nie ryzykujesz nic – możesz tylko zyskać.</li>
                  <li className="text-lg mb-6 leading-relaxed">💰 Umowy aktywne i spłacone – Pomagam odzyskać należne środki lub pozbyć się zadłużenia.</li>
                  <li className="text-lg mb-6 leading-relaxed">📄 Pomagam na każdym etapie – Od analizy, przez dokumenty, aż po wyrok sądu.</li>
                  <li className="text-lg mb-6 leading-relaxed">Moje usługi na tym etapie są całkowicie bezpłatne. Nic nie ryzykujesz a możesz tylko zyskać!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What I Do */}
      <section className="py-20" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
              Dlaczego warto działać ze mną działać?
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#F5F5F5' }}>
              Jestem Przedstawicielem Votum Consumer Care, które zapewnia kompleksowe wsparcie prawne opracowane specjalnie z myślą o toksycznych kredytach walutowych oraz w ramach SKD  ( Sankcja Kredytu Darmowego).
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <LineChart size={40} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#F5F5F5' }}>Wysoka skuteczność</h3>
              <p className="leading-relaxed" style={{ color: '#F5F5F5' }}>
                Tysiące wygranych spraw 99,5% skuteczności.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37'  }}>
                <Scale size={40} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#F5F5F5' }}>Współpraca w ramach jednolitej procedury</h3>
              <p className="leading-relaxed" style={{ color: '#F5F5F5' }}>
                Współpraca z największymi i najlepszymi kancelariami
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <Shield size={40} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#F5F5F5' }}>Consierge</h3>
              <p className="leading-relaxed" style={{ color: '#F5F5F5' }}>
                Moja filozofia wsparcia  Klienta na każdym etapie sprawy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Consierge Personal Asistent */}
      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4" style={{ color: '#0A1A2F' }}>
            Obsługa Klienta w filozofii Consierge - osobisty asystent
        </h2>
    </div>
    <div className="max-w-4xl mx-auto text-lg leading-relaxed" style={{ color: '#0A1A2F' }}>
        <p className="mb-6">
            W moim modelu obsługi klienta przyjmuję rolę <strong>CONSIERGA</strong>, będącego Twoim głównym punktem kontaktu i wsparcia. Moja rola to <strong>Front Office</strong>, dzięki czemu jesteś zawsze <strong>zaopiekowany</strong>, a cały proces jest dla Ciebie komfortowy i przejrzysty.
        </p>
        <h3 className="text-2xl font-bold mb-4" style={{ color: '#0A1A2F' }}>
            Jak działa to w praktyce?
        </h3>
        <div className="space-y-4">
  {conciergeItems.map((item) => (
    <div
      key={item.id}
      className="rounded-2xl shadow-lg border-4 overflow-hidden"
      style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}
    >
      <button
        onClick={() => toggleConciergeItem(item.id)}
        className="w-full p-6 text-left flex items-center justify-between transition-all hover:bg-opacity-90"
        style={{ backgroundColor: 'transparent' }}
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl shadow-lg border-2" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}>
            {item.id}
          </div>
          <h3 className="text-lg font-semibold" style={{ color: '#F5F5F5' }}>
            {item.title}
          </h3>
        </div>
        <div className="flex-shrink-0 ml-4">
          {openConciergeItem === item.id ? (
            <ChevronUp size={24} style={{ color: '#D4AF37' }} />
          ) : (
            <ChevronDown size={24} style={{ color: '#D4AF37' }} />
          )}
        </div>
      </button>
      {openConciergeItem === item.id && (
        <div className="px-6 pb-6">
          <div className="pt-4 border-t" style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }}>
            <p className="text-lg leading-relaxed" style={{ color: '#F5F5F5' }}>
              {item.description}
            </p>
          </div>
        </div>
      )}
    </div>
  ))}
</div>
        <p className="mt-8">
            W modelu <strong>CONSIERGE</strong>, ja jestem Twoim opiekunem, a zespół doświadczonych prawników pracuje w tle, by zapewnić Ci optymalne rozwiązanie Twojej sprawy.
        </p>
    </div>
</div>
      </section>
      
      {/* How It Works */}
      <section className="py-5" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
        <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4" style={{ color: '#0A1A2F' }}>
                Jak to działa
              </h2>
                <p className="text-xl max-w-3xl mx-auto" style={{ color: '#0A1A2F' }}>
                  Jasna, przejrzysta ścieżka od konsultacji do pomyślnego rozwiązania
                </p>
            </div>

          <div className="space-y-4"> {/* This div replaces the old grid */}
            {howItWorksSteps.map((step) => (
              <div
                key={step.id}
                className="rounded-2xl shadow-lg border-4 overflow-hidden"
                style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}
              >
                <button
                  onClick={() => toggleStep(step.id)}
                  className="w-full p-6 text-left flex items-center justify-between transition-all hover:bg-opacity-90"
                  style={{ backgroundColor: 'transparent' }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl shadow-lg border-2" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}>
                      {step.id}
                    </div>
                    <h3 className="text-lg font-semibold" style={{ color: '#F5F5F5' }}>
                      {step.title}
                    </h3>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    {openStep === step.id ? (
                      <ChevronUp size={24} style={{ color: '#D4AF37' }} />
                    ) : (
                      <ChevronDown size={24} style={{ color: '#D4AF37' }} />
                    )}
                  </div>
                </button>
      
                {openStep === step.id && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t" style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }}>
                      <p className="text-lg leading-relaxed" style={{ color: '#F5F5F5' }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
              Sukcesy klientów
            </h2>
            <p className="text-xl" style={{ color: '#F5F5F5' }}>
              Rzeczywiste wyniki od zadowolonych klientów
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-10 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} style={{ color: '#D4AF37' }} className="fill-current" />
                ))}
              </div>
              <p className="mb-6 text-lg leading-relaxed" style={{ color: '#0A1A2F' }}>
                „Dzięki fachowej pomocy odzyskałem ponad 45 000 euro z tytułu nieuczciwych opłat związanych z moim kredytem w CHF. Cały proces przebiegał w sposób przejrzysty i profesjonalny".
              </p>
              <div className="font-semibold" style={{ color: '#0A1A2F' }}>Maria K.</div>
              <div style={{ color: '#0A1A2F' }}>Warszawa</div>
            </div>
            
            <div className="p-10 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} style={{ color: '#D4AF37' }} className="fill-current" />
                ))}
              </div>
              <p className="mb-6 text-lg leading-relaxed" style={{ color: '#0A1A2F' }}>
                „Wyjątkowa obsługa i rezultaty. Współpraca z Votum S.A. miała decydujące znaczenie w mojej sprawie dotyczącej sporu o kredyt CHF. Gorąco polecam".
              </p>
              <div className="font-semibold" style={{ color: '#0A1A2F' }}>Tomasz R.</div>
              <div style={{ color: '#0A1A2F' }}>Krakow</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact-section" className="py-20" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
              Porozmawiajmy o Twojej toksycznej umowie kredytowej!
            </h2>
            <p className="text-xl" style={{ color: '#F5F5F5' }}>
              Wszystko zaczyna się od decyzji - Twojej decyzji.              
            </p>
            <p className="text-xl my-7" style={{ color: '#D4AF37' }}>Tu zaczyna się Twoja droga do wiecznych wakacji kredytowych czyli unieważnienia toksycznej umowy!</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="text-center">
              <button
                onClick={() => openModal(null, 'form_submission')}
                className="w-full font-bold py-4 px-8 rounded-lg text-lg transition-all hover:-translate-y-1 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4 active:scale-95 active:shadow-inner"
                style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}
              >
                Wypełnij formularz kontaktowy
              </button>
              <p className="text-sm mt-4" style={{ color: '#F5F5F5' }}>
                Kliknij, aby otworzyć szczegółowy formularz kontaktowy
              </p>
            </div>
            
            <div className="space-y-8">
                <h3 className="text-2xl font-bold mb-6" style={{ color: '#F5F5F5' }}>Skontaktuj się z nami</h3>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-md border-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                    <Phone size={24} style={{ color: '#0A1A2F' }} />
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: '#F5F5F5' }}>Telefon</div>
                    <div style={{ color: '#F5F5F5' }}>+48 601 227 876</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-md border-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                    <Mail size={24} style={{ color: '#0A1A2F' }} />
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: '#F5F5F5' }}>Email</div>
                    <div style={{ color: '#F5F5F5' }}>krzysztof.milewski@dsa.pl</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-md border-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                    <MessageCircle size={24} style={{ color: '#0A1A2F' }} />
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: '#F5F5F5' }}>WhatsApp</div>
                    <div style={{ color: '#F5F5F5' }}>Szybka konsultacja dostępna</div>
                  </div>
                </div>
                
                <div className="pt-6">
                  <p className="text-sm leading-relaxed" style={{ color: '#F5F5F5' }}>
                    Wszystkie konsultacje są całkowicie poufne i bezpłatne. 
                    Na pytania odpowiadam natychmiast w dni robocze.
                  </p>
                </div>
              </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;