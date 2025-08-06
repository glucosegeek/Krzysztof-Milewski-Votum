import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface StickyButtonVisibilityContextType {
  showButton: boolean;
  registerHeroSection: (element: HTMLElement | null) => void;
  registerFooterSection: (element: HTMLElement | null) => void;
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
  const [footerElement, setFooterElement] = useState<HTMLElement | null>(null);
  const location = useLocation();

  const registerHeroSection = (element: HTMLElement | null) => {
    setHeroElement(element);
  };

  const registerFooterSection = (element: HTMLElement | null) => {
    setFooterElement(element);
  };

  useEffect(() => {
    let heroIntersecting = false;
    let footerIntersecting = false;

    const updateButtonVisibility = () => {
      // Hide button if hero is intersecting (home page only) OR footer is intersecting (any page)
      const shouldHide = (location.pathname === '/' && heroIntersecting) || footerIntersecting;
      setShowButton(!shouldHide);
    };

    // Set up intersection observer for hero section (home page only)
    let heroObserver: IntersectionObserver | null = null;
    if (location.pathname === '/' && heroElement) {
      heroObserver = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          heroIntersecting = entry.isIntersecting;
          updateButtonVisibility();
        },
        {
          threshold: 0.1,
          rootMargin: '-50px 0px 0px 0px'
        }
      );
      heroObserver.observe(heroElement);
    }

    // Set up intersection observer for footer section (all pages)
    let footerObserver: IntersectionObserver | null = null;
    if (footerElement) {
      footerObserver = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          footerIntersecting = entry.isIntersecting;
          updateButtonVisibility();
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );
      footerObserver.observe(footerElement);
    }

    // Initial visibility update
    updateButtonVisibility();

    return () => {
      if (heroObserver) {
        heroObserver.disconnect();
      }
      if (footerObserver) {
        footerObserver.disconnect();
      }
    };
  }, [heroElement, footerElement, location.pathname]);

  return (
    <StickyButtonVisibilityContext.Provider value={{ showButton, registerHeroSection, registerFooterSection }}>
      {children}
    </StickyButtonVisibilityContext.Provider>
  );
};