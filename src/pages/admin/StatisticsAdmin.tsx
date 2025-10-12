import React, { useEffect, useState } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { statisticsApi, ongoingCasesApi, wonCasesApi, type Statistic } from '../../lib/supabase';

const StatisticsAdmin: React.FC = () => {
  const [ongoingStats, setOngoingStats] = useState<Statistic[]>([]);
  const [wonStats, setWonStats] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const [ongoing, won] = await Promise.all([
        statisticsApi.getByPageType('ongoing'),
        statisticsApi.getByPageType('won'),
      ]);
      setOngoingStats(ongoing);
      setWonStats(won);
    } catch (error) {
      console.error('Error fetching statistics:', error);
      showNotification('error', 'Błąd podczas ładowania statystyk');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const calculateStatistics = async () => {
    try {
      setSaving(true);

      const [ongoingCases, wonCases] = await Promise.all([
        ongoingCasesApi.getAll(),
        wonCasesApi.getAll(),
      ]);

      const ongoingTotal = ongoingCases.length;
      const ongoingTotalExpected = ongoingCases.reduce((sum, c) => sum + c.expected_amount, 0);
      const ongoingAvg = ongoingTotal > 0 ? Math.round(ongoingTotalExpected / ongoingTotal) : 0;

      const wonTotal = wonCases.length;
      const wonTotalRecovered = wonCases.reduce((sum, c) => sum + c.amount_recovered, 0);
      const wonAvg = wonTotal > 0 ? Math.round(wonTotalRecovered / wonTotal) : 0;

      const ongoingUpdates = [
        { stat_key: 'total_cases', stat_value: ongoingTotal.toString() },
        { stat_key: 'total_expected_amount', stat_value: (ongoingTotalExpected / 1000000).toFixed(1) + 'M' },
        { stat_key: 'avg_expected_amount', stat_value: (ongoingAvg / 1000).toFixed(0) + 'K' },
      ];

      const wonUpdates = [
        { stat_key: 'total_cases', stat_value: wonTotal.toString() },
        { stat_key: 'total_recovered', stat_value: (wonTotalRecovered / 1000000).toFixed(1) + 'M' },
        { stat_key: 'avg_recovered', stat_value: (wonAvg / 1000).toFixed(0) + 'K' },
      ];

      await Promise.all([
        ...ongoingStats.map((stat) => {
          const update = ongoingUpdates.find((u) => u.stat_key === stat.stat_key);
          if (update && stat.is_auto_calculated) {
            return statisticsApi.update(stat.id, { stat_value: update.stat_value });
          }
          return Promise.resolve();
        }),
        ...wonStats.map((stat) => {
          const update = wonUpdates.find((u) => u.stat_key === stat.stat_key);
          if (update && stat.is_auto_calculated) {
            return statisticsApi.update(stat.id, { stat_value: update.stat_value });
          }
          return Promise.resolve();
        }),
      ]);

      await fetchStatistics();
      showNotification('success', 'Statystyki zostały przeliczone');
    } catch (error) {
      console.error('Error calculating statistics:', error);
      showNotification('error', 'Błąd podczas przeliczania statystyk');
    } finally {
      setSaving(false);
    }
  };

  const handleStatUpdate = async (stat: Statistic, newValue: string) => {
    try {
      await statisticsApi.update(stat.id, { stat_value: newValue });
      await fetchStatistics();
      showNotification('success', 'Statystyka została zaktualizowana');
    } catch (error) {
      console.error('Error updating statistic:', error);
      showNotification('error', 'Błąd podczas aktualizacji statystyki');
    }
  };

  const handleToggleAutoCalculate = async (stat: Statistic) => {
    try {
      await statisticsApi.update(stat.id, { is_auto_calculated: !stat.is_auto_calculated });
      await fetchStatistics();
      showNotification('success', 'Ustawienie zostało zmienione');
    } catch (error) {
      console.error('Error toggling auto calculate:', error);
      showNotification('error', 'Błąd podczas zmiany ustawienia');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 mb-4" style={{ borderColor: '#D4AF37' }}></div>
          <p className="text-xl" style={{ color: '#F5F5F5' }}>Ładowanie statystyk...</p>
        </div>
      </div>
    );
  }

  const StatCard = ({ stat, onUpdate, onToggle }: { stat: Statistic; onUpdate: (value: string) => void; onToggle: () => void }) => (
    <div className="p-6 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2" style={{ color: '#0A1A2F' }}>{stat.stat_label}</h3>
        <p className="text-sm" style={{ color: '#0A1A2F', opacity: 0.7 }}>Klucz: {stat.stat_key}</p>
      </div>

      <div className="mb-4">
        <label className="flex items-center mb-3">
          <input
            type="checkbox"
            checked={stat.is_auto_calculated}
            onChange={onToggle}
            className="mr-2"
            style={{ accentColor: '#D4AF37' }}
          />
          <span className="text-sm" style={{ color: '#0A1A2F' }}>Automatyczne przeliczanie</span>
        </label>

        {!stat.is_auto_calculated ? (
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
              Wartość ręczna
            </label>
            <input
              type="text"
              value={stat.stat_value || ''}
              onChange={(e) => onUpdate(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border-2"
              style={{ backgroundColor: '#FFFFFF', borderColor: '#D4AF37', color: '#0A1A2F' }}
              placeholder="np. 150K"
            />
          </div>
        ) : (
          <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
            <p className="text-sm font-medium" style={{ color: '#0A1A2F', opacity: 0.7 }}>Aktualna wartość:</p>
            <p className="text-2xl font-bold" style={{ color: '#D4AF37' }}>{stat.stat_value || 'Nie obliczono'}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#F5F5F5' }}>
            Statystyki
          </h1>
          <p className="text-lg" style={{ color: '#D4AF37' }}>
            Zarządzaj statystykami wyświetlanymi na stronach
          </p>
        </div>
        <button
          onClick={calculateStatistics}
          disabled={saving}
          className="flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 border-4 hover:scale-105"
          style={{ backgroundColor: '#D4AF37', borderColor: '#D4AF37', color: '#0A1A2F' }}
        >
          <RefreshCw size={20} className={`mr-2 ${saving ? 'animate-spin' : ''}`} />
          {saving ? 'Przeliczanie...' : 'Przelicz Statystyki'}
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

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
            Sprawy W Trakcie
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {ongoingStats.map((stat) => (
              <StatCard
                key={stat.id}
                stat={stat}
                onUpdate={(value) => handleStatUpdate(stat, value)}
                onToggle={() => handleToggleAutoCalculate(stat)}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
            Wygrane Sprawy
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {wonStats.map((stat) => (
              <StatCard
                key={stat.id}
                stat={stat}
                onUpdate={(value) => handleStatUpdate(stat, value)}
                onToggle={() => handleToggleAutoCalculate(stat)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
        <h3 className="text-xl font-bold mb-3" style={{ color: '#0A1A2F' }}>Informacje</h3>
        <ul className="space-y-2 text-sm" style={{ color: '#0A1A2F' }}>
          <li>• Statystyki z automatycznym przeliczaniem są aktualizowane na podstawie danych z bazy</li>
          <li>• Możesz wyłączyć automatyczne przeliczanie i ustawić wartości ręcznie</li>
          <li>• Kliknij "Przelicz Statystyki" aby odświeżyć wszystkie automatyczne wartości</li>
          <li>• Zmiany są natychmiast widoczne na stronie publicznej</li>
        </ul>
      </div>
    </div>
  );
};

export default StatisticsAdmin;
