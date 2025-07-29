import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { useConsultationModal } from '../context/ConsultationModalContext';

const PrivacyPolicyPage: React.FC = () => {
  const { openModal } = useConsultationModal();

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
                <Shield size={48} style={{ color: '#0A1A2F' }} />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
                Polityka Prywatności
              </h1>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
                Informacje o przetwarzaniu danych osobowych w związku z korzystaniem 
                z naszych usług prawnych.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              
              {/* Administrator */}
              <div>
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#0A1A2F' }}>
                  1. Administrator danych osobowych
                </h2>
                <p className="text-lg leading-relaxed mb-4" style={{ color: '#0A1A2F' }}>
                  Administratorem Twoich danych osobowych jest Krzysztof Milewski, 
                  działający jako agent Votum S.A. Spółka partnerska.
                </p>
                <div className="p-6 rounded-xl border-2" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                  <p style={{ color: '#F5F5F5' }}>
                    <strong>Dane kontaktowe:</strong><br />
                    Email: krzysztof.milewski@dsa.pl<br />
                    Telefon: +48 123 456 789
                  </p>
                </div>
              </div>

              {/* Cel przetwarzania */}
              <div>
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#0A1A2F' }}>
                  2. Cel przetwarzania danych osobowych
                </h2>
                <p className="text-lg leading-relaxed mb-4" style={{ color: '#0A1A2F' }}>
                  Twoje dane osobowe przetwarzamy w następujących celach:
                </p>
                <ul className="space-y-3 text-lg" style={{ color: '#0A1A2F' }}>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}></span>
                    <span>Udzielenie bezpłatnej konsultacji prawnej</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}></span>
                    <span>Analiza dokumentów kredytowych</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}></span>
                    <span>Reprezentacja prawna w postępowaniu sądowym</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}></span>
                    <span>Kontakt w sprawie prowadzonej sprawy</span>
                  </li>
                </ul>
              </div>

              {/* Podstawa prawna */}
              <div>
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#0A1A2F' }}>
                  3. Podstawa prawna przetwarzania
                </h2>
                <p className="text-lg leading-relaxed mb-4" style={{ color: '#0A1A2F' }}>
                  Podstawą prawną przetwarzania Twoich danych osobowych jest:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl border-2" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                    <h3 className="text-xl font-semibold mb-3" style={{ color: '#F5F5F5' }}>Zgoda (art. 6 ust. 1 lit. a RODO)</h3>
                    <p style={{ color: '#F5F5F5' }}>
                      Dla celów marketingowych i kontaktu w sprawie usług prawnych
                    </p>
                  </div>
                  <div className="p-6 rounded-xl border-2" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                    <h3 className="text-xl font-semibold mb-3" style={{ color: '#F5F5F5' }}>Prawnie uzasadniony interes (art. 6 ust. 1 lit. f RODO)</h3>
                    <p style={{ color: '#F5F5F5' }}>
                      Dla celów świadczenia usług prawnych i reprezentacji procesowej
                    </p>
                  </div>
                </div>
              </div>

              {/* Okres przechowywania */}
              <div>
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#0A1A2F' }}>
                  4. Okres przechowywania danych
                </h2>
                <p className="text-lg leading-relaxed mb-4" style={{ color: '#0A1A2F' }}>
                  Twoje dane osobowe będą przechowywane przez okres niezbędny do:
                </p>
                <ul className="space-y-3 text-lg" style={{ color: '#0A1A2F' }}>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}></span>
                    <span>Realizacji celów, w których zostały zebrane</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}></span>
                    <span>Wypełnienia obowiązków prawnych (np. archiwizacja dokumentacji)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}></span>
                    <span>Przedawnienia roszczeń wynikających z prowadzonej sprawy</span>
                  </li>
                </ul>
              </div>

              {/* Prawa osoby */}
              <div>
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#0A1A2F' }}>
                  5. Twoje prawa
                </h2>
                <p className="text-lg leading-relaxed mb-6" style={{ color: '#0A1A2F' }}>
                  W związku z przetwarzaniem Twoich danych osobowych przysługują Ci następujące prawa:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl border-2" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: '#F5F5F5' }}>Prawo dostępu</h3>
                    <p style={{ color: '#F5F5F5' }}>Do swoich danych osobowych</p>
                  </div>
                  <div className="p-6 rounded-xl border-2" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: '#F5F5F5' }}>Prawo sprostowania</h3>
                    <p style={{ color: '#F5F5F5' }}>Nieprawidłowych danych</p>
                  </div>
                  <div className="p-6 rounded-xl border-2" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: '#F5F5F5' }}>Prawo usunięcia</h3>
                    <p style={{ color: '#F5F5F5' }}>Danych osobowych</p>
                  </div>
                  <div className="p-6 rounded-xl border-2" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: '#F5F5F5' }}>Prawo ograniczenia</h3>
                    <p style={{ color: '#F5F5F5' }}>Przetwarzania danych</p>
                  </div>
                </div>
              </div>

              {/* Bezpieczeństwo */}
              <div>
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#0A1A2F' }}>
                  6. Bezpieczeństwo danych
                </h2>
                <p className="text-lg leading-relaxed mb-4" style={{ color: '#0A1A2F' }}>
                  Stosujemy odpowiednie środki techniczne i organizacyjne w celu zapewnienia 
                  bezpieczeństwa Twoich danych osobowych, w tym:
                </p>
                <ul className="space-y-3 text-lg" style={{ color: '#0A1A2F' }}>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}></span>
                    <span>Szyfrowanie danych podczas transmisji</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}></span>
                    <span>Ograniczenie dostępu do danych osobowych</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}></span>
                    <span>Regularne kopie zapasowe</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}></span>
                    <span>Monitoring bezpieczeństwa systemów</span>
                  </li>
                </ul>
              </div>

              {/* Kontakt */}
              <div className="text-center p-12 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
                  Masz pytania dotyczące ochrony danych?
                </h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
                  Jeśli masz pytania dotyczące przetwarzania Twoich danych osobowych 
                  lub chcesz skorzystać ze swoich praw, skontaktuj się z nami.
                </p>
               <button
                 onClick={openModal}
                  className="inline-block font-bold py-4 px-8 rounded-lg text-lg transition-all hover:-translate-y-2 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4"
                  style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}
                >
                  Skontaktuj się z nami
               </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;