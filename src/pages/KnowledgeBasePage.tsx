import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { knowledgeBaseApi } from '../lib/supabase';
import { useConsultationModal } from '../context/ConsultationModalContext';
import ArticleDetailModal from '../components/ArticleDetailModal';

interface Article {
  id: string;
  title: string;
  category: string;
  iconName: string;
  icon: React.ReactElement;
  fullContent: string;
}

const KnowledgeBasePage: React.FC = () => {
  const { openModal } = useConsultationModal();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchKnowledgeBaseArticles = async () => {
      try {
        const data = await knowledgeBaseApi.getAllVisible();
        
        if (data && data.length > 0) {
          const processedArticles: Article[] = data.map((article: any) => {
            // Dynamiczne pobranie ikony z Lucide
            const IconComponent = (LucideIcons as any)[article.icon_name] || LucideIcons.BookOpen;
            
            return {
              id: article.id,
              title: article.title,
              category: article.category,
              iconName: article.icon_name,
              icon: <IconComponent size={24} />,
              fullContent: article.content
            };
          });
          
          setArticles(processedArticles);
        }
      } catch (e: any) {
        console.error('Error fetching knowledge base articles:', e);
        setError(e.message || 'Wystąpił błąd podczas ładowania artykułów');
      } finally {
        setLoading(false);
      }
    };

    fetchKnowledgeBaseArticles();
  }, []);

  const categories = [
    { name: "Wszystkie", value: "all" },
    { name: "Kredyty walutowe", value: "kredyty-walutowe" },
    { name: "Umowy SKD", value: "umowy-skd" },
    { name: "Orzecznictwo", value: "orzecznictwo" },
    { name: "Ogólne", value: "ogolne" },
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.fullContent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleReadMoreClick = (article: Article) => {
    setSelectedArticle(article);
    setShowArticleModal(true);
  };

  const closeArticleModal = () => {
    setShowArticleModal(false);
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5' }}>
      {/* Hero Section with Background Image */}
      <section 
        className="relative py-20 min-h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: 'url(knowledgebase-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 mb-8 text-lg transition-colors hover:opacity-80"
            style={{ color: '#D4AF37' }}
          >
            <ArrowLeft size={20} />
            <span>Powrót do strony głównej</span>
          </Link>
        </div>
      </section>

      {/* Title Section */}
      <section className="py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Baza wiedzy
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Znajdź odpowiedzi na najczęściej zadawane pytania i pogłębij swoją wiedzę 
            na temat kredytów walutowych i umów SKD.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="pb-12" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search 
                size={20} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2" 
                style={{ color: '#0A1A2F', opacity: 0.5 }} 
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Szukaj artykułów..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-4 text-lg"
                style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 border-2 ${
                  selectedCategory === category.value
                    ? 'shadow-lg scale-105'
                    : 'hover:scale-105'
                }`}
                style={
                  selectedCategory === category.value
                    ? { backgroundColor: '#D4AF37', borderColor: '#D4AF37', color: '#0A1A2F' }
                    : { backgroundColor: 'transparent', borderColor: '#D4AF37', color: '#D4AF37' }
                }
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div 
                className="animate-spin rounded-full h-16 w-16 border-b-4"
                style={{ borderColor: '#D4AF37' }}
              ></div>
            </div>
          )}
          
          {error && (
            <div className="text-center p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <p className="text-xl text-red-400 mb-4">
                Błąd podczas ładowania artykułów
              </p>
              <p className="text-sm" style={{ color: '#F5F5F5' }}>
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 rounded-lg border-2 transition-colors hover:bg-opacity-10 hover:bg-white"
                style={{ borderColor: '#D4AF37', color: '#D4AF37' }}
              >
                Spróbuj ponownie
              </button>
            </div>
          )}
          
          {!loading && !error && filteredArticles.length === 0 && (
            <div className="text-center p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <p className="text-xl" style={{ color: '#F5F5F5' }}>
                Brak artykułów spełniających kryteria wyszukiwania.
              </p>
            </div>
          )}
          
          {!loading && !error && filteredArticles.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="p-8 rounded-2xl shadow-xl border-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}
                >
                  <div className="w-16 h-16 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                    {React.cloneElement(article.icon as React.ReactElement, { size: 32, style: { color: '#0A1A2F' } })}
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: '#F5F5F5' }}>
                    {article.title}
                  </h2>
                  <div 
                    className="text-lg leading-relaxed mb-6 text-center h-24 overflow-hidden knowledge-base-article-content" 
                    style={{ color: '#F5F5F5' }}
                    dangerouslySetInnerHTML={{ __html: article.fullContent }}
                  />
                  <div className="text-center">
                    <button
                      onClick={() => handleReadMoreClick(article)}
                      className="inline-block font-bold py-3 px-6 rounded-lg text-md transition-all hover:-translate-y-1 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4"
                      style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}
                    >
                      Czytaj więcej →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#0A1A2F' }}>
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
              style={{backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F'}}
            >
              Umów bezpłatną konsultację
            </button>
          </div>
        </div>
      </section>

      {/* Article Detail Modal */}
      {showArticleModal && selectedArticle && (
        <ArticleDetailModal article={selectedArticle} onClose={closeArticleModal} />
      )}
    </div>
  );
};

export default KnowledgeBasePage;