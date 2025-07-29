import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ServicesCurrencyPage from './pages/ServicesCurrencyPage';
import ServicesSKDPage from './pages/ServicesSKDPage';
import KnowledgeBasePage from './pages/KnowledgeBasePage';
import FAQPage from './pages/FAQPage';

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
      </Routes>
    </div>
  );
}

export default App;