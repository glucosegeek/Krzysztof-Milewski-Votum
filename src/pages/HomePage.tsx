import React, { useState, useEffect, useRef } from 'react';
import { useStickyButtonVisibility } from '../context/StickyButtonVisibilityContext';
import { useConsultationModal } from '../context/ConsultationModalContext';
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
  UserCheck,
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
  const { openModal } = useConsultationModal();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  // Register hero section with visibility context
  useEffect(() => {
    if (heroSectionRef.current) {
      registerHeroSection(heroSectionRef.current);
    }
  }, [registerHeroSection]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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
              <span className="block mt-2" style={{ color: '#D4AF37' }}>Votum Consumer Care</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
              Ekspert ds. unieważniania kredytów walutowych (CHF | EUR | USD)
            </p>
            <button 
              className="font-bold py-4 px-8 rounded-lg text-lg transition-all hover:-translate-y-2 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4"
              style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
              onClick={openModal}
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
                <div className="w-80 h-80 rounded-2xl mx-auto lg:mx-0 flex items-center justify-center shadow-xl border-8" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                  <UserCheck size={120} style={{ color: '#0A1A2F' }} />
                </div>
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
                  Pomagam osobom z kredytem we frankach (CHF), euro (EUR) oraz w dolarach (USD)
                </h2>
                <ul className="text-lg mb-6 leading-relaxed" style={{ color: '#F5F5F5' }}>
                  <li className="text-lg mb-6 leading-relaxed">🏦 Analiza umowy i wyliczenie korzyści – Sprawdzam, ile możesz zyskać na unieważnieniu umowy.</li>
                  <li className="text-lg mb-6 leading-relaxed">⚖️ Współpraca z kancelarią Votum Consumer Care – Twoją sprawą zajmują się doświadczeni prawnicy z setkami wygranych.</li>
                  <li className="text-lg mb-6 leading-relaxed">📊 30 lat doświadczenia w sprzedaży i marketingu – Wykorzystuję AI i nowoczesne narzędzia, by skutecznie Ci pomóc.</li>
                  <li className="text-lg mb-6 leading-relaxed">📄 Pomoc na każdym etapie – Od analizy, przez dokumenty, aż po wyrok sądu.</li>
                  <li className="text-lg mb-6 leading-relaxed">💰 Umowy aktywne i spłacone – Pomagam odzyskać należne środki lub pozbyć się zadłużenia.</li>
                  <li className="text-lg mb-6 leading-relaxed">✅ Analiza wstępna i wyliczenie korzyści są całkowicie BEZPŁATNE.
Nie ryzykujesz nic – możesz tylko zyskać.</li>
                </ul>
                {/* <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold" style={{ color: '#F5F5F5' }}>200+</div>
                    <div className="text-sm" style={{ color: '#F5F5F5' }}>Sprawy zakończonę sukcesem</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold" style={{ color: '#F5F5F5' }}>99%</div>
                    <div className="text-sm" style={{ color: '#F5F5F5' }}>Wskaźnik skuteczności</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold" style={{ color: '#F5F5F5' }}>30+</div>
                    <div className="text-sm" style={{ color: '#F5F5F5' }}>Lat doświadczenia</div>
                  </div>
                </div> */}
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
              Dlaczego warto działać z Votum?
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#F5F5F5' }}>
              Kompleksowe wsparcie prawne opracowane specjalnie z myślą o sporach dotyczących kredytów walutowych
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <LineChart size={40} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#F5F5F5' }}>Wysoka skuteczność</h3>
              <p className="leading-relaxed" style={{ color: '#F5F5F5' }}>
                Setki wygranych spraw 99,5% skuteczności.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37'  }}>
                <Scale size={40} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#F5F5F5' }}>Doświadczona kancelaria</h3>
              <p className="leading-relaxed" style={{ color: '#F5F5F5' }}>
                8+ lat skutecznej walki z bankami
              </p>
            </div>
            
            {/* <div className="text-center group">
              <div className="w-20 h-20 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <Briefcase size={40} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#F5F5F5' }}>Opłat z góry</h3>
              <p className="leading-relaxed" style={{ color: '#F5F5F5' }}>
                Działamy w oparciu o sukces
              </p>
            </div> */}
            
            <div className="text-center group">
              <div className="w-20 h-20 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <Shield size={40} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#F5F5F5' }}>Wsparcie opiekuna</h3>
              <p className="leading-relaxed" style={{ color: '#F5F5F5' }}>
                Dedykowane wsparcie opiekuna przez całą sprawę
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
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
          
          <div className="grid md:grid-cols-5 gap-8">
            <div className="text-center relative transition-all duration-300 hover:scale-105 hover:shadow-3xl">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-xl shadow-lg border-2" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                1
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#0A1A2F' }}>Analiza i oferta</h3>
              <p style={{ color: '#0A1A2F' }}>
                Przeprowadzimy bezpłatną analizę umowy kredytowej i ocenę Twojej sytuacji prawnej. Na jej podstawie przygotujemy ofertę dalszego działania, dopasowaną do Twoich potrzeb i możliwości.
              </p>
            </div>
            
            <div className="text-center relative transition-all duration-300 hover:scale-105 hover:shadow-3xl">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-xl shadow-lg border-2" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                2
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#0A1A2F' }}>📑Podpisanie umowy</h3>
              <p style={{ color: '#0A1A2F' }}>
                Po analizie Twojej sytuacji przygotujemy indywidualną ofertę współpracy, dopasowaną do rodzaju umowy kredytowej. Podpisanie umowy to początek kompleksowego działania – zawsze z myślą o Twoim bezpieczeństwie.
              </p>
            </div>
            
            <div className="text-center relative transition-all duration-300 hover:scale-105 hover:shadow-3xl">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-xl shadow-lg border-2" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                3
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#0A1A2F' }}>Zgromadzenie dokumentów</h3>
              <p style={{ color: '#0A1A2F' }}>
                Wspólnie ustalimy, jakie dokumenty są niezbędne do rozpoczęcia postępowania – większość z nich możesz dostarczyć w formie elektronicznej. Na każdym etapie służymy wsparciem, aby cały proces przebiegł sprawnie i bez zbędnych formalności.
              </p>
            </div>
            
            <div className="text-center relative transition-all duration-300 hover:scale-105 hover:shadow-3xl">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-xl shadow-lg border-2" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                4
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#0A1A2F' }}>Zgłoszenie roszczeń</h3>
              <p style={{ color: '#0A1A2F' }}>
                Po skompletowaniu niezbędnych dokumentów przygotowujemy i składamy w Twoimieniu reklamację do banku, jasno i precyzyjnie przedstawiając roszczenia. Dbamy o każdy szczegół – od podstawy prawnej po spełnienie wszystkich wymogów formalnych – aby zwiększyć szanse na pozytywne rozpatrzenie sprawy.
              </p>
            </div>
          
            <div className="text-center relative transition-all duration-300 hover:scale-105 hover:shadow-3xl">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-xl shadow-lg border-2" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                5
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#0A1A2F' }}>Wytoczenie powództwa</h3>
              <p style={{ color: '#0A1A2F' }}>
                Jeśli bank nie uwzględni roszczeń na etapie reklamacyjnym, zapewniamy wsparcie kancelarii prawnej, która może poprowadzić postępowanie sądowe w Twoim imieniu. Dzięki doświadczeniu prawników i starannie opracowanej strategii procesowej zwiększa się szansa na unieważnienie umowy lub odzyskanie nadpłaconych środków.
              </p>
            </div>

            <div className="text-center relative transition-all duration-300 hover:scale-105 hover:shadow-3xl">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-xl shadow-lg border-2" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                6
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#0A1A2F' }}>Wypłata świadczeń</h3>
              <p style={{ color: '#0A1A2F' }}>
                Po zakończeniu sprawy uczestniczymy w przekazaniu należnych Ci środków od banku. Dbamy o to, by proces wypłaty przebiegł sprawnie i bez zbędnych opóźnień – aż do momentu pełnego rozliczenia.
              </p>
            </div>
          </div>
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
      <section className="py-20" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
                Porozmawiajmy o Twojej pożyczce
              </h2>
              <p className="text-xl" style={{ color: '#F5F5F5' }}>
                Rozpocznij swoją drogę do poprawy sytuacji finansowej od bezpłatnej konsultacji
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                      Imię i nazwisko
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                      style={{ 
                        backgroundColor: 'rgba(245, 245, 245, 0.1)', 
                        border: '1px solid rgba(245, 245, 245, 0.2)', 
                        color: '#F5F5F5',
                        '--tw-ring-color': '#D4AF37'
                      }}
                      placeholder="Imię i nazwisko"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                      Numer telefonu
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                      style={{ 
                        backgroundColor: 'rgba(245, 245, 245, 0.1)', 
                        border: '1px solid rgba(245, 245, 245, 0.2)', 
                        color: '#F5F5F5',
                        '--tw-ring-color': '#D4AF37'
                      }}
                      placeholder="Numer telefonu"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                      Wiadomość
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                      style={{ 
                        backgroundColor: 'rgba(245, 245, 245, 0.1)', 
                        border: '1px solid rgba(245, 245, 245, 0.2)', 
                        color: '#F5F5F5',
                        '--tw-ring-color': '#D4AF37'
                      }}
                      placeholder="Opowiedz mi o swojej sytuacji kredytowej w CHF."
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full font-bold py-4 px-8 rounded-lg text-lg transition-all hover:-translate-y-2 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4"
                    style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color:  '#0A1A2F'}}
                  >
                    Wyślij wiadomość
                  </button>
                </form>
              </div>
              
              <div className="space-y-8">
                <h3 className="text-2xl font-bold mb-6" style={{ color: '#F5F5F5' }}>Skontaktuj się z nami</h3>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-md border-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                    <Phone size={24} style={{ color: '#0A1A2F' }} />
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: '#F5F5F5' }}>Telefon</div>
                    <div style={{ color: '#F5F5F5' }}>+48 123 456 789</div>
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
                    Zazwyczaj odpowiadam w ciągu 2 godzin w dni robocze.
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

export default HomePage;