import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Trophy, BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';
import { ongoingCasesApi, wonCasesApi } from '../../lib/supabase';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    ongoingCases: 0,
    wonCases: 0,
    totalExpected: 0,
    totalRecovered: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ongoing, won] = await Promise.all([
          ongoingCasesApi.getAll(),
          wonCasesApi.getAll(),
        ]);

        const totalExpected = ongoing.reduce((sum, c) => sum + c.expected_amount, 0);
        const totalRecovered = won.reduce((sum, c) => sum + c.amount_recovered, 0);

        setStats({
          ongoingCases: ongoing.length,
          wonCases: won.length,
          totalExpected,
          totalRecovered,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: 'Sprawy W Trakcie',
      value: stats.ongoingCases,
      icon: Clock,
      link: '/admin/ongoing-cases',
      color: '#D4AF37',
    },
    {
      title: 'Wygrane Sprawy',
      value: stats.wonCases,
      icon: Trophy,
      link: '/admin/won-cases',
      color: '#D4AF37',
    },
    {
      title: 'Oczekiwana Kwota',
      value: `${(stats.totalExpected / 1000000).toFixed(1)}M PLN`,
      icon: TrendingUp,
      link: '/admin/ongoing-cases',
      color: '#D4AF37',
    },
    {
      title: 'Odzyskane Środki',
      value: `${(stats.totalRecovered / 1000000).toFixed(1)}M PLN`,
      icon: DollarSign,
      link: '/admin/won-cases',
      color: '#D4AF37',
    },
  ];

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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#F5F5F5' }}>
          Dashboard
        </h1>
        <p className="text-lg" style={{ color: '#D4AF37' }}>
          Przegląd systemu zarządzania sprawami
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.link}
              className="p-6 rounded-2xl shadow-xl border-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ backgroundColor: '#F5F5F5', borderColor: card.color }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: card.color }}>
                  <Icon size={24} style={{ color: '#0A1A2F' }} />
                </div>
              </div>
              <p className="text-sm font-medium mb-1" style={{ color: '#0A1A2F', opacity: 0.7 }}>
                {card.title}
              </p>
              <p className="text-3xl font-bold" style={{ color: '#0A1A2F' }}>
                {card.value}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
          <h2 className="text-2xl font-bold mb-4 flex items-center" style={{ color: '#0A1A2F' }}>
            <Clock size={24} className="mr-2" style={{ color: '#D4AF37' }} />
            Szybkie Akcje
          </h2>
          <div className="space-y-3">
            <Link
              to="/admin/ongoing-cases"
              className="block p-4 rounded-lg border-2 transition-all hover:scale-105"
              style={{ borderColor: '#D4AF37', color: '#0A1A2F' }}
            >
              <p className="font-medium">Dodaj nową sprawę w trakcie</p>
            </Link>
            <Link
              to="/admin/won-cases"
              className="block p-4 rounded-lg border-2 transition-all hover:scale-105"
              style={{ borderColor: '#D4AF37', color: '#0A1A2F' }}
            >
              <p className="font-medium">Dodaj wygraną sprawę</p>
            </Link>
            <Link
              to="/admin/statistics"
              className="block p-4 rounded-lg border-2 transition-all hover:scale-105"
              style={{ borderColor: '#D4AF37', color: '#0A1A2F' }}
            >
              <p className="font-medium">Zarządzaj statystykami</p>
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
          <h2 className="text-2xl font-bold mb-4 flex items-center" style={{ color: '#0A1A2F' }}>
            <BarChart3 size={24} className="mr-2" style={{ color: '#D4AF37' }} />
            Informacje
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
              <p className="text-sm font-medium mb-1" style={{ color: '#0A1A2F', opacity: 0.7 }}>
                System CMS
              </p>
              <p className="font-medium" style={{ color: '#0A1A2F' }}>
                Wszystkie zmiany są automatycznie synchronizowane z witryną publiczną.
              </p>
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
              <p className="text-sm font-medium mb-1" style={{ color: '#0A1A2F', opacity: 0.7 }}>
                Bezpieczeństwo
              </p>
              <p className="font-medium" style={{ color: '#0A1A2F' }}>
                Wszystkie operacje są zabezpieczone i logowane.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
