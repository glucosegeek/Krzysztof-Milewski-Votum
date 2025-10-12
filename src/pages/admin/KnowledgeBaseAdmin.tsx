import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Search, Eye, EyeOff, BookOpen } from 'lucide-react';
import { knowledgeBaseApi } from '../../lib/supabase';

interface KnowledgeBaseArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  icon_name: string;
  is_visible: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const KnowledgeBaseAdmin: React.FC = () => {
  // Funkcja konwertująca zwykły tekst na HTML
const convertTextToHTML = (text: string): string => {
  // Dzielimy tekst na linie
  const lines = text.split('\n');
  let html = '';
  let inList = false;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    
    // Pusta linia = koniec akapitu lub listy
    if (line === '') {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      continue;
    }
    
    // Lista punktowana (zaczyna się od "- ")
    if (line.startsWith('- ')) {
      if (!inList) {
        html += '<ul>';
        inList = true;
      }
      line = line.substring(2); // Usuń "- "
      
      // Formatowanie wewnątrz elementu listy
      line = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'); // **bold**
      line = line.replace(/\*(.+?)\*/g, '<em>$1</em>'); // *italic*
      
      html += `<li>${line}</li>`;
    } 
    // Zwykła linia tekstu
    else {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      
      // Formatowanie w linii
      line = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'); // **bold**
      line = line.replace(/\*(.+?)\*/g, '<em>$1</em>'); // *italic*
      
      html += `<p>${line}</p>`;
    }
  }
  
  // Zamknij listę jeśli była otwarta
  if (inList) {
    html += '</ul>';
  }
  
  return html;
};
  const [articles, setArticles] = useState<KnowledgeBaseArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<KnowledgeBaseArticle | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'ogolne',
    icon_name: 'BookOpen',
    is_visible: true,
    display_order: 0,
  });

  const categories = [
    { value: 'kredyty-walutowe', label: 'Kredyty walutowe' },
    { value: 'umowy-skd', label: 'Umowy SKD' },
    { value: 'orzecznictwo', label: 'Orzecznictwo' },
    { value: 'ogolne', label: 'Ogólne' },
  ];

  const availableIcons = [
    'BookOpen',
    'Scale',
    'FileText',
    'HelpCircle',
    'DollarSign',
    'CreditCard',
    'Gavel',
    'Shield',
    'AlertCircle',
    'CheckCircle',
    'Info',
    'TrendingUp',
    'Award',
    'Briefcase',
    'Calculator',
  ];

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const data = await knowledgeBaseApi.getAll();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
      showNotification('error', 'Błąd podczas ładowania artykułów');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // Konwertuj zwykły tekst na HTML przed zapisaniem
    const htmlContent = convertTextToHTML(formData.content);
    
    const dataToSave = {
      ...formData,
      content: htmlContent
    };

    if (editingArticle) {
      await knowledgeBaseApi.update(editingArticle.id, dataToSave);
      showNotification('success', 'Artykuł został zaktualizowany');
    } else {
      await knowledgeBaseApi.create(dataToSave);
      showNotification('success', 'Artykuł został dodany');
    }

    await fetchArticles();
    handleCloseForm();
  } catch (error) {
    console.error('Error saving article:', error);
    showNotification('error', 'Błąd podczas zapisywania artykułu');
  }
};

// Funkcja konwertująca HTML z powrotem na zwykły tekst (dla edycji)
const convertHTMLToText = (html: string): string => {
  let text = html;
  
  // Konwertuj listy
  text = text.replace(/<ul>/g, '');
  text = text.replace(/<\/ul>/g, '\n');
  text = text.replace(/<li>/g, '- ');
  text = text.replace(/<\/li>/g, '\n');
  
  // Konwertuj akapity
  text = text.replace(/<p>/g, '');
  text = text.replace(/<\/p>/g, '\n\n');
  
  // Konwertuj formatowanie
  text = text.replace(/<strong>/g, '**');
  text = text.replace(/<\/strong>/g, '**');
  text = text.replace(/<em>/g, '*');
  text = text.replace(/<\/em>/g, '*');
  
  // Usuń podwójne puste linie
  text = text.replace(/\n\n\n+/g, '\n\n');
  
  return text.trim();
};
  
