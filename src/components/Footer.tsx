import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Apple, Play } from 'lucide-react';

interface FooterProps {
  registerFooterSection: (element: HTMLElement | null) => void;
}

const Footer: React.FC<FooterProps> = ({ registerFooterSection }) => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      registerFooterSection(footerRef.current);
    }
  }, [registerFooterSection]);

  return (
    <footer ref={footerRef} className="py-12 border-t" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5', borderColor: 'rgba(212, 175, 55, 0.2)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
              Krzysztof Milewski
            </h3>
            <p style={{ color: '#F5F5F5' }}>
              Ekspert ds. unieważniania kredytów walutowych (CHF | EUR | USD) oraz kredytów SKD
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
                Unieważnienie umów kredytowych
              </Link>
              <Link 
                to="/services/skd" 
                className="block transition-colors hover:opacity-80"
                style={{ color: '#F5F5F5' }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Unieważnienie umów SKD
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
              <Link 
                to="/privacy-policy" 
                className="block transition-colors hover:opacity-80"
                style={{ color: '#F5F5F5' }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Polityka Prywatności
              </Link>
            </div>
          </div>

          {/* Contact */}
        <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
              Kontakt
            </h3>
            <div className="space-y-2">
              <p className="flex items-center space-x-2" style={{ color: '#F5F5F5' }}>
                <span className="font-semibold">Telefon:</span>
                <span>+48 601 227 876</span>
              </p>
              <p className="flex items-center space-x-2" style={{ color: '#F5F5F5' }}>
                <span className="font-semibold">Email:</span>
                <span>krzysztof.milewski@dsa.pl</span>
              </p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
            Śledź nas
          </h3>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/ANTYTOKSYK"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-lg flex items-center justify-center transition-all hover:scale-110 border-2"
              style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
            >
              <Facebook size={20} style={{ color: '#0A1A2F' }} />
            </a>
            <a
              href="https://www.instagram.com/pan_od_toksycznych_kredytow/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-lg flex items-center justify-center transition-all hover:scale-110 border-2"
              style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
            >
              <Instagram size={20} style={{ color: '#0A1A2F' }} />
            </a>
            <a
              href="https://www.tiktok.com/@krzysztofmilewski59?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-lg flex items-center justify-center transition-all hover:scale-110 border-2"
              style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
            >
              <div className="w-7 h-7 rounded-sm" style={{ backgroundColor: '#0A1A2F' }}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </div>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-lg flex items-center justify-center transition-all hover:scale-110 border-2"
              style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
            >
              <Linkedin size={20} style={{ color: '#0A1A2F' }} />
            </a>
          </div>
        </div>

        {/* App Store Links */}
        <div className="mt-12 pt-8">
          <h3 className="text-xl font-bold py-6" style={{ color: '#F5F5F5' }}>
            Pobierz aplikację
          </h3>
          <p className="text-l mb-8 leading-relaxed" style={{ color: '#D4AF37' }}>
            Wpisz ten numer K005533, żebym mógł mieć Twoją sprawę zawsze pod opieką!
          </p>
          <div className="flex justify-center md:justify-start space-x-12 mb-8">
            <a
              href="https://apps.apple.com/pl/app/moja-sprawa/id6736989155?l=pl"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center transition-all hover:scale-110"
              aria-label="Pobierz z Apple App Store"
            >
              <img src="/app-store.png" alt="Pobierz z App Store" className="h-16 w-16 mb-2" />
              <p className="text-sm text-center" style={{ color: '#F5F5F5' }}>App Store</p>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=pl.votum_sa.mojasprawa&pli=1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center transition-all hover:scale-110"
              aria-label="Pobierz z Google Play Store"
            >
              <img src="/google-play.png" alt="Pobierz z Google Play" className="h-16 w-16 mb-2" />
              <p className="text-sm text-center" style={{ color: '#F5F5F5' }}>Google Play</p>
            </a>
          </div>
        </div>
      </div>
        {/* Bottom Section */}
        <div className="mb-10" style={{ borderTop: '1px solid rgba(212, 175, 55, 0.3)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm mb-2" style={{ color: '#F5F5F5' }}>
                <strong>Zastrzeżenie prawne:</strong> Treści zawarte na tej stronie mają charakter wyłącznie informacyjny i nie stanowią porady prawnej.
Każda sprawa jest indywidualna, a wcześniejsze wyniki nie stanowią gwarancji podobnych rezultatów w przyszłości.
Konsultacja ma charakter informacyjny i nie tworzy relacji expert–klient. Jej celem jest przedstawienie możliwych działań w sprawach dotyczących nieuczciwych umów kredytowych.
              </p>
              <p className="text-sm" style={{ color: '#F5F5F5' }}>
                © {new Date().getFullYear()} Wszelkie prawa zastrzeżone.
              </p>
            </div>
          </div>
        </div>
    </footer>
  );
};

export default Footer;