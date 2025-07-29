import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyContactButton from './components/StickyContactButton';
import HomePage from './pages/HomePage';
import ServicesCurrencyPage from './pages/ServicesCurrencyPage';
import ServicesSKDPage from './pages/ServicesSKDPage';
import KnowledgeBasePage from './pages/KnowledgeBasePage';
import FAQPage from './pages/FAQPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/currency" element={<ServicesCurrencyPage />} />
        <Route path="/services/skd" element={<ServicesSKDPage />} />
        <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      </Routes>
      <Footer />
      <StickyContactButton />
    </div>
  );
}

export default App;