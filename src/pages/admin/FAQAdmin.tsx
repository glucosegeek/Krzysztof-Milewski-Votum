import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Search, Eye, EyeOff, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { faqApi } from '../../lib/supabase';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  is_visible: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const FAQAdmin: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: '',
    is_visible: true,
    display_order: 0,
  });

  const categories = [
    'Kredyty frankowe',
    'Kredyty SKD',
    'Proces',
    'Dokumenty',
    'Ogólne',
  ];

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const data = await faqApi.getAll();
      setFaqs(data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      showNotification('error', 'Błąd podczas ładowania FAQ');
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
      if (editingFAQ) {
        await faqApi.update(editingFAQ.id, formData);
        showNotification('success', 'FAQ zostało zaktualizowane');
      } else {
        await faqApi.create(formData);
        showNotification('success', 'FAQ zostało dodane');
      }

      await fetchFAQs();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving FAQ:', error);
      showNotification('error', 'Błąd podczas zapisywania FAQ');
    }
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFAQ(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || '',
      is_visible: faq.is_visible,
      display_order: faq.display_order,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await faqApi.delete(id);
      await fetchFAQs();
      showNotification('success', 'FAQ zostało usunięte');
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      showNotification('error', 'Błąd podczas usuwania FAQ');
    }
  };

  const toggleVisibility = async (faq: FAQ) => {
    try {
      await faqApi.update(faq.id, {
        is_visible: !faq.is_visible,
      });
      await fetchFAQs();
      showNotification(
        'success',
        `FAQ zostało ${!faq.is_visible ? 'ukryte' : 'pokazane'}`
      );
    } catch (error) {
      console.error('Error toggling visibility:', error);
      showNotification('error', 'Błąd podczas zmiany widoczności');
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingFAQ(null);
    setFormData({
      question: '',
      answer: '',
      category: '',
      is_visible: true,
      display_order: 0,
    });
  };

  const filteredFAQs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#F5F5F5' }}>
            FAQ
          </h1>
          <p className="text-lg" style={{ color: '#D4AF37' }}>
            Zarządzaj najczęściej zadawanymi pytaniami
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 border-4 hover:scale-105"
          style={{ backgroundColor: '#D4AF37', borderColor: '#D4AF37', color: '#0A1A2F' }}
        >
          <Plus size={20} className="mr-2" />
          Dodaj FAQ
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
            placeholder="Szukaj po pytaniu lub odpowiedzi..."
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
          {filteredFAQs.map((faq) => (
            <div
              key={faq.id}
              className="rounded-2xl shadow-xl border-4 overflow-hidden"
              style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                      className="w-full text-left flex items-center justify-between mb-2"
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <HelpCircle size={24} style={{ color: '#D4AF37' }} />
                        <h3 className="text-xl font-bold" style={{ color: '#0A1A2F' }}>
                          {faq.question}
                        </h3>
                      </div>
                      {expandedFAQ === faq.id ? (
                        <ChevronUp size={24} style={{ color: '#D4AF37' }} />
                      ) : (
                        <ChevronDown size={24} style={{ color: '#D4AF37' }} />
                      )}
                    </button>

                    {faq.category && (
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-2"
                        style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)', color: '#D4AF37' }}
                      >
                        {faq.category}
                      </span>
                    )}

                    {expandedFAQ === faq.id && (
                      <div className="mt-4 pt-4 border-t-2" style={{ borderColor: '#D4AF37' }}>
                        <p className="text-base leading-relaxed" style={{ color: '#0A1A2F' }}>
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <button
                      onClick={() => toggleVisibility(faq)}
                      className="p-2 rounded-lg transition-all hover:scale-110"
                      style={{
                        backgroundColor: faq.is_visible ? '#22c55e' : '#ef4444',
                        color: '#FFFFFF',
                      }}
                      title={faq.is_visible ? 'Ukryj' : 'Pokaż'}
                    >
                      {faq.is_visible ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>

                    <button
                      onClick={() => handleEdit(faq)}
                      className="p-2 rounded-lg transition-all hover:scale-110"
                      style={{ backgroundColor: '#D4AF37', color: '#0A1A2F' }}
                      title="Edytuj"
                    >
                      <Edit2 size={16} />
                    </button>

                    <button
                      onClick={() => setDeleteConfirm(faq.id)}
                      className="p-2 rounded-lg transition-all hover:scale-110"
                      style={{ backgroundColor: '#ef4444', color: '#FFFFFF' }}
                      title="Usuń"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl" style={{ color: '#F5F5F5' }}>
                Brak FAQ do wyświetlenia
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
              Czy na pewno chcesz usunąć to pytanie? Tej operacji nie można cofnąć.
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
            className="max-w-3xl w-full my-8 rounded-2xl shadow-xl border-4 p-8"
            style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{ color: '#0A1A2F' }}>
                {editingFAQ ? 'Edytuj FAQ' : 'Dodaj Nowe FAQ'}
              </h2>
              <button onClick={handleCloseForm} style={{ color: '#0A1A2F' }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                  Pytanie *
                </label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2"
                  style={{ backgroundColor: '#FFFFFF', borderColor: '#D4AF37', color: '#0A1A2F' }}
                  placeholder="np. Czy mogę unieważnić kredyt frankowy?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                  Odpowiedź *
                </label>
                <textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border-2"
                  style={{ backgroundColor: '#FFFFFF', borderColor: '#D4AF37', color: '#0A1A2F' }}
                  placeholder="Wpisz pełną odpowiedź na pytanie..."
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                    Kategoria (opcjonalnie)
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2"
                    style={{ backgroundColor: '#FFFFFF', borderColor: '#D4AF37', color: '#0A1A2F' }}
                  >
                    <option value="">Bez kategorii</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

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
                    Niższe liczby wyświetlają się jako pierwsze
                  </p>
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
                    Widoczne publicznie
                  </span>
                </label>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 border-4"
                  style={{ backgroundColor: '#D4AF37', borderColor: '#D4AF37', color: '#0A1A2F' }}
                >
                  {editingFAQ ? 'Zapisz Zmiany' : 'Dodaj FAQ'}
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
          <li>• FAQ są wyświetlane na stronie /faq</li>
          <li>• Możesz ukryć pytanie bez usuwania - użyj przycisku widoczności</li>
          <li>• Kolejność wyświetlania kontroluje, które pytania pojawiają się jako pierwsze</li>
          <li>• Kategorie pomagają organizować pytania tematycznie</li>
          <li>• Zmiany są natychmiast widoczne na stronie publicznej</li>
        </ul>
      </div>
    </div>
  );
};

export default FAQAdmin;