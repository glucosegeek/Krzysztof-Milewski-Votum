import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, FileText, HelpCircle, Scale, AlertTriangle, CheckCircle } from 'lucide-react';
import { useConsultationModal } from '../context/ConsultationModalContext';

const KnowledgeBasePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("Wszystkie");
  const { openModal } = useConsultationModal();

  const articles = [
    {
      id: 1,
      title: "Czym jest kredyt frankowy i dlaczego jest problematyczny?",
      excerpt: "Dowiedz się, czym są kredyty denominowane w CHF i jakie problemy prawne z nimi związane.",
      icon: <Scale size={24} style={{ color: '#D4AF37' }} />,
      category: "Kredyty walutowe"
    },
    {
      id: 2,
      title: "Klauzule abuzywne w umowach kredytowych - jak je rozpoznać?",
      excerpt: "Praktyczny przewodnik po najczęściej występujących klauzulach abuzywnych w umowach bankowych.",
      icon: <AlertTriangle size={24} style={{ color: '#D4AF37' }} />,
      category: "Prawo konsumenckie"
    },
    {
      id: 3,
      title: "Proces sądowy przeciwko bankowi - krok po kroku",
      excerpt: "Szczegółowy opis tego, czego możesz się spodziewać podczas postępowania sądowego z bankiem.",
      icon: <FileText size={24} style={{ color: '#D4AF37' }} />,
      category: "Postępowanie sądowe"
    },
    {
      id: 4,
      title: "Jakie są szanse na wygraną w sprawie kredytu CHF?",
      excerpt: "Analiza czynników wpływających na powodzenie sprawy i aktualne orzecznictwo sądów.",
      icon: <CheckCircle size={24} style={{ color: '#D4AF37' }} />,
      category: "Kredyty walutowe"
    },
    {
      id: 5,
      title: "Koszty postępowania sądowego - co musisz wiedzieć",
      excerpt: "Przegląd wszystkich kosztów związanych z procesem sądowym i możliwości ich zwrotu.",
      icon: <HelpCircle size={24} style={{ color: '#D4AF37' }} />,
      category: "Koszty prawne"
    },
    {
      id: 6,
      title: "Umowy SKD - prawa konsumenta i możliwości odstąpienia",
      excerpt: "Wszystko o umowach sprzedaży konsumenckiej na odległość i prawach przysługujących konsumentom.",
      icon: <BookOpen size={24} style={{ color: '#D4AF37' }} />,
      category: "Umowy SKD"
    }
  ];

  const categories = ["Wszystkie", "Kredyty walutowe", "Prawo konsumenckie", "Postępowanie sądowe", "Koszty prawne", "Umowy SKD"];

  const filteredArticles = activeCategory === "Wszystkie" 
    ? articles 
    : articles.filter(article => article.category === activeCategory);

  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: '#0A1A2F' }}>
      {/* Header */}
      <section className="py-20" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 mb-8 text-lg transition-colors hover:opacity-80"
              style={{ color: '#D4AF37' }}
            >
              <ArrowLeft size={20} />
              <span>Powrót do strony głównej</span>
            </Link>
            
            <div className="text-center mb-16">
              <div className="w-24 h-24 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-8" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <BookOpen size={48} style={{ color: '#0A1A2F' }} />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
                Baza wiedzy
              </h1>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
                Kompleksowe informacje prawne dotyczące kredytów walutowych, umów SKD 
                i praw konsumenckich. Znajdź odpowiedzi na najważniejsze pytania.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className="px-6 py-3 rounded-full border-2 transition-all hover:scale-105"
                style={{ 
                  backgroundColor: category === activeCategory ? '#D4AF37' : 'transparent',
                  borderColor: '#D4AF37',
                  color: category === activeCategory ? '#0A1A2F' : '#0A1A2F'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <div 
                key={article.id}
                className="p-8 rounded-2xl shadow-xl border-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F5F5F5' }}>
                    {article.icon}
                  </div>
                  <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ backgroundColor: '#D4AF37', color: '#0A1A2F' }}>
                    {article.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-4 leading-tight" style={{ color: '#F5F5F5' }}>
                  {article.title}
                </h3>
                
                <p className="leading-relaxed mb-6" style={{ color: '#F5F5F5' }}>
                  {article.excerpt}
                      </p>
               <button
                 onClick={openModal}
                        onClick={openModal}
                  className="text-sm font-semibold transition-colors hover:opacity-80"
                  style={{ color: '#D4AF37' }}
                >
                  Czytaj więcej →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
                Najważniejsze informacje
              </h2>
              <p className="text-xl" style={{ color: '#F5F5F5' }}>
                Kluczowe fakty, które powinieneś znać o swoich prawach
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#0A1A2F' }}>
                  Przedawnienie roszczeń
                </h3>
                <p className="text-lg leading-relaxed mb-4" style={{ color: '#0A1A2F' }}>
                  Roszczenia z tytułu kredytów walutowych nie ulegają przedawnieniu, 
                  jeśli dotyczą klauzul abuzywnych. Możesz dochodzić swoich praw 
                  niezależnie od tego, kiedy zawarłeś umowę.
                </p>
                <div className="text-sm font-semibold" style={{ color: '#D4AF37' }}>
                  Aktualne na podstawie orzecznictwa TSUE
                </div>
              </div>
              
              <div className="p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#0A1A2F' }}>
                  Bezpłatna pomoc prawna
                </h3>
                <p className="text-lg leading-relaxed mb-4" style={{ color: '#0A1A2F' }}>
                  Pierwsza konsultacja jest zawsze bezpłatna. Działamy w oparciu 
                  o sukces - nie ponosisz kosztów, jeśli nie wygramy sprawy. 
                  Twoje ryzyko finansowe jest minimalne.
                </p>
                <div className="text-sm font-semibold" style={{ color: '#D4AF37' }}>
                  Gwarancja transparentności kosztów
               </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-12 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
              Potrzebujesz indywidualnej porady?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
              Każda sprawa jest inna. Skontaktuj się z nami, aby otrzymać spersonalizowaną 
              analizę swojej sytuacji prawnej i dowiedzieć się o najlepszych opcjach działania.
            </p>
            <Link 
              to="/"
              state={{ scrollToContact: true }}
              className="inline-block font-bold py-4 px-8 rounded-lg text-lg transition-all hover:-translate-y-2 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4"
              style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}
            >
              Bezpłatna konsultacja
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KnowledgeBasePage;