import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; // Example icon, you can choose another

const AboutMePage: React.FC = () => {
  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5' }}>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 mb-8 text-lg transition-colors hover:opacity-80"
              style={{ color: '#D4AF37' }}
            >
              <ArrowLeft size={20} />
              <span>Powrót do strony głównej</span>
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              O mnie
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Tutaj znajdą się informacje o Krzysztofie Milewskim.
            </p>
          </div>
        </div>
      </section>
      {/* Add more content sections here */}
    </div>
  );
};

export default AboutMePage;
