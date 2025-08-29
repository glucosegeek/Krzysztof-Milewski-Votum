import React from 'react';
import { Link } from 'react-router-dom';

const StickyLogo: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 z-50 p-4">
      <Link 
        to="/" 
        className="flex items-center space-x-2" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <img 
          src="/miles-logo.png" 
          alt="Krzysztof Milewski Logo" 
          className="h-20 w-auto transition-opacity hover:opacity-80 drop-shadow-lg"
        />
      </Link>
    </div>
  );
};

export default StickyLogo;