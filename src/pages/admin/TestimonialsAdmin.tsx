import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Search, Eye, EyeOff, Star } from 'lucide-react';
import { testimonialsApi } from '../../lib/supabase';

interface Testimonial {
  id: string;
  name: string;
  description: string;
  stars: number;
  city: string;
  is_visible: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const TestimonialsAdmin: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    stars: 5,
    city: '',
    is_visible: true,
    display_order: 0,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const data = await testimonialsApi.getAll();
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      showNotification('error', 'Błąd podczas ładowania opinii');
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
      if (editingTestimonial) {
        await testimonialsApi.update(editingTestimonial.id, formData);
        showNotification('success', 'Opinia została zaktualizowana');
      } else {
        await testimonialsApi.create(formData);
        showNotification('success', 'Opinia została dodana');
      }

      await fetchTestimonials();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      showNotification('error', 'Błąd podczas zapisywania opinii');
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      description: testimonial.description,
      stars: testimonial.stars,
      city: testimonial.city,
      is_visible: testimonial.is_visible,
      display_order: testimonial.display_order,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await testimonialsApi.delete(id);
      await fetchTestimonials();
      showNotification('success', 'Opinia została usunięta');
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      showNotification('error', 'Błąd podczas usuwania opinii');
    }
  };

  const toggleVisibility = async (testimonial: Testimonial) => {
    try {
      await testimonialsApi.update(testimonial.id, {
        is_visible: !testimonial.is_visible,
      });
      await fetchTestimonials();
      showNotification(
        'success',
        `Opinia została ${!testimonial.is_visible ? 'ukryta' : 'pokazana'}`
      );
    } catch (error) {
      console.error('Error toggling visibility:', error);
      showNotification('error', 'Błąd podczas zmiany widoczności');
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTestimonial(null);
    setFormData({
      name: '',
      description: '',
      stars: 5,
      city: '',
      is_visible: true,
      display_order: 0,
    });
  };

  const filteredTestimonials = testimonials.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#F5F5F5' }}>
            Opinie Klientów
          </h1>
          <p className="text-lg" style={{ color: '#D4AF37' }}>
            Zarządzaj opiniami wyświetlanymi na stronie głównej
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 border-4 hover:scale-105"
          style={{ backgroundColor: '#D4AF37', borderColor: '#D4AF37', color: '#0A1A2F' }}
        >
          <Plus size={20} className="mr-2" />
          Dodaj Opinię
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
            placeholder="Szukaj po imieniu, mieście lub treści..."
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
        <div className="rounded-2xl shadow-xl border-4 overflow-hidden" style={{ borderColor: '#D4AF37' }}>
          <div className="overflow-x-auto">
            <table className="w-full" style={{ backgroundColor: '#F5F5F5' }}>
              <thead style={{ backgroundColor: '#0A1A2F' }}>
                <tr>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#D4AF37' }}>
                    Imię
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#D4AF37' }}>
                    Miasto
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#D4AF37' }}>
                    Ocena
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#D4AF37' }}>
                    Treść
                  </th>
                  <th className="px-6 py-4 text-center font-semibold" style={{ color: '#D4AF37' }}>
                    Kolejność
                  </th>
                  <th className="px-6 py-4 text-center font-semibold" style={{ color: '#D4AF37' }}>
                    Widoczność
                  </th>
                  <th className="px-6 py-4 text-center font-semibold" style={{ color: '#D4AF37' }}>
                    Akcje
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTestimonials.map((testimonial, index) => (
                  <tr
                    key={testimonial.id}
                    className="border-t-2"
                    style={{ borderColor: '#D4AF37', backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F5F5F5' }}
                  >
                    <td className="px-6 py-4 font-medium" style={{ color: '#0A1A2F' }}>
                      {testimonial.name}
                    </td>
                    <td className="px-6 py-4" style={{ color: '#0A1A2F' }}>
                      {testimonial.city}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {Array.from({ length: testimonial.stars }).map((_, i) => (
                          <Star key={i} size={16} fill="#D4AF37" style={{ color: '#D4AF37' }} />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-md" style={{ color: '#0A1A2F' }}>
                      <p className="truncate">{testimonial.description}</p>
                    </td>
                    <td className="px-6 py-4 text-center font-bold" style={{ color: '#D4AF37' }}>
                      {testimonial.display_order}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => toggleVisibility(testimonial)}
                        className="p-2 rounded-lg transition-all hover:scale-110"
                        style={{
                          backgroundColor: testimonial.is_visible ? '#22c55e' : '#ef4444',
                          color: '#FFFFFF',
                        }}
                        title={testimonial.is_visible ? 'Ukryj' : 'Pokaż'}
                      >
                        {testimonial.is_visible ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(testimonial)}
                          className="p-2 rounded-lg transition-all hover:scale-110"
                          style={{ backgroundColor: '#D4AF37', color: '#0A1A2F' }}
                          title="Edytuj"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(testimonial.id)}
                          className="p-2 rounded-lg transition-all hover:scale-110"
                          style={{ backgroundColor: '#ef4444', color: '#FFFFFF' }}
                          title="Usuń"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredTestimonials.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl" style={{ color: '#0A1A2F' }}>
                  Brak opinii do wyświetlenia
                </p>
              </div>
            )}
          </div>
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
              Czy na pewno chcesz usunąć tę opinię? Tej operacji nie można cofnąć.
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl border-4 p-8"
            style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{ color: '#0A1A2F' }}>
                {editingTestimonial ? 'Edytuj Opinię' : 'Dodaj Nową Opinię'}
              </h2>
              <button onClick={handleCloseForm} style={{ color: '#0A1A2F' }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                  Imię i Nazwisko *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2"
                  style={{ backgroundColor: '#FFFFFF', borderColor: '#D4AF37', color: '#0A1A2F' }}
                  placeholder="np. Anna Kowalska"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                    Miasto *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2"
                    style={{ backgroundColor: '#FFFFFF', borderColor: '#D4AF37', color: '#0A1A2F' }}
                    placeholder="np. Warszawa"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                    Ocena (gwiazdki) *
                  </label>
                  <select
                    value={formData.stars}
                    onChange={(e) => setFormData({ ...formData, stars: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg border-2"
                    style={{ backgroundColor: '#FFFFFF', borderColor: '#D4AF37', color: '#0A1A2F' }}
                    required
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 gwiazdek)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 gwiazdki)</option>
                    <option value={3}>⭐⭐⭐ (3 gwiazdki)</option>
                    <option value={2}>⭐⭐ (2 gwiazdki)</option>
                    <option value={1}>⭐ (1 gwiazdka)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                  Treść Opinii *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border-2"
                  style={{ backgroundColor: '#FFFFFF', borderColor: '#D4AF37', color: '#0A1A2F' }}
                  placeholder="Wpisz treść opinii klienta..."
                  required
                />
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
                    Niższe liczby wyświetlają się jako pierwsze
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
                      Widoczna publicznie
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
                  {editingTestimonial ? 'Zapisz Zmiany' : 'Dodaj Opinię'}
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
          <li>• Opinie są wyświetlane na stronie głównej w sekcji "Co mówią nasi klienci"</li>
          <li>• Możesz ukryć opinię bez usuwania - użyj przycisku widoczności</li>
          <li>• Kolejność wyświetlania kontroluje, które opinie pojawiają się jako pierwsze</li>
          <li>• Zmiany są natychmiast widoczne na stronie publicznej</li>
        </ul>
      </div>
    </div>
  );
};

export default TestimonialsAdmin;