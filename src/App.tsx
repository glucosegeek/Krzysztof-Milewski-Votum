import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useStickyButtonVisibility } from './context/StickyButtonVisibilityContext';
import { ConsultationModalProvider } from './context/ConsultationModalContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyContactButton from './components/StickyContactButton';
import ConsultationModal from './components/ConsultationModal';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import HomePage from './pages/HomePage';
import ServicesCurrencyPage from './pages/ServicesCurrencyPage';
import ServicesSKDPage from './pages/ServicesSKDPage';
import KnowledgeBasePage from './pages/KnowledgeBasePage';
import NewsPage from './pages/NewsPage';
import FAQPage from './pages/FAQPage';
import AboutMePage from './pages/AboutMePage';
import WygraneSsprawyPage from './pages/WygraneSsprawyPage';
import WTrakcePage from './pages/WTrakcePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ContactSection from './components/ContactSection';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import OngoingCasesAdmin from './pages/admin/OngoingCasesAdmin';
import WonCasesAdmin from './pages/admin/WonCasesAdmin';
import StatisticsAdmin from './pages/admin/StatisticsAdmin';
import ManageAdminsPage from './pages/admin/ManageAdminsPage';
import TestimonialsAdmin from './pages/admin/TestimonialsAdmin';
import NewsAdmin from './pages/admin/NewsAdmin';
import KnowledgeBaseAdmin from './pages/admin/KnowledgeBaseAdmin';

function App() {
  const { registerFooterSection } = useStickyButtonVisibility();
  const location = useLocation();

useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Optional: scroll to top on page change if no hash
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]); // Re-run when location changes

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <div className="min-h-screen">
        <ConsultationModalProvider>
          <Routes>
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="ongoing-cases" element={<OngoingCasesAdmin />} />
              <Route path="won-cases" element={<WonCasesAdmin />} />
              <Route path="statistics" element={<StatisticsAdmin />} />
              <Route path="testimonials" element={<TestimonialsAdmin />} />
              <Route path="news" element={<NewsAdmin />} />
              <Route path="knowledge-base" element={<KnowledgeBaseAdmin />} />
              <Route path="manage-admins" element={<ManageAdminsPage />} />
            </Route>

            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/services/currency" element={<ServicesCurrencyPage />} />
                    <Route path="/services/skd" element={<ServicesSKDPage />} />
                    <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/wygrane-sprawy" element={<WygraneSsprawyPage />} />
                    <Route path="/wygrane-sprawy/w-trakcie" element={<WTrakcePage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                    <Route path="/about-me" element={<AboutMePage />} />
                    <Route path="/contact-section" element={<ContactSection />} />
                  </Routes>
                  <Footer registerFooterSection={registerFooterSection} />
                  <StickyContactButton />
                  <ConsultationModal />
                </>
              }
            />
          </Routes>
        </ConsultationModalProvider>
      </div>
    </AuthProvider>
  );
}

export default App;