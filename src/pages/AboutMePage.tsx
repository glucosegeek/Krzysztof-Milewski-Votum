import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useConsultationModal } from '../context/ConsultationModalContext';

const AboutMePage: React.FC = () => {
  const { openModal } = useConsultationModal();
  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5' }}>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <li className="flex items-center justify-center">
  <button
    onClick={openModal}
    className="inline-flex items-center justify-center text-xl font-semibold transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0A1A2F] focus:ring-[#D4AF37] rounded-md px-2 py-1"
    style={{ color: '#F5F5F5', backgroundColor: 'transparent', border: 'none' }}
  >
    <span className="mr-2">📩</span>
    <span>Skontaktuj się ze mną – to nic nie kosztuje, a może zmienić Twoją przyszłość.</span>
  </button>
</li>

  <Link
    to="/"
    className="inline-flex items-center space-x-2 mb-8 text-lg transition-colors hover:opacity-80"
    style={{ color: '#D4AF37' }}
  >
    <ArrowLeft size={20} />
    <span>Powrót do strony głównej</span>
  </Link>
  <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center"> {/* Added text-center here */}
    O mnie
  </h1>

  {/* Introduction/Summary */}
  <p className="text-xl max-w-3xl mx-auto leading-relaxed mb-8 text-center">
    Ekspert ds. unieważniania kredytów walutowych | Przedstawiciel Votum Consumer Care<br />
    Strateg sprzedaży i marketingu z 30-letnim doświadczeniem
  </p>

  <div className="space-y-8 text-lg leading-relaxed"> {/* Container for main content, left-aligned */}
    {/* Experience Section */}
    <p>
      Od niemal trzech dekad skutecznie zarządzam projektami, buduję ogólnopolskie zespoły sprzedażowe i wdrażam strategie promocyjne dla wielu topowych marek w różnych branżach. Dziś koncentruję się na nowoczesnym marketingu w mediach społecznościowych oraz wykorzystaniu AI do tworzenia efektywnych zespołów handlowych.
    </p>

    {/* Mission Section */}
    <p>
      W Votum Consumer Care pomagam osobom uwikłanym w toksyczne kredyty walutowe – zarówno aktywne, jak i spłacone – unieważnić umowy i odzyskać należne im środki. Na etapie wstępnej analizy wyliczam realne korzyści finansowe wynikające z unieważnienia umowy oraz rekomenduję najlepsze możliwe rozwiązanie. Doradzam na każdym etapie – od analizy po wyrok sądu.
    </p>

    {/* Key Benefits List */}
    <ul className="list-none space-y-2">
      <li className="flex items-start">
        <span className="mr-2">✅</span>
        <span>Analiza wstępna i wyliczenie korzyści są całkowicie <strong style={{ color: '#D4AF37' }}>BEZPŁATNE</strong>.</span>
      </li>
      <li className="flex items-start">
        <span className="mr-2"></span> {/* Empty span for alignment */}
        <span>Nie ryzykujesz nic – możesz tylko zyskać.</span>
      </li>
    </ul>

    {/* Separator */}
    <hr className="my-8" style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }} />

    {/* Call to Action Section */}
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4" style={{ color: '#D4AF37' }}>
        Zrób pierwszy krok już dziś.
      </h2>
      <ul className="list-none space-y-2 text-xl">
        <li className="flex items-center justify-center">
          <span>Sprawdź swoją umowę.</span>
        </li>
        <li className="flex items-center justify-center">
          <span>Zobacz, ile możesz odzyskać.</span>
        </li>
        <li className="flex items-center justify-center">
  <button
    onClick={openModal}
    className="inline-flex items-center justify-center text-xl font-semibold transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0A1A2F] focus:ring-[#D4AF37] rounded-md px-2 py-1"
    style={{ color: '#F5F5F5', backgroundColor: 'transparent', border: 'none' }}
  >
    <span className="mr-2">📩</span>
    <span>Skontaktuj się ze mną – to nic nie kosztuje, a może zmienić Twoją przyszłość.</span>
  </button>
</li>

      </ul>
    </div>
  </div>
</div>

          </div>
        </div>
      </section>
      {/* Add more content sections here */}
    </div>
  );
};

export default AboutMePage;
