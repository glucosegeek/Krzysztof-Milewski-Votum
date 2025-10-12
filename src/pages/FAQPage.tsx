import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { faqApi } from '../lib/supabase';
import { useConsultationModal } from '../context/ConsultationModalContext';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

const FAQPage: React.FC = () => {
  const { openModal } = useConsultationModal();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data = await faqApi.getAllVisible();
        setFaqs(data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5' }}>
      {/* Hero Section */}
      <section className="py-20 text-center" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 mb-8 text-lg transition-colors hover:opacity-80"
            style={{ color: '#D4AF37' }}
          >
            <ArrowLeft size={20} />
            <span>Powrót do strony głównej</span>
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Najczęściej zadawane pytania
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Znajdź odpowiedzi na pytania dotyczące kredytów walutowych i umów SKD.
            Jeśli nie znajdziesz odpowiedzi, skontaktuj się z nami.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div
                className="animate-spin rounded-full h-16 w-16 border-b-4"
                style={{ borderColor: '#D4AF37' }}
              ></div>
            </div>
          ) : (
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="rounded-2xl shadow-lg border-4 overflow-hidden"
                  style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between transition-all hover:bg-opacity-90"
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <div className="flex items-center space-x-4">
                      <h3 className="text-lg font-semibold" style={{ color: '#F5F5F5' }}>
                        {faq.question}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      {openFAQ === faq.id ? (
                        <ChevronUp size={24} style={{ color: '#D4AF37' }} />
                      ) : (
                        <ChevronDown size={24} style={{ color: '#D4AF37' }} />
                      )}
                    </div>
                  </button>

                  {openFAQ === faq.id && (
                    <div className="px-6 pb-6">
                      <div className="pt-4 border-t" style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }}>
                        <p className="text-lg leading-relaxed" style={{ color: '#F5F5F5' }}>
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {faqs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl" style={{ color: '#0A1A2F' }}>
                    Brak pytań do wyświetlenia
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-12 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
              Nie znalazłeś odpowiedzi na swoje pytanie?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
              Skontaktuj się z nami bezpośrednio. Każda sytuacja jest inna i wymaga indywidualnego podejścia.
              Chętnie odpowiemy na wszystkie Twoje pytania podczas bezpłatnej konsultacji.
            </p>
            <button
              onClick={() => openModal(null, 'direct_consultation')}
              className="inline-block font-bold py-4 px-8 rounded-lg text-lg transition-all hover:-translate-y-2 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4"
              style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}
            >
              Umów bezpłatną konsultację
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;