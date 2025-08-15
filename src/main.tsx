import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StickyButtonVisibilityProvider } from './context/StickyButtonVisibilityContext';
import App from './App.tsx';
import './index.css';
import 'react-datepicker/dist/react-datepicker.css';
import { pl } from 'date-fns/locale';
import { registerLocale } from 'react-datepicker';

// Register Polish locale for react-datepicker
registerLocale('pl', pl);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <StickyButtonVisibilityProvider>
        <App />
      </StickyButtonVisibilityProvider>
    </BrowserRouter>
  </StrictMode>
);