const handleEdit = (article: KnowledgeBaseArticle) => {
  setEditingArticle(article);
  setFormData({
    title: article.title,
    content: convertHTMLToText(article.content), // Konwertuj HTML na tekst do edycji
    category: article.category,
    icon_name: article.icon_name,
    is_visible: article.is_visible,
    display_order: article.display_order,
  });
  setShowForm(true);
};

  const handleDelete = async (id: string) => {
    try {
      await knowledgeBaseApi.delete(id);
      await fetchArticles();
      showNotification('success', 'Artykuł został usunięty');
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting article:', error);
      showNotification('error', 'Błąd podczas usuwania artykułu');
    }
  };

  const toggleVisibility = async (article: KnowledgeBaseArticle) => {
    try {
      await knowledgeBaseApi.update(article.id, {
        is_visible: !article.is_visible,
      });
      await fetchArticles();
      showNotification(
        'success',
        `Artykuł został ${!article.is_visible ? 'ukryty' : 'opublikowany'}`
      );
    } catch (error) {
      console.error('Error toggling visibility:', error);
      showNotification('error', 'Błąd podczas zmiany widoczności');
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingArticle(null);
    setFormData({
      title: '',
      content: '',
      category: 'ogolne',
      icon_name: 'BookOpen',
      is_visible: true,
      display_order: 0,
    });
  };

  const getCategoryLabel = (categoryValue: string) => {
    return categories.find(cat => cat.value === categoryValue)?.label || categoryValue;
  };

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#F5F5F5' }}>
            Baza Wiedzy
          </h1>
          <p className="text-lg" style={{ color: '#D4AF37' }}>
            Zarządzaj artykułami w bazie wiedzy
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 border-4 hover:scale-105"
          style={{ backgroundColor: '#D4AF37', borderColor: '#D4AF37', color: '#0A1A2F' }}
        >
          <Plus size={20} className="mr-2" />
          Dodaj Artykuł
        </button>
      </div>

      {notification && (
        <div
          className="mb-6 p-4 rounded-lg border-2"
          style={{
            backgroundColor:
              notification.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            borderColor: notification.type === 'success' ? '#22c55e' : '#ef4444',
          }}
        >
          <p style={{ color: notification.type === 'success' ? '#22c55e' : '#ef4444' }}>
            {notification.message}
          </p>
        </div>
      )}

      <div className="mb-6">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
            style={{ color: '#0A1A2F', opacity: 0.5 }}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Szukaj po tytule, treści lub kategorii..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border-2"
            style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2"
            style={{ borderColor: '#D4AF37' }}
          ></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="p-6 rounded-2xl shadow-xl border-4 transition-all hover:scale-105"
              style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: '#D4AF37' }}
                  >
                    <BookOpen size={24} style={{ color: '#0A1A2F' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#0A1A2F' }}>
                    {article.title}
                  </h3>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
                    style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)', color: '#D4AF37' }}
                  >
                    {getCategoryLabel(article.category)}
                  </span>
                </div>
              </div>

              <div
                className="text-sm mb-4 line-clamp-3"
                style={{ color: '#0A1A2F' }}
                dangerouslySetInnerHTML={{
                  __html: article.content.substring(0, 150) + '...',
                }}
              />

              <div className="flex items-center justify-between pt-4 border-t-2" style={{ borderColor: '#D4AF37' }}>
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleVisibility(article)}
                    className="p-2 rounded-lg transition-all hover:scale-110"
                    style={{
                      backgroundColor: article.is_visible ? '#22c55e' : '#ef4444',
                      color: '#FFFFFF',
                    }}
                    title={article.is_visible ? 'Ukryj' : 'Pokaż'}
                  >
                    {article.is_visible ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>

                  <button
                    onClick={() => handleEdit(article)}
                    className="p-2 rounded-lg transition-all hover:scale-110"
                    style={{ backgroundColor: '#D4AF37', color: '#0A1A2F' }}
                    title="Edytuj"
                  >
                    <Edit2 size={16} />
                  </button>

                  <button
                    onClick={() => setDeleteConfirm(article.id)}
                    className="p-2 rounded-lg transition-all hover:scale-110"
                    style={{ backgroundColor: '#ef4444', color: '#FFFFFF' }}
                    title="Usuń"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <span className="text-xs font-medium" style={{ color: '#0A1A2F', opacity: 0.5 }}>
                  Kolejność: {article.display_order}
                </span>
              </div>
            </div>
          ))}

          {filteredArticles.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-xl" style={{ color: '#F5F5F5' }}>
                Brak artykułów do wyświetlenia
              </p>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className="max-w-md w-full rounded-2xl shadow-xl border-4 p-8"
            style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
          >
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0A1A2F' }}>
              Potwierdź usunięcie
            </h2>
            <p className="mb-6" style={{ color: '#0A1A2F' }}>
              Czy na pewno chcesz usunąć ten artykuł? Tej operacji nie można cofnąć.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
                style={{ backgroundColor: '#ef4444', color: '#FFFFFF' }}
              >
                Usuń
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 border-2"
                style={{ borderColor: '#D4AF37', color: '#0A1A2F' }}
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div
            className="max-w-4xl w-full my-8 rounded-2xl shadow-xl border-4 p-8"
            style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{ color: '#0A1A2F' }}>
                {editingArticle ? 'Edytuj Artykuł' : 'Dodaj Nowy Artykuł'}
              </h2>
              <button onClick={handleCloseForm} style={{ color: '#0A1A2F' }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                  Tytuł Artykułu *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2"
                  style={{ backgroundColor: '#FFFFFF', borderColor: '#D4AF37', color: '#0A1A2F' }}
                  placeholder="np. Czym jest kredyt frankowy?"
                  required
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                    Kategoria *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2"
                    style={{ backgroundColor: '#FFFFFF', borderColor: '#D4AF37', color: '#0A1A2F' }}
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                    Ikona *
                  </label>
                  <select
                    value={formData.icon_name}
                    onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2"
                    style={{ backgroundColor: '#FFFFFF', borderColor: '#D4AF37', color: '#0A1A2F' }}
                    required
                  >
                    {availableIcons.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                    Kolejność
                  </label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2"
                    style={{ backgroundColor: '#FFFFFF', borderColor: '#D4AF37', color: '#0A1A2F' }}
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
  <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
    Treść Artykułu *
  </label>
  <textarea
    value={formData.content}
    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
    rows={16}
    className="w-full px-4 py-3 rounded-lg border-2"
    style={{ backgroundColor: '#FFFFFF', borderColor: '#D4AF37', color: '#0A1A2F' }}
    placeholder="Wpisz treść artykułu. Możesz używać:

Pusta linia tworzy nowy akapit.

**pogrubiony tekst** - otocz tekst gwiazdkami
*kursywa* - otocz tekst pojedynczą gwiazdką

Lista:
- Punkt pierwszy
- Punkt drugi
- Punkt trzeci

To proste!" 
    required
  />
  <div className="mt-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
    <p className="text-xs font-medium mb-2" style={{ color: '#0A1A2F' }}>
      💡 Formatowanie tekstu:
    </p>
    <ul className="text-xs space-y-1" style={{ color: '#0A1A2F' }}>
      <li>• <strong>Pusta linia</strong> = nowy akapit</li>
      <li>• <strong>**tekst**</strong> = pogrubienie</li>
      <li>• <strong>*tekst*</strong> = kursywa</li>
      <li>• <strong>- tekst</strong> na początku linii = lista punktowana</li>
    </ul>
  </div>
</div>

              <div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_visible}
                    onChange={(e) => setFormData({ ...formData, is_visible: e.target.checked })}
                    className="w-5 h-5 rounded border-2"
                    style={{ accentColor: '#D4AF37' }}
                  />
                  <span className="text-sm font-medium" style={{ color: '#0A1A2F' }}>
                    Opublikuj artykuł (widoczny publicznie)
                  </span>
                </label>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 border-4"
                  style={{ backgroundColor: '#D4AF37', borderColor: '#D4AF37', color: '#0A1A2F' }}
                >
                  {editingArticle ? 'Zapisz Zmiany' : 'Dodaj Artykuł'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 border-2"
                  style={{ borderColor: '#D4AF37', color: '#0A1A2F' }}
                >
                  Anuluj
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div
        className="mt-8 p-6 rounded-2xl shadow-xl border-4"
        style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
      >
        <h3 className="text-xl font-bold mb-3" style={{ color: '#0A1A2F' }}>
          Informacje
        </h3>
        <ul className="space-y-2 text-sm" style={{ color: '#0A1A2F' }}>
          <li>• Artykuły są wyświetlane na stronie /knowledge-base (Baza Wiedzy)</li>
          <li>• Treść artykułu obsługuje HTML - możesz formatować tekst</li>
          <li>• Kategorie pomagają użytkownikom filtrować artykuły</li>
          <li>• Ikony pomagają wizualnie identyfikować typy artykułów</li>
          <li>• Kolejność wyświetlania kontroluje pozycję artykułu na liście</li>
        </ul>
      </div>
    </div>
  );
};

export default KnowledgeBaseAdmin;