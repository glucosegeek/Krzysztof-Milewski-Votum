import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, FileText, DollarSign, Shield, Gavel, BookOpen, Search } from 'lucide-react';
import { useConsultationModal } from '../context/ConsultationModalContext';
import { knowledgeBaseApi } from '../lib/supabase';
import ArticleDetailModal from '../components/ArticleDetailModal';

interface Article {
  id: number;
  title: string;
  fullContent: string;
  iconName: string;
  icon: React.ReactNode;
  category: string;
}

const KnowledgeBasePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { openModal } = useConsultationModal();

  // State for the ArticleDetailModal
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Icon mapping
  const iconMap: { [key: string]: React.ReactNode } = {
    'Scale': <Scale size={24} />,
    'FileText': <FileText size={24} />,
    'DollarSign': <DollarSign size={24} />,
    'Shield': <Shield size={24} />,
    'Gavel': <Gavel size={24} />,
    'BookOpen': <BookOpen size={24} />,
  };

  const parseGoogleSheetsJson = (jsonData: any): any[] => {
    try {
      const table = jsonData.table;
      if (!table || !table.rows || !table.cols) {
        console.error('Invalid Google Sheets JSON structure');
        return [];
      }

      const headers = table.cols.map((col: any) => col.label || col.id || '');
      
      const idIndex = headers.findIndex((h: string) => h.toLowerCase().includes('id'));
      const titleIndex = headers.findIndex((h: string) => h.toLowerCase().includes('title'));
      const fullContentIndex = headers.findIndex((h: string) => h.toLowerCase().includes('fullcontent') || h.toLowerCase().includes('full_content'));
      const iconIndex = headers.findIndex((h: string) => h.toLowerCase().includes('icon'));
      const categoryIndex = headers.findIndex((h: string) => h.toLowerCase().includes('category'));

      if (idIndex === -1 || titleIndex === -1 || fullContentIndex === -1 || iconIndex === -1 || categoryIndex === -1) {
        console.error('Required columns not found in Google Sheets');
        return [];
      }

      const rawArticles: any[] = [];
      
      table.rows.forEach((row: any, index: number) => {
        if (index === 0 && row.c && row.c[titleIndex] && 
            row.c[titleIndex].v && 
            row.c[titleIndex].v.toString().toLowerCase().includes('title')) {
          return;
        }

        if (!row.c) return;

        const id = row.c[idIndex]?.v?.toString() || '';
        const title = row.c[titleIndex]?.v?.toString() || '';
        const fullContent = row.c[fullContentIndex]?.v?.toString() || '';
        const iconName = row.c[iconIndex]?.v?.toString() || '';
        const category = row.c[categoryIndex]?.v?.toString() || '';

        if (id && title && fullContent && iconName && category) {
          rawArticles.push({
            id: parseInt(id, 10),
            title,
            fullContent,
            iconName,
            category
          });
        }
      });

      return rawArticles;
    } catch (error) {
      console.error('Error parsing Google Sheets JSON:', error);
      return [];
    }
  };

  const processArticleContent = (rawContent: string): string => {
    const lines = rawContent.split('\n');
    let processedLines: string[] = [];
    let inList = false;

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      const isListItem = line.startsWith('\t• ');

      if (isListItem) {
        if (!inList) {
          processedLines.push('<ul>');
          inList = true;
        }
        processedLines.push(`<li>${line.substring(3)}</li>`);
      } else {
        if (inList) {
          processedLines.push('</ul>');
          inList = false;
        }
        if (trimmedLine) {
          processedLines.push(`<p>${line}</p>`);
        } else {
          processedLines.push(line);
        }
      }
    });

    if (inList) {
      processedLines.push('</ul>');
    }

    return processedLines.join('\n');
  };

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
            fullContent: article.content // HTML jest już gotowe
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
      {/* Hero Section with Background Image - Only Link */}
      <section 
        className="relative py-20 min-h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: 'url(knowledgebase-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark Overlay for dimming */}
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        ></div>
        
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

      {/* Search and Filter */}
      <section className="py-10" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Szukaj artykułów..."
                className="w-full px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'rgba(245, 245, 245, 0.1)',
                  border: '1px solid rgba(245, 245, 245, 0.2)',
                  color: '#F5F5F5',
                  '--tw-ring-color': '#D4AF37'
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2" style={{ color: '#D4AF37' }} />
            </div>
            <select
              className="px-4 py-3 rounded-lg focus:outline-none focus:ring-2 appearance-none"
              style={{
                backgroundColor: 'rgba(245, 245, 245, 0.1)',
                border: '1px solid rgba(245, 245, 245, 0.2)',
                color: '#F5F5F5',
                '--tw-ring-color': '#D4AF37'
              }}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value} style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5' }}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: '#D4AF37' }}></div>
              <p className="text-xl mt-4" style={{ color: '#0A1A2F' }}>
                Ładowanie artykułów...
              </p>
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