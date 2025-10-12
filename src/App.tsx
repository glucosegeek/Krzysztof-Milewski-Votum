import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useStickyButtonVisibility } from './context/StickyButtonVisibilityContext';
import { ConsultationModalProvider } from './context/ConsultationModalContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyContactButton from './components/StickyContactButton';
import ConsultationModal from './components/ConsultationModal';
import HomePage from './pages/HomePage';
import ServicesCurrencyPage from './pages/ServicesCurrencyPage';
import ServicesSKDPage from './pages/ServicesSKDPage';
import KnowledgeBasePage from './pages/KnowledgeBasePage';
import NewsPage from './pages/NewsPage';
import FAQPage from './pages/FAQPage';
import AboutMePage from './pages/AboutMePage';
import WygraneSsprawyPage from './pages/WygraneSsprawyPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ContactSection from './components/ContactSection';

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

  return (
    <div className="min-h-screen">
      <ConsultationModalProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/currency" element={<ServicesCurrencyPage />} />
          <Route path="/services/skd" element={<ServicesSKDPage />} />
          <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/wygrane-sprawy" element={<WygraneSsprawyPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
           <Route path="/about-me" element={<AboutMePage />} />
          <Route path="/contact-section" element={<ContactSection />} />
        </Routes>
        <Footer registerFooterSection={registerFooterSection} />
        <StickyContactButton />
        <ConsultationModal />
      </ConsultationModalProvider>
    </div>
  );
}

export default App;