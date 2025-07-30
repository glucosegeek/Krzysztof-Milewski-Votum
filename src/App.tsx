import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import FAQPage from './pages/FAQPage';
import AboutMePage from './pages/AboutMePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

function App() {
  const { registerFooterSection } = useStickyButtonVisibility();

  return (
    <div className="min-h-screen">
      <ConsultationModalProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/currency" element={<ServicesCurrencyPage />} />
          <Route path="/services/skd" element={<ServicesSKDPage />} />
          <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        </Routes>
        <Footer registerFooterSection={registerFooterSection} />
        <StickyContactButton />
        <ConsultationModal />
      </ConsultationModalProvider>
    </div>
  );
}

export default App;