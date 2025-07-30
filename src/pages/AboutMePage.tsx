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
              Ekspert ds. unieważniania kredytów walutowych | Przedstawiciel Votum Consumer Care
Strateg sprzedaży i marketingu z 30-letnim doświadczeniem

Od niemal trzech dekad skutecznie zarządzam projektami, buduję ogólnopolskie zespoły sprzedażowe i wdrażam strategie promocyjne dla wielu topowych marek w różnych branżach. Dziś koncentruję się na nowoczesnym marketingu w mediach społecznościowych oraz wykorzystaniu AI do tworzenia efektywnych zespołów handlowych.

W Votum Consumer Care pomagam osobom uwikłanym w toksyczne kredyty walutowe – zarówno aktywne, jak i spłacone – unieważnić umowy i odzyskać należne im środki. Na etapie wstępnej analizy wyliczam realne korzyści finansowe wynikające z unieważnienia umowy oraz rekomenduję najlepsze możliwe rozwiązanie.
Doradzam na każdym etapie – od analizy po wyrok sądu.

✅ Analiza wstępna i wyliczenie korzyści są całkowicie BEZPŁATNE.
Nie ryzykujesz nic – możesz tylko zyskać.

⸻

🔥 Zrób pierwszy krok już dziś.

Sprawdź swoją umowę. Zobacz, ile możesz odzyskać.
📩 Skontaktuj się ze mną – to nic nie kosztuje, a może zmienić Twoją przyszłość.
            </p>
          </div>
        </div>
      </section>
      {/* Add more content sections here */}
    </div>
  );
};

export default AboutMePage;
