import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5', borderColor: 'rgba(212, 175, 55, 0.2)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
              Krzysztof Milewski
            </h3>
            <p className="mb-2" style={{ color: '#F5F5F5' }}>
              Agent Votum S.A. Spółka partnerska
            </p>
            <p style={{ color: '#F5F5F5' }}>
              Specjalista ds. sporów sądowych CHF
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
              Szybkie linki
            </h3>
            <div className="space-y-2">
              <Link 
                to="/services/currency" 
                className="block transition-colors hover:opacity-80"
                style={{ color: '#F5F5F5' }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Kredyty walutowe
              </Link>
              <Link 
                to="/services/skd" 
                className="block transition-colors hover:opacity-80"
                style={{ color: '#F5F5F5' }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Umowy SKD
              </Link>
              <Link 
                to="/knowledge-base" 
                className="block transition-colors hover:opacity-80"
                style={{ color: '#F5F5F5' }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Baza wiedzy
              </Link>
              <Link 
                to="/faq" 
                className="block transition-colors hover:opacity-80"
                style={{ color: '#F5F5F5' }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                FAQ
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
              Śledź nas
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110 border-2"
                style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
              >
                <Facebook size={20} style={{ color: '#0A1A2F' }} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110 border-2"
                style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
              >
                <Instagram size={20} style={{ color: '#0A1A2F' }} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110 border-2"
                style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
              >
                <div className="w-5 h-5 rounded-sm" style={{ backgroundColor: '#0A1A2F' }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </div>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110 border-2"
                style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
              >
                <Linkedin size={20} style={{ color: '#0A1A2F' }} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8" style={{ borderTop: '1px solid rgba(212, 175, 55, 0.3)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm mb-2" style={{ color: '#F5F5F5' }}>
                <strong>Zastrzeżenie prawne:</strong> Niniejsza strona internetowa zawiera ogólne informacje na temat usług prawnych. Każda sprawa jest wyjątkowa, a wyniki osiągnięte w przeszłości nie gwarantują wyników w przyszłości. Konsultacja nie tworzy relacji prawnik-klient.
              </p>
              <p className="text-sm" style={{ color: '#F5F5F5' }}>
                © {new Date().getFullYear()} Wszelkie prawa zastrzeżone. Licencjonowany doradca prawny we współpracy z Votum S.A.
              </p>
            </div>
            <div className="text-center md:text-right">
              <Link 
                to="/privacy-policy" 
                className="text-sm transition-colors hover:opacity-80 underline"
                style={{ color: '#D4AF37' }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Polityka Prywatności
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;