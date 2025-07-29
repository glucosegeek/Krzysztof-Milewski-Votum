import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStickyButtonVisibility } from '../context/StickyButtonVisibilityContext';

const StickyContactButton: React.FC = () => {
  const navigate = useNavigate();
  const { showButton } = useStickyButtonVisibility();

  const handleClick = () => {
    navigate('/', { state: { scrollToContact: true } });
  };

  return (
    <div className={`fixed bottom-4 left-4 z-50 transition-all duration-300 ${
      showButton ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    }`}>
      <button 
        className="font-bold py-2 px-4 md:py-4 md:px-8 rounded-lg md:rounded-lg text-lg transition-all hover:-translate-y-2 duration-300 transform hover:scale-105 shadow-none md:shadow-lg hover:shadow-xl border-2 md:border-4 whitespace-nowrap"
        style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}
        onClick={handleClick}
      >
        Bezpłatna konsultacja
      </button>
    </div>
  );
};

export default StickyContactButton;