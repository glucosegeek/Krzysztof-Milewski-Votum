import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
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
  Search
} from 'lucide-react';

const HomePage: React.FC = () => {
  const heroSectionRef = useRef<HTMLElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  // Handle scroll to contact section from navigation
  useEffect(() => {
    if (location.state?.scrollToContact && contactSectionRef.current) {
      contactSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.state]);

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
              <span className="block mt-2" style={{ color: '#D4AF37' }}>Agent Votum S.A.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
              Pomagam kredytobiorcom walutowym w walce z nieuczciwymi umowami bankowymi.
            </p>
            <button 
              className="font-bold py-4 px-8 rounded-lg text-lg transition-all hover:-translate-y-2 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4"
              style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
              onClick={() => contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
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
                  Pomagam osobom z kredytem we frankach (CHF)
                </h2>
                <ul className="text-lg mb-6 leading-relaxed" style={{ color: '#F5F5F5' }}>
                  <li className="text-lg mb-6 leading-relaxed">🏦 Analiza umowy kredytowej – Sprawdzam, czy umowa zawiera klauzule abuzywne.</li>
                  <li className="text-lg mb-6 leading-relaxed">⚖️ Współpraca z kancelarią Votum – Twoją sprawą zajmują się doświadczeni prawnicy.</li>
                  <li className="text-lg mb-6 leading-relaxed">📄 Przygotowanie dokumentów – Pomagam zgromadzić i przesłać potrzebne dokumenty.</li>
                  <li className="text-lg mb-6 leading-relaxed">💰 Unieważnienie lub odfrankowienie umowy – Dążymy do całkowitego pozbycia się zadłużenia.</li>
                </ul>
                <p className="text-lg mb-8 leading-relaxed" style={{ color: '#F5F5F5' }}>
                  Jestem agentem Votum S.A., specjalizującym się w sprawach kredytów walutowych.  
                  Pomagam osobom, które zaciągnęły kredyt we frankach, odzyskać kontrolę nad swoim zobowiązaniem.  
                  Współpracuję z kancelarią, która ma na koncie setki wygranych spraw z bankami.
                </p>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold" style={{ color: '#F5F5F5' }}>200+</div>
                    <div className="text-sm" style={{ color: '#F5F5F5' }}>Sprawy zakończonę sukcesem</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold" style={{ color: '#F5F5F5' }}>99%</div>
                    <div className="text-sm" style={{ color: '#F5F5F5' }}>Wskaźnik skuteczności</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold" style={{ color: '#F5F5F5' }}>8+</div>
                    <div className="text-sm" style={{ color: '#F5F5F5' }}>Lat doświadczenia</div>
                  </div>
                </div>
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <LineChart size={40} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#F5F5F5' }}>Wysoka skuteczność</h3>
              <p className="leading-relaxed" style={{ color: '#F5F5F5' }}>
                Setki wygranych spraw
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37'  }}>
                <Scale size={40} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#F5F5F5' }}>Doświadczona kancelaria</h3>
              <p className="leading-relaxed" style={{ color: '#F5F5F5' }}>
                Reprezentacja od A do Z
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <Briefcase size={40} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#F5F5F5' }}>Brak opłat z góry</h3>
              <p className="leading-relaxed" style={{ color: '#F5F5F5' }}>
                Działamy w oparciu o sukces
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <Search size={40} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#F5F5F5' }}>Rzetelna analiza</h3>
              <p className="leading-relaxed" style={{ color: '#F5F5F5' }}>
                Tylko realne i zasadne sprawy
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
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#0A1A2F' }}>📞Kontakt</h3>
              <p style={{ color: '#0A1A2F' }}>
                Krótka rozmowa lub wiadomość z opisem Twojej sytuacji.
              </p>
            </div>
            
            <div className="text-center relative transition-all duration-300 hover:scale-105 hover:shadow-3xl">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-xl shadow-lg border-2" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                2
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#0A1A2F' }}>📑Analiza umowy</h3>
              <p style={{ color: '#0A1A2F' }}>
                Bezpłatna weryfikacja Twojej dokumentacji kredytowej.
              </p>
            </div>
            
            <div className="text-center relative transition-all duration-300 hover:scale-105 hover:shadow-3xl">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-xl shadow-lg border-2" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                3
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#0A1A2F' }}>✍️Podpisanie umowy z Votum</h3>
              <p style={{ color: '#0A1A2F' }}>
                Przekazujemy sprawę kancelarii.
              </p>
            </div>
            
            <div className="text-center relative transition-all duration-300 hover:scale-105 hover:shadow-3xl">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-xl shadow-lg border-2" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                4
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#0A1A2F' }}>⚖️Postępowanie sądowe</h3>
              <p style={{ color: '#0A1A2F' }}>
                Kancelaria reprezentuje Cię w sądzie.
              </p>
            </div>
          
            <div className="text-center relative transition-all duration-300 hover:scale-105 hover:shadow-3xl">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-xl shadow-lg border-2" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                5
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#0A1A2F' }}>✅Unieważnienie umowy</h3>
              <p style={{ color: '#0A1A2F' }}>
                Odzyskanie Twoich środków.
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
      <section ref={contactSectionRef} className="py-20" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5' }}>
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

      {/* Footer */}
      <footer className="py-12 border-t" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5', borderColor: 'rgba(212, 175, 55, 0.2)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2" style={{ color: '#F5F5F5' }}>Specjalista ds. sporów sądowych CHF</h3>
              <p style={{ color: '#F5F5F5' }}>
                Reprezentowanie klientów we współpracy z Votum S.A.
              </p>
            </div>
            
            <div className="pt-8" style={{ borderTop: '1px solid rgba(245, 245, 245, 0.2)' }}>
              <div className="pt-8" style={{ borderTop: '1px solid rgba(212, 175, 55, 0.3)' }}>
                <p className="text-sm mb-4" style={{ color: '#F5F5F5' }}>
                  <strong>Zastrzeżenie prawne:</strong> Niniejsza strona internetowa zawiera ogólne informacje na temat usług prawnych. Każda sprawa jest wyjątkowa, a wyniki osiągnięte w przeszłości nie gwarantują wyników w przyszłości. Konsultacja nie tworzy relacji prawnik-klient.
                </p>
                <p className="text-sm" style={{ color: '#F5F5F5' }}>
                  © {new Date().getFullYear()} Wszelkie prawa zastrzeżone. Licencjonowany doradca prawny we współpracy z Votum S.A.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;