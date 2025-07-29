import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface StickyButtonVisibilityContextType {
  showButton: boolean;
  registerHeroSection: (element: HTMLElement | null) => void;
}

const StickyButtonVisibilityContext = createContext<StickyButtonVisibilityContextType | undefined>(undefined);

export const useStickyButtonVisibility = () => {
  const context = useContext(StickyButtonVisibilityContext);
  if (context === undefined) {
    throw new Error('useStickyButtonVisibility must be used within a StickyButtonVisibilityProvider');
  }
  return context;
};

interface StickyButtonVisibilityProviderProps {
  children: ReactNode;
}

export const StickyButtonVisibilityProvider: React.FC<StickyButtonVisibilityProviderProps> = ({ children }) => {
  const [showButton, setShowButton] = useState(true);
  const [heroElement, setHeroElement] = useState<HTMLElement | null>(null);
  const location = useLocation();

  const registerHeroSection = (element: HTMLElement | null) => {
    setHeroElement(element);
  };

  useEffect(() => {
    // Always show button on non-home pages
    if (location.pathname !== '/') {
      setShowButton(true);
      return;
    }

    // If we're on home page but no hero element is registered yet, hide button
    if (!heroElement) {
      setShowButton(false);
      return;
    }

    // Set up intersection observer for hero section
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // Show button when hero section is NOT intersecting (not visible)
        setShowButton(!entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of hero section is visible
        rootMargin: '-50px 0px 0px 0px' // Add some margin to trigger slightly before/after
      }
    );

    observer.observe(heroElement);

    return () => {
      observer.disconnect();
    };
  }, [heroElement, location.pathname]);

  return (
    <StickyButtonVisibilityContext.Provider value={{ showButton, registerHeroSection }}>
      {children}
    </StickyButtonVisibilityContext.Provider>
  );
};