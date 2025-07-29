import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Scale } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/', { state: { scrollToContact: true } });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 shadow-lg border-b-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/index" className="flex items-center space-x-2">
            <Scale size={32} style={{ color: '#D4AF37' }} />
            <span className="text-xl font-bold" style={{ color: '#F5F5F5' }}>
              Krzysztof Milewski
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Usługi Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
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

            {/* Other Navigation Links */}
            <button
              onClick={handleContactClick}
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-opacity-10 hover:bg-white"
              style={{ color: '#F5F5F5' }}
            >
              Kontakt
            </button>
            
            <Link
              to="/knowledge-base"
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-opacity-10 hover:bg-white"
              style={{ color: '#F5F5F5' }}
            >
              Baza wiedzy
            </Link>
            
            <Link
              to="/faq"
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-opacity-10 hover:bg-white"
              style={{ color: '#F5F5F5' }}
            >
              FAQ
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="p-2 rounded-md transition-colors hover:bg-opacity-10 hover:bg-white"
              style={{ color: '#F5F5F5' }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;