import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ConsultationModalContextType {
  isModalOpen: boolean;
  modalIntent: string | null;
  openModal: (data?: {
    name: string;
    email: string;
    phone: string;
    message: string;
    privacyConsent: boolean;
    loanType?: string;
    agreementDate?: string;
    homeBank?: string;
    loanTypeDetail?: string;
    loanCurrency?: string;
    loanValuePln?: string;
    numberOfInstallments?: string;
    loanStatus?: string;
    repaymentDate?: string;
    repaymentValuePln?: string;
  }, intent?: string) => void;
  closeModal: () => void;
  submittedData: {
    name: string;
    email: string;
    phone: string;
    message: string;
    privacyConsent: boolean;
    loanType?: string;
    agreementDate?: string;
    homeBank?: string;
    loanTypeDetail?: string;
    loanCurrency?: string;
    loanValuePln?: string;
    numberOfInstallments?: string;
    loanStatus?: string;
    repaymentDate?: string;
    repaymentValuePln?: string;
  } | null;
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
  const [submittedData, setSubmittedData] = useState<any | null>(null);
  const [modalIntent, setModalIntent] = useState<string | null>(null);

  const openModal = (data: any | null = null, intent: string = 'direct_consultation') => {
  if (data) {
    setSubmittedData(data);
  } else {
    setSubmittedData(null); // Clear previous data if opened without data (e.g., from hero button)
  }
  setModalIntent(intent);
  setIsModalOpen(true);
};
  const closeModal = () => {
    setIsModalOpen(false);
    setSubmittedData(null);
    setModalIntent(null);
  };

  return (
    <ConsultationModalContext.Provider value={{ isModalOpen, modalIntent, openModal, closeModal, submittedData }}>
      {children}
    </ConsultationModalContext.Provider>
  );
};