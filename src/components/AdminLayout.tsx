import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { LogOut, Menu, X, LayoutDashboard, Clock, Trophy, BarChart3, Users, Star, Newspaper } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const { signOut, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Sprawy W Trakcie', href: '/admin/ongoing-cases', icon: Clock },
    { name: 'Wygrane Sprawy', href: '/admin/won-cases', icon: Trophy },
    { name: 'Statystyki', href: '/admin/statistics', icon: BarChart3 },
    { name: 'Opinie Klientów', href: '/admin/testimonials', icon: Star },
    { name: 'Zarządzaj Adminami', href: '/admin/manage-admins', icon: Users },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A1A2F' }}>
      <div className="flex h-screen">
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ backgroundColor: '#0A1A2F', borderRight: '2px solid #D4AF37' }}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b-2" style={{ borderColor: '#D4AF37' }}>
              <h1 className="text-2xl font-bold" style={{ color: '#D4AF37' }}>
                Admin Panel
              </h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden"
                style={{ color: '#F5F5F5' }}
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                      active
                        ? 'shadow-lg'
                        : 'hover:bg-opacity-10 hover:bg-white'
                    }`}
                    style={
                      active
                        ? { backgroundColor: '#D4AF37', color: '#0A1A2F' }
                        : { color: '#F5F5F5' }
                    }
                  >
                    <Icon size={20} className="mr-3" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t-2" style={{ borderColor: '#D4AF37' }}>
              <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                <p className="text-sm font-medium mb-1" style={{ color: '#F5F5F5' }}>
                  Zalogowany jako:
                </p>
                <p className="text-sm truncate" style={{ color: '#D4AF37' }}>
                  {user?.email}
                </p>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-200 border-2 hover:scale-105"
                style={{ backgroundColor: 'transparent', borderColor: '#D4AF37', color: '#F5F5F5' }}
              >
                <LogOut size={20} className="mr-2" />
                Wyloguj się
              </button>
            </div>
          </div>
        </div>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="p-4 border-b-2 lg:hidden" style={{ borderColor: '#D4AF37' }}>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2"
              style={{ color: '#F5F5F5' }}
            >
              <Menu size={24} />
            </button>
          </header>

          <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
