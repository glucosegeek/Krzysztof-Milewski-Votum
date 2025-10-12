import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';
import { wonCasesApi, type WonCase } from '../../lib/supabase';

const WonCasesAdmin: React.FC = () => {
  const [cases, setCases] = useState<WonCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCase, setEditingCase] = useState<WonCase | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [formData, setFormData] = useState({
    case_type: '',
    amount_recovered: '',
    date_won: '',
    description: '',
    client_location: '',
  });

  const caseTypes = [
    'Kredyt walutowy CHF',
    'Kredyt walutowy EUR',
    'Kredyt walutowy USD',
    'Kredyt SKD',
  ];

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const data = await wonCasesApi.getAll();
      setCases(data);
    } catch (error) {
      console.error('Error fetching cases:', error);
      showNotification('error', 'Błąd podczas ładowania spraw');
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
      const caseData = {
        ...formData,
        amount_recovered: parseFloat(formData.amount_recovered),
      };

      if (editingCase) {
        await wonCasesApi.update(editingCase.id, caseData);
        showNotification('success', 'Sprawa została zaktualizowana');
      } else {
        await wonCasesApi.create(caseData);
        showNotification('success', 'Sprawa została dodana');
      }

      await fetchCases();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving case:', error);
      showNotification('error', 'Błąd podczas zapisywania sprawy');
    }
  };

  const handleEdit = (caseItem: WonCase) => {
    setEditingCase(caseItem);
    setFormData({
      case_type: caseItem.case_type,
      amount_recovered: caseItem.amount_recovered.toString(),
      date_won: caseItem.date_won,
      description: caseItem.description,
      client_location: caseItem.client_location,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await wonCasesApi.delete(id);
      showNotification('success', 'Sprawa została usunięta');
      await fetchCases();
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting case:', error);
      showNotification('error', 'Błąd podczas usuwania sprawy');
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCase(null);
    setFormData({
      case_type: '',
      amount_recovered: '',
      date_won: '',
      description: '',
      client_location: '',
    });
  };

  const filteredCases = cases.filter((c) =>
    c.case_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.client_location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#F5F5F5' }}>
            Wygrane Sprawy
          </h1>
          <p className="text-lg" style={{ color: '#D4AF37' }}>
            Zarządzaj wyg ranymi sprawami
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 border-4 hover:scale-105"
          style={{ backgroundColor: '#D4AF37', borderColor: '#D4AF37', color: '#0A1A2F' }}
        >
          <Plus size={20} className="mr-2" />
          Dodaj Sprawę
        </button>
      </div>

      {notification && (
        <div
          className="mb-6 p-4 rounded-lg border-2"
          style={{
            backgroundColor: notification.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
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
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: '#0A1A2F', opacity: 0.5 }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Szukaj po typie sprawy lub lokalizacji..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border-2"
            style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 mb-4" style={{ borderColor: '#D4AF37' }}></div>
          <p className="text-xl" style={{ color: '#F5F5F5' }}>Ładowanie spraw...</p>
        </div>
      ) : (
        <div className="rounded-2xl shadow-xl border-4 overflow-hidden" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: '#0A1A2F' }}>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#F5F5F5' }}>Typ Sprawy</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#F5F5F5' }}>Lokalizacja</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#F5F5F5' }}>Data Wygranej</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#F5F5F5' }}>Odzyskana Kwota</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold" style={{ color: '#F5F5F5' }}>Akcje</th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((caseItem, index) => (
                  <tr
                    key={caseItem.id}
                    className="border-t-2"
                    style={{ borderColor: 'rgba(10, 26, 47, 0.1)', backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F5F5F5' }}
                  >
                    <td className="px-6 py-4" style={{ color: '#0A1A2F' }}>{caseItem.case_type}</td>
                    <td className="px-6 py-4" style={{ color: '#0A1A2F' }}>{caseItem.client_location}</td>
                    <td className="px-6 py-4" style={{ color: '#0A1A2F' }}>{new Date(caseItem.date_won).toLocaleDateString('pl-PL')}</td>
                    <td className="px-6 py-4 font-bold" style={{ color: '#D4AF37' }}>{caseItem.amount_recovered.toLocaleString('pl-PL')} PLN</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(caseItem)}
                          className="p-2 rounded-lg transition-all hover:scale-110"
                          style={{ backgroundColor: '#D4AF37', color: '#0A1A2F' }}
                          title="Edytuj"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(caseItem.id)}
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
            {filteredCases.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl" style={{ color: '#0A1A2F' }}>Brak spraw do wyświetlenia</p>
              </div>
            )}
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl border-4 p-8" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{ color: '#0A1A2F' }}>
                {editingCase ? 'Edytuj Sprawę' : 'Dodaj Nową Sprawę'}
              </h2>
              <button onClick={handleCloseForm} style={{ color: '#0A1A2F' }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                  Typ Sprawy *
                </label>
                <select
                  value={formData.case_type}
                  onChange={(e) => setFormData({ ...formData, case_type: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2"
                  style={{ backgroundColor: '#FFFFFF', borderColor: '#D4AF37', color: '#0A1A2F' }}
                  required
                >
                  <option value="">Wybierz typ sprawy</option>
                  {caseTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                    Data Wygranej *
                  </label>
                  <input
                    type="date"
                    value={formData.date_won}
                    onChange={(e) => setFormData({ ...formData, date_won: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2"
                    style={{ backgroundColor: '#FFFFFF', borderColor: '#D4AF37', color: '#0A1A2F' }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                    Odzyskana Kwota (PLN) *
                  </label>
                  <input
                    type="number"
                    value={formData.amount_recovered}
                    onChange={(e) => setFormData({ ...formData, amount_recovered: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2"
                    style={{ backgroundColor: '#FFFFFF', borderColor: '#D4AF37', color: '#0A1A2F' }}
                    placeholder="np. 250000"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                  Lokalizacja Klienta *
                </label>
                <input
                  type="text"
                  value={formData.client_location}
                  onChange={(e) => setFormData({ ...formData, client_location: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2"
                  style={{ backgroundColor: '#FFFFFF', borderColor: '#D4AF37', color: '#0A1A2F' }}
                  placeholder="np. Warszawa"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                  Szczegółowy Opis *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 resize-vertical"
                  style={{ backgroundColor: '#FFFFFF', borderColor: '#D4AF37', color: '#0A1A2F' }}
                  placeholder="Szczegółowy opis sprawy..."
                  rows={4}
                  required
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 px-6 rounded-lg font-medium transition-all hover:scale-105 border-4"
                  style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37', color: '#F5F5F5' }}
                >
                  {editingCase ? 'Zapisz Zmiany' : 'Dodaj Sprawę'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="flex-1 py-3 px-6 rounded-lg font-medium transition-all hover:scale-105 border-4"
                  style={{ backgroundColor: 'transparent', borderColor: '#D4AF37', color: '#0A1A2F' }}
                >
                  Anuluj
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-md w-full rounded-2xl shadow-xl border-4 p-8" style={{ backgroundColor: '#F5F5F5', borderColor: '#ef4444' }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0A1A2F' }}>
              Potwierdź Usunięcie
            </h2>
            <p className="mb-6" style={{ color: '#0A1A2F' }}>
              Czy na pewno chcesz usunąć tę sprawę? Ta operacja jest nieodwracalna.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-3 px-6 rounded-lg font-medium transition-all hover:scale-105"
                style={{ backgroundColor: '#ef4444', color: '#FFFFFF' }}
              >
                Usuń
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-3 px-6 rounded-lg font-medium transition-all hover:scale-105 border-2"
                style={{ backgroundColor: 'transparent', borderColor: '#0A1A2F', color: '#0A1A2F' }}
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WonCasesAdmin;
