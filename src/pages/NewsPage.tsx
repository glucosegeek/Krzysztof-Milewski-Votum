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
    let date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date;
    }

    const parts = dateString.split('.');
    if (parts.length === 3) {
      date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
    return new Date('');
  };

  useEffect(() => {
  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        'https://docs.google.com/spreadsheets/d/1lzN_O5z6z4Ed-Lvo0TK9PqU4bQ3sJqUD7poNnuhi6RY/gviz/tq?gid=0&tqx=out:json',
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseText = await response.text();
      
      // Remove the Google Visualization API wrapper
      const jsonString = responseText.replace({});
      const jsonData = JSON.parse(jsonString);
      
      const parsedData = parseGoogleSheetsJson(jsonData);

      // --- START OF NEW CONTENT PROCESSING LOGIC ---
      const processedData = parsedData.map(article => {
        let rawContent = article.content;

        // Step 1: Replace TAB character with <li>
        // This line needs to be changed:
        rawContent = rawContent.replace(/\t/g, '<li>'); // <--- CHANGE THIS LINE

        // Step 2: Process lines to wrap <li> items in <ul>
        const lines = rawContent.split('\n');
        let newContentLines: string[] = [];
        let inList = false;

        lines.forEach((line) => {
          const trimmedLine = line.trim();
          const startsWithLi = trimmedLine.startsWith('<li>');

          if (startsWithLi && !inList) {
            // Start of a new list
            newContentLines.push('<ul>');
            newContentLines.push(line);
            inList = true;
          } else if (startsWithLi && inList) {
            // Continuation of an existing list
            newContentLines.push(line);
          } else if (!startsWithLi && inList) {
            // End of a list
            newContentLines.push('</ul>');
            newContentLines.push(line);
            inList = false;
          } else {
            // Not a list item, and not currently in a list
            newContentLines.push(line);
          }
        });

        // If the content ends with a list, close the <ul> tag
        if (inList) {
          newContentLines.push('</ul>');
        }

        return { ...article, content: newContentLines.join('\n') };
      });
        // --- END OF NEW CONTENT PROCESSING LOGIC ---

        // Sort articles by date (newest first)
        const sortedData = processedData.sort((a, b) => {
          const dateA = parseDateString(a.date);
          const dateB = parseDateString(b.date);

          if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
            return 0;
          }
          return dateB.getTime() - dateA.getTime();
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
                  <div 
                    className="text-lg leading-relaxed news-article-content" 
                    style={{ color: '#F5F5F5' }} 
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  >
                  </div>
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