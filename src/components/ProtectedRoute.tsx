import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 mb-4" style={{ borderColor: '#D4AF37' }}></div>
          <p className="text-xl" style={{ color: '#F5F5F5' }}>Ładowanie...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="text-center max-w-md mx-auto p-8 rounded-lg" style={{ backgroundColor: '#1A2942' }}>
          <h1 className="text-2xl font-bold mb-4" style={{ color: '#D4AF37' }}>Brak dostępu</h1>
          <p className="mb-6" style={{ color: '#F5F5F5' }}>
            Nie masz uprawnień administratora do przeglądania tej strony.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 rounded-lg font-medium transition-colors"
            style={{ backgroundColor: '#D4AF37', color: '#0A1A2F' }}
          >
            Wróć do strony głównej
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
