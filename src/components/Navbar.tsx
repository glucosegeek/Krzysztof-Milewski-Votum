import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Scale, Menu, X } from 'lucide-react';
import { useConsultationModal } from '../context/ConsultationModalContext';

const Navbar: React.FC = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
  const handleScroll = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      setIsServicesOpen(false); // Also close services dropdown if open
    }
  };

  window.addEventListener('scroll', handleScroll);

  // Cleanup function to remove the event listener
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, [isMobileMenuOpen]); // Dependency array: re-run effect if isMobileMenuOpen changes
  const { openModal } = useConsultationModal();

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
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
            {/* Other Navigation Links */}

            {/* Usługi Dropdown */}
            <div
  className="relative"
  onMouseEnter={() => setIsServicesOpen(true)}
  onMouseLeave={() => setIsServicesOpen(false)}
>
  <button
    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-opacity-10 hover:bg-white"
    style={{ color: '#F5F5F5' }}
  >
    <span>Usługi</span>
    <ChevronDown size={16} className={`transform transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
  </button>

  {isServicesOpen && (
    <div className="absolute top-full left-0 mt-1 w-64 rounded-md shadow-lg border-2" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
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

            <Link
                  to="/#contact-section"
                  className="px-4 py-3 rounded-md text-sm font-medium transition-colors hover:bg-opacity-10 hover:bg-white"
                  style={{ color: '#F5F5F5' }}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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

              {/* Other Links */}
              <Link
                  to="/#contact-section"
                  className="block px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-opacity-10 hover:bg-white"
                  style={{ color: '#F5F5F5' }}
                  onClick={() => {
                    closeMobileMenu();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Kontakt
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

            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;