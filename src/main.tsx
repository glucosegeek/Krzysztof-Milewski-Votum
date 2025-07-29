import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StickyButtonVisibilityProvider } from './context/StickyButtonVisibilityContext';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <StickyButtonVisibilityProvider>
        <App />
      </StickyButtonVisibilityProvider>
    </BrowserRouter>
  </StrictMode>
);
