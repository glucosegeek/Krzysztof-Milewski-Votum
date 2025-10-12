import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import NewsArticleDetailModal from '../components/NewsArticleDetailModal';

interface NewsArticle {
  id: string;
  title: string;
  date: string;
  content: string;
}

const NewsPage: React.FC = () => {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNewsArticleModal, setShowNewsArticleModal] = useState(false);
  const [selectedNewsArticle, setSelectedNewsArticle] = useState<NewsArticle | null>(null);

  const parseGoogleSheetsJson = (jsonData: any): NewsArticle[] => {
    try {
      // Google Sheets JSON structure has table.rows and table.cols
      const table = jsonData.table;
      if (!table || !table.rows || !table.cols) {
        console.error('Invalid Google Sheets JSON structure');
        return [];
      }

      // Get column headers
      const headers = table.cols.map((col: any) => col.label || col.id || '');
      
      // Find column indices
      const idIndex = headers.findIndex((h: string) => h.toLowerCase().includes('id'));
      const titleIndex = headers.findIndex((h: string) => h.toLowerCase().includes('title'));
      const dateIndex = headers.findIndex((h: string) => h.toLowerCase().includes('date'));
      const contentIndex = headers.findIndex((h: string) => h.toLowerCase().includes('content'));

      if (idIndex === -1 || titleIndex === -1 || contentIndex === -1) {
        console.error('Required columns not found in Google Sheets');
        return [];
      }

      // Parse rows
      const articles: NewsArticle[] = [];
      
      table.rows.forEach((row: any, index: number) => {
        // Skip header row if it exists
        if (index === 0 && row.c && row.c[titleIndex] && 
            row.c[titleIndex].v && 
            row.c[titleIndex].v.toString().toLowerCase().includes('title')) {
          return;
        }

        if (!row.c) return;

        const id = row.c[idIndex]?.v?.toString() || '';
        const title = row.c[titleIndex]?.v?.toString() || '';
        const date = row.c[dateIndex]?.v?.toString() || '';
        console.log('1. Raw date from Google Sheet:', date);
        const content = row.c[contentIndex]?.v?.toString() || '';

        // Only add articles with required fields
        if (id && title && content) {
          articles.push({
            id,
            title,
            date,
            content
          });
        }
      });

      return articles;
    } catch (error) {
      console.error('Error parsing Google Sheets JSON:', error);
      return [];
    }
  };

  const parseDateString = (dateString: string): Date => {
    console.log('2. parseDateString input:', dateString); // ADD THIS LINE
     // Attempt 1: Handle "Date(YYYY,MM,DD)" format from Google Sheets API
  const googleSheetsDateMatch = dateString.match(/^Date\((\d{4}),(\d{1,2}),(\d{1,2})\)$/);
  if (googleSheetsDateMatch) {
    const year = parseInt(googleSheetsDateMatch[1], 10);
    const month = parseInt(googleSheetsDateMatch[2], 10); // Month is 0-indexed in JS Date constructor
    const day = parseInt(googleSheetsDateMatch[3], 10);
    const date = new Date(year, month, day);
    if (!isNaN(date.getTime())) {
      console.log('3. parseDateString returning valid Date object (from GS format):', date);
      return date;
    }
  }
 // Attempt 2: Try parsing DD.MM.YYYY format by reordering to YYYY-MM-DD for reliable Date parsing
  const parts = dateString.split('.');
  if (parts.length === 3) {
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    const date = new Date(`${year}-${month}-${day}`); // This expects YYYY-MM-DD
    if (!isNaN(date.getTime())) {
      console.log('3. parseDateString returning valid Date object (from DD.MM.YYYY):', date);
      return date;
    }
  }

     // Fallback: Try parsing directly (might work for some standard formats if the above fails)
  let date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    console.log('3. parseDateString returning valid Date object (from direct parse):', date);
    return date;
  }

  // Return an invalid date if no format matches
  console.log('3. parseDateString returning Invalid Date:', date);
  return new Date('');
};

  useEffect(() => {
  const fetchNews = async () => {
    try {
      const data = await newsApi.getAllVisible();
      
      if (data && data.length > 0) {
        const processedData = data.map((article: any) => ({
          ...article,
          // Konwersja treści - zamień \n na prawdziwe newliny
          content: article.content.replace(/\\n/g, '\n')
        }));
        
        setNewsArticles(processedData);
      }
    } catch (e: any) {
      console.error('Error fetching news:', e);
      setError(e.message || 'Wystąpił błąd podczas ładowania aktualności');
    } finally {
      setLoading(false);
    }
  };

  fetchNews();
}, []);

  const handleReadMoreClick = (article: NewsArticle) => {
    setSelectedNewsArticle(article);
    setShowNewsArticleModal(true);
  };

  const closeNewsArticleModal = () => {
    setShowNewsArticleModal(false);
    setSelectedNewsArticle(null);
  };


  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5' }}>
      <section className="py-20 text-center">
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
            Aktualności
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Najnowsze wiadomości i aktualizacje prawne dotyczące kredytów walutowych i umów SKD.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: '#D4AF37' }}></div>
              <p className="text-xl mt-4" style={{ color: '#F5F5F5' }}>
                Ładowanie aktualności...
              </p>
            </div>
          )}
          
          {error && (
            <div className="text-center p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <p className="text-xl text-red-400 mb-4">
                Błąd podczas ładowania aktualności
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
          
          {!loading && !error && newsArticles.length === 0 && (
            <div className="text-center p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <p className="text-xl" style={{ color: '#F5F5F5' }}>
                Brak dostępnych aktualności.
              </p>
              <p className="text-sm mt-2" style={{ color: '#F5F5F5' }}>
                Sprawdź ponownie później lub skontaktuj się z nami.
              </p>
            </div>
          )}
          
          {!loading && !error && newsArticles.length > 0 && (
            <div className="space-y-12">
              {newsArticles.map((article) => (
                <div
                  key={article.id}
                  className="p-8 rounded-2xl shadow-xl border-4"
                  style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}
                >
                  <h2 className="text-3xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
                    {article.title}
                  </h2>
                  {article.date && (
                    <p className="text-sm mb-4" style={{ color: '#D4AF37' }}>
                      Opublikowano: {article.date}
                    </p>
                  )}
                  <div 
                    className="text-lg leading-relaxed news-article-content h-32 overflow-hidden" 
                    style={{ color: '#F5F5F5' }} 
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  >
                  </div>
                  <div className="mt-6 text-center">
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

      {/* News Article Detail Modal */}
      {showNewsArticleModal && selectedNewsArticle && (
        <NewsArticleDetailModal article={selectedNewsArticle} onClose={closeNewsArticleModal} />
      )}
    </div>
  );
};

export default NewsPage;