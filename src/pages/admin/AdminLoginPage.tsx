import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Nieprawidłowy email lub hasło');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#0A1A2F' }}>
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
            <Lock size={40} style={{ color: '#0A1A2F' }} />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#F5F5F5' }}>
            Panel Administratora
          </h1>
          <p className="text-lg" style={{ color: '#D4AF37' }}>
            Zaloguj się, aby zarządzać treścią
          </p>
        </div>

        <div className="rounded-2xl shadow-xl border-4 p-8" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={20} style={{ color: '#0A1A2F', opacity: 0.5 }} />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: 'rgba(10, 26, 47, 0.2)',
                    color: '#0A1A2F',
                  }}
                  placeholder="admin@example.com"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                Hasło
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={20} style={{ color: '#0A1A2F', opacity: 0.5 }} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: 'rgba(10, 26, 47, 0.2)',
                    color: '#0A1A2F',
                  }}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff size={20} style={{ color: '#0A1A2F', opacity: 0.5 }} />
                  ) : (
                    <Eye size={20} style={{ color: '#0A1A2F', opacity: 0.5 }} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2"
                  style={{ accentColor: '#D4AF37' }}
                  disabled={loading}
                />
                <span className="text-sm" style={{ color: '#0A1A2F' }}>
                  Zapamiętaj mnie
                </span>
              </label>
            </div>

            {error && (
              <div className="p-4 rounded-lg border-2 border-red-500" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 border-4 flex items-center justify-center ${
                loading
                  ? 'opacity-75 cursor-not-allowed'
                  : 'hover:scale-105 hover:shadow-xl'
              }`}
              style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37', color: '#F5F5F5' }}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Logowanie...
                </>
              ) : (
                <>
                  <LogIn size={20} className="mr-2" />
                  Zaloguj się
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm" style={{ color: '#F5F5F5' }}>
          Zapomniałeś hasła? Skontaktuj się z administratorem systemu.
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
