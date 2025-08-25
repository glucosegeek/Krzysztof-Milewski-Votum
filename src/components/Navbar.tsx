import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Scale, Menu, X } from 'lucide-react';
import { useConsultationModal } from '../context/ConsultationModalContext';

const Navbar: React.FC = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        setIsServicesOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobileMenuOpen]);

  const { openModal } = useConsultationModal();

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  // Funkcja do przewijania do sekcji kontaktowej
  const scrollToContactSection = () => {
    // Najpierw sprawdź czy jest atrybut data-section
    let contactSection = document.querySelector('[data-section="contact"]');
    
    // Jeśli nie ma, szukaj po kolorze tła
    if (!contactSection) {
      const sections = document.querySelectorAll('section');
      for (const section of sections) {
        const style = window.getComputedStyle(section);
        if (style.backgroundColor === 'rgb(10, 26, 47)' || 
            section.style.backgroundColor === '#0A1A2F') {
          contactSection = section;
          break;
        }
      }
    }
    
    // Jeśli nadal nie ma, szukaj po tekście w h2
    if (!contactSection) {
      const headings = document.querySelectorAll('h2');
      for (const heading of headings) {
        if (heading.textContent?.includes('Porozmawiajmy')) {
          contactSection = heading.closest('section');
          break;
        }
      }
    }
    
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Fallback - przewiń do końca strony jeśli nie znajdzie sekcji
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  // Funkcja do obsługi kliknięcia w "Kontakt"
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Jeśli jesteśmy na głównej stronie, przewiń do sekcji
    if (location.pathname === '/') {
      scrollToContactSection();
    } else {
      // Jeśli jesteśmy na innej stronie, przejdź na główną i przewiń
      navigate('/');
      // Opóźnienie żeby strona się załadowała
      setTimeout(() => {
        scrollToContactSection();
      }, 100);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 shadow-lg border-b-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-xl font-bold" style={{ color: '#F5F5F5' }}>
              Krzysztof Milewski
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/news"
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-opacity-10 hover:bg-white"
              style={{ color: '#F5F5F5' }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Aktualności
            </Link>

            {/* Usługi Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (closeTimeout) {
                  clearTimeout(closeTimeout);
                  setCloseTimeout(null);
                }
                setIsServicesOpen(true);
              }}
              onMouseLeave={() => {
                const timeout = setTimeout(() => {
                  setIsServicesOpen(false);
                }, 500);
                setCloseTimeout(timeout);
              }}
            >
              <button
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-opacity-10 hover:bg-white"
                style={{ color: '#F5F5F5' }}
              >
                <span>Usługi</span>
                <ChevronDown size={16} className={`transform transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {isServicesOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 w-64 rounded-md shadow-lg border-2" 
                  style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}
                  onMouseEnter={() => {
                    if (closeTimeout) {
                      clearTimeout(closeTimeout);
                      setCloseTimeout(null);
                    }
                  }}
                  onMouseLeave={() => {
                    const timeout = setTimeout(() => {
                      setIsServicesOpen(false);
                    }, 500);
                    setCloseTimeout(timeout);
                  }}
                >
                  <div className="py-1">
                    <Link
                      to="/services/currency"
                      className="block px-4 py-2 text-sm transition-colors hover:bg-opacity-10 hover:bg-white"
                      style={{ color: '#F5F5F5' }}
                      onClick={() => setIsServicesOpen(false)}
                    >
                      Unieważnianie umów walutowych
                    </Link>
                    <Link
                      to="/services/skd"
                      className="block px-4 py-2 text-sm transition-colors hover:bg-opacity-10 hover:bg-white"
                      style={{ color: '#F5F5F5' }}
                      onClick={() => setIsServicesOpen(false)}
                    >
                      Unieważnianie umów SKD
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/about-me"
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-opacity-10 hover:bg-white"
              style={{ color: '#F5F5F5' }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              O mnie
            </Link>
            
            <Link
              to="/knowledge-base"
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-opacity-10 hover:bg-white"
              style={{ color: '#F5F5F5' }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Baza wiedzy
            </Link>
            
            <Link
              to="/faq"
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-opacity-10 hover:bg-white"
              style={{ color: '#F5F5F5' }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              FAQ
            </Link>

            {/* ZMIENIONY LINK KONTAKT */}
            <Link
              to="/"
              className="px-4 py-3 rounded-md text-sm font-medium transition-colors hover:bg-opacity-10 hover:bg-white"
              style={{ color: '#F5F5F5' }}
              onClick={handleContactClick}
            >
              Kontakt
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md transition-colors hover:bg-opacity-10 hover:bg-white"
              style={{ color: '#F5F5F5' }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 shadow-lg border-t-2" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
            <div className="px-4 py-2 space-y-1">
              <Link
                to="/news"
                className="block px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-opacity-10 hover:bg-white"
                style={{ color: '#F5F5F5' }}
                onClick={() => {
                  closeMobileMenu();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Aktualności
              </Link>

              {/* Services Section */}
              <div>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-opacity-10 hover:bg-white"
                  style={{ color: '#F5F5F5' }}
                >
                  <span>Usługi</span>
                  <ChevronDown size={16} className={`transform transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isServicesOpen && (
                  <div className="ml-4 space-y-1">
                    <Link
                      to="/services/currency"
                      className="block px-3 py-2 text-sm transition-colors hover:bg-opacity-10 hover:bg-white rounded-md"
                      style={{ color: '#F5F5F5' }}
                      onClick={() => {
                        closeMobileMenu();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      Unieważnianie umów walutowych
                    </Link>
                    <Link
                      to="/services/skd"
                      className="block px-3 py-2 text-sm transition-colors hover:bg-opacity-10 hover:bg-white rounded-md"
                      style={{ color: '#F5F5F5' }}
                      onClick={() => {
                        closeMobileMenu();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      Unieważnianie umów SKD
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/about-me"
                className="block px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-opacity-10 hover:bg-white"
                style={{ color: '#F5F5F5' }}
                onClick={() => {
                  closeMobileMenu();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                O mnie
              </Link>

              <Link
                to="/knowledge-base"
                className="block px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-opacity-10 hover:bg-white"
                style={{ color: '#F5F5F5' }}
                onClick={() => {
                  closeMobileMenu();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Baza wiedzy
              </Link>

              <Link
                to="/faq"
                className="block px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-opacity-10 hover:bg-white"
                style={{ color: '#F5F5F5' }}
                onClick={() => {
                  closeMobileMenu();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                FAQ
              </Link>

              {/* ZMIENIONY LINK KONTAKT W MOBILE MENU */}
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-opacity-10 hover:bg-white"
                style={{ color: '#F5F5F5' }}
                onClick={(e) => {
                  closeMobileMenu();
                  handleContactClick(e);
                }}
              >
                Kontakt
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;