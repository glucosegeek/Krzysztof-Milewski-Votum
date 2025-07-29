import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ConsultationModalContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ConsultationModalContext = createContext<ConsultationModalContextType | undefined>(undefined);

export const useConsultationModal = () => {
  const context = useContext(ConsultationModalContext);
  if (context === undefined) {
    throw new Error('useConsultationModal must be used within a ConsultationModalProvider');
  }
  return context;
};

interface ConsultationModalProviderProps {
  children: ReactNode;
}

export const ConsultationModalProvider: React.FC<ConsultationModalProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ConsultationModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ConsultationModalContext.Provider>
  );
};