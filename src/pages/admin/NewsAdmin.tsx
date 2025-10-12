import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Search, Eye, EyeOff, Calendar, User } from 'lucide-react';
import { newsApi } from '../../lib/supabase';

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category?: string;
  is_visible: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const NewsAdmin: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: 'Krzysztof Milewski',
    date: new Date().toISOString().split('T')[0],
    category: '',
    is_visible: true,
    display_order: 0,
  });

  const categories = [
    'Orzecznictwo',
    'Zmiany prawne',
    'Statystyki',
    'Poradniki',
    'Aktualności',
    'Inne'
  ];

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const data = await newsApi.getAll();
      setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
      showNotification('error', 'Błąd podczas ładowania aktualności');
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
      if (editingNews) {
        await newsApi.update(editingNews.id, formData);
        showNotification('success', 'Artykuł został zaktualizowany');
      } else {
        await newsApi.create(formData);
        showNotification('success', 'Artykuł został dodany');
      }

      await fetchNews();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving news:', error);
      showNotification('error', 'Błąd podczas zapisywania artykułu');
    }
  };

  const handleEdit = (article: NewsArticle) => {
    setEditingNews(article);
    setFormData({
      title: article.title,
      content: article.content,
      author: article.author,
      date: article.date,
      category: article.category || '',
      is_visible: article.is_visible,
      display_order: article.display_order,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await newsApi.delete(id);
      await fetchNews();
      showNotification('success', 'Artykuł został usunięty');
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting news:', error);
      showNotification('error', 'Błąd podczas usuwania artykułu');
    }
  };

  const toggleVisibility = async (article: NewsArticle) => {
    try {
      await newsApi.update(article.id, {
        is_visible: !article.is_visible,
      });
      await fetchNews();
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
    setEditingNews(null);
    setFormData({
      title: '',
      content: '',
      author: 'Krzysztof Milewski',
      date: new Date().toISOString().split('T')[0],
      category: '',
      is_visible: true,
      display_order: 0,
    });
  };

  const filteredNews = news.filter(
    (n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#F5F5F5' }}>
            Aktualności
          </h1>
          <p className="text-lg" style={{ color: '#D4AF37' }}>
            Zarządzaj artykułami i newsami na stronie
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
            placeholder="Szukaj po tytule, treści lub autorze..."
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
        <div className="space-y-4">
          {filteredNews.map((article) => (
            <div
              key={article.id}
              className="p-6 rounded-2xl shadow-xl border-4"
              style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h2 className="text-2xl font-bold" style={{ color: '#0A1A2F' }}>
                      {article.title}
                    </h2>
                    {article.category && (
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{ backgroundColor: '#D4AF37', color: '#0A1A2F' }}
                      >
                        {article.category}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-4 mb-3 text-sm" style={{ color: '#0A1A2F', opacity: 0.7 }}>
                    <div className="flex items-center space-x-1">
                      <User size={16} />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>{new Date(article.date).toLocaleDateString('pl-PL')}</span>
                    </div>
                  </div>

                  <p
                    className="text-base leading-relaxed line-clamp-3"
                    style={{ color: '#0A1A2F' }}
                  >
                    {article.content}
                  </p>
                </div>

                <div className="flex flex-col items-end space-y-2 ml-4">
                  <button
                    onClick={() => toggleVisibility(article)}
                    className="p-2 rounded-lg transition-all hover:scale-110"
                    style={{
                      backgroundColor: article.is_visible ? '#22c55e' : '#ef4444',
                      color: '#FFFFFF',
                    }}
                    title={article.is_visible ? 'Ukryj' : 'Pokaż'}
                  >
                    {article.is_visible ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>

                  <button
                    onClick={() => handleEdit(article)}
                    className="p-2 rounded-lg transition-all hover:scale-110"
                    style={{ backgroundColor: '#D4AF37', color: '#0A1A2F' }}
                    title="Edytuj"
                  >
                    <Edit2 size={20} />
                  </button>

                  <button
                    onClick={() => setDeleteConfirm(article.id)}
                    className="p-2 rounded-lg transition-all hover:scale-110"
                    style={{ backgroundColor: '#ef4444', color: '#FFFFFF' }}
                    title="Usuń"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
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
                {editingNews ? 'Edytuj Artykuł' : 'Dodaj Nowy Artykuł'}
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
                  placeholder="np. Przełomowy wyrok TSUE ws. kredytów frankowych"
                  required
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                    Autor *
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2"
                    style={{ backgroundColor: '#FFFFFF', borderColor: '#D4AF37', color: '#0A1A2F' }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                    Data Publikacji *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2"
                    style={{ backgroundColor: '#FFFFFF', borderColor: '#D4AF37', color: '#0A1A2F' }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                    Kategoria
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2"
                    style={{ backgroundColor: '#FFFFFF', borderColor: '#D4AF37', color: '#0A1A2F' }}
                  >
                    <option value="">Wybierz kategorię</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                  Treść Artykułu *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={12}
                  className="w-full px-4 py-3 rounded-lg border-2 font-mono text-sm"
                  style={{ backgroundColor: '#FFFFFF', borderColor: '#D4AF37', color: '#0A1A2F' }}
                  placeholder="Wpisz treść artykułu. Możesz użyć pustych linii do oddzielania akapitów."
                  required
                />
                <p className="text-xs mt-1" style={{ color: '#0A1A2F', opacity: 0.7 }}>
                  💡 Wskazówka: Pusta linia tworzy nowy akapit
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                    Kolejność wyświetlania
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
                  <p className="text-xs mt-1" style={{ color: '#0A1A2F', opacity: 0.7 }}>
                    Artykuły są domyślnie sortowane po dacie (najnowsze najpierw)
                  </p>
                </div>

                <div>
                  <label className="flex items-center space-x-3 cursor-pointer pt-8">
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
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 border-4"
                  style={{ backgroundColor: '#D4AF37', borderColor: '#D4AF37', color: '#0A1A2F' }}
                >
                  {editingNews ? 'Zapisz Zmiany' : 'Dodaj Artykuł'}
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
          <li>• Artykuły są wyświetlane na stronie /news (Aktualności)</li>
          <li>• Domyślnie artykuły sortowane są po dacie publikacji (najnowsze najpierw)</li>
          <li>• Możesz ukryć artykuł bez usuwania - użyj przycisku widoczności</li>
          <li>• W treści artykułu używaj pustych linii do tworzenia nowych akapitów</li>
          <li>• Zmiany są natychmiast widoczne na stronie publicznej</li>
        </ul>
      </div>
    </div>
  );
};

export default NewsAdmin;