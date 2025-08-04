import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

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

  const parseCsv = (csvText: string): NewsArticle[] => {
    const lines = csvText.trim().split('\n');
    if (lines.length <= 1) return [];

    const headers = lines[0].split(',').map(header => header.trim());
    const data = lines.slice(1).map(line => {
      // Handle CSV parsing with potential commas in content
      const values: string[] = [];
      let currentValue = '';
      let insideQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
          values.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      values.push(currentValue.trim()); // Add the last value

      const row: { [key: string]: string } = {};
      headers.forEach((header, index) => {
        row[header] = values[index] ? values[index].replace(/"/g, '') : '';
      });
      
      return {
        id: row.id || '',
        title: row.title || '',
        date: row.date || '',
        content: row.content || ''
      } as NewsArticle;
    });
    
    return data.filter(article => article.id && article.title); // Filter out empty rows
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          'https://docs.google.com/spreadsheets/d/e/2PACX-1vT9F_eSy0D8zahz0Eo8Je6a_MY2bmDCEpvN8HZC_iXu97szUrLtVS8cYR9awQSJLHSanX-FaTMxTiI9/pub?gid=0&single=true&output=csv',
          {
            method: 'GET',
            headers: {
              'Accept': 'text/csv',
            },
          }
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const csvText = await response.text();
        const parsedData = parseCsv(csvText);
        
        // Sort articles by date (newest first) if dates are provided
        const sortedData = parsedData.sort((a, b) => {
          if (!a.date || !b.date) return 0;
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        
        setNewsArticles(sortedData);
      } catch (e: any) {
        console.error('Error fetching news:', e);
        setError(e.message || 'Wystąpił błąd podczas ładowania aktualności');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

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
                  className="p-8 rounded-2xl shadow-xl border-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
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
                  <p 
                    className="text-lg leading-relaxed news-article-content" 
                    style={{ color: '#F5F5F5' }} 
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  >
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewsPage;