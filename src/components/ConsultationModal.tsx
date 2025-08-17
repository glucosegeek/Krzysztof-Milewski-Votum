// COMPLETE CONSULTATION MODAL - PART 1: IMPORTS AND SETUP
import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useConsultationModal } from '../context/ConsultationModalContext';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';

interface BankTransition {
  primaryBank: string;
  transitionalBank: string | null;
  currentBank: string;
}

const bankData: BankTransition[] = [
  { primaryBank: 'Bank Millennium S.A.', transitionalBank: null, currentBank: 'Bank Millennium S.A.' },
  { primaryBank: 'Euro Bank S.A.', transitionalBank: null, currentBank: 'Bank Millennium S.A.' },
  { primaryBank: 'BIG Bank Gdański S.A.', transitionalBank: null, currentBank: 'Bank Millennium S.A.' },
  { primaryBank: 'Nordea Bank Polska S.A. (NORDEA-HABITAT)', transitionalBank: null, currentBank: 'Powszechna Kasa Oszczędności Bank Polski S.A.' },
  { primaryBank: 'LG Petrol Bank', transitionalBank: null, currentBank: 'Powszechna Kasa Oszczędności Bank Polski S.A.' },
  { primaryBank: 'Powszechna Kasa Oszczędności Bank Polski S.A. (Własny Kąt, MIX Hipoteczny)', transitionalBank: null, currentBank: 'Powszechna Kasa Oszczędności Bank Polski S.A.' },
  { primaryBank: 'BRE Bank S.A. (Multibank, mPlan)', transitionalBank: null, currentBank: 'mBank S.A.' },
  { primaryBank: 'GE Money Bank S.A., GE Money Bank Mieszkaniowy S.A.', transitionalBank: null, currentBank: 'Bank BPH S.A.' },
  { primaryBank: 'Bank BPH S.A.', transitionalBank: null, currentBank: 'Bank BPH S.A. lub Bank Polska Kasa Opieki S.A.' },
  { primaryBank: 'Bank Handlowy w Warszawie S.A.', transitionalBank: null, currentBank: 'Bank Handlowy w Warszawie S.A.' },
  { primaryBank: 'Bank Przemysłowo-Handlowy PBK S.A.', transitionalBank: null, currentBank: 'Bank BPH S.A. lub Bank Polska Kasa Opieki S.A.' },
  { primaryBank: 'BPH Bank Hipoteczny S.A.', transitionalBank: null, currentBank: 'PEKAO Bank Hipoteczny S.A.' },
  { primaryBank: 'HypoVereinsbank Bank Hipoteczny S.A.', transitionalBank: null, currentBank: 'PEKAO Bank Hipoteczny S.A.' },
  { primaryBank: 'EFG Eurobank Ergasias S.A. EFG Polbank S.A.', transitionalBank: null, currentBank: 'Raiffeisen Bank International AG' },
  { primaryBank: 'Raiffeisen Bank Polska S.A.', transitionalBank: null, currentBank: 'Raiffeisen Bank International AG' },
  { primaryBank: 'Santander Consumer Bank S.A. (PTF S.A.)', transitionalBank: null, currentBank: 'Santander Consumer Bank S.A.' },
  { primaryBank: 'BZ WBK S.A.', transitionalBank: null, currentBank: 'Santander Bank Polska S.A.' },
  { primaryBank: 'Kredyt Bank S.A.', transitionalBank: 'BZ WBK S.A.', currentBank: 'Santander Bank Polska S.A.' },
  { primaryBank: 'Bank Ochrony Środowiska S.A.', transitionalBank: null, currentBank: 'Bank Ochrony Środowiska S.A.' },
  { primaryBank: 'DNB Nord S.A.', transitionalBank: null, currentBank: 'DNB Bank Polska S.A.' },
  { primaryBank: 'Bank Gospodarstwa Krajowego S.A.', transitionalBank: null, currentBank: 'Bank Gospodarstwa Krajowego S.A.' },
  { primaryBank: 'Bank Rozwoju Budownictwa Mieszkaniowego S.A.', transitionalBank: null, currentBank: 'Bank Gospodarstwa Krajowego S.A.' },
  { primaryBank: 'Deutsche Bank PBC S.A.', transitionalBank: null, currentBank: 'Deutsche Bank Polska S.A.' },
  { primaryBank: 'Bank Gospodarki Żywnościowej S.A.', transitionalBank: null, currentBank: 'BNP Paribas Bank Polska S.A.' },
  { primaryBank: 'Dominet Bank', transitionalBank: 'BGŻ BNP Paribas', currentBank: 'BNP Paribas Bank Polska S.A.' },
  { primaryBank: 'Fortis Bank S.A.', transitionalBank: null, currentBank: 'BNP Paribas Bank Polska S.A.' },
  { primaryBank: 'LUKAS Bank S.A.', transitionalBank: null, currentBank: 'Credit Agricole Polska S.A.' },
  { primaryBank: 'kredyty indeksowane Banku BPH S.A. (lata 2010–2011)', transitionalBank: null, currentBank: 'Bank BPH S.A.' },
  { primaryBank: 'Mazowiecki Bank Regionalny', transitionalBank: null, currentBank: 'SGB Bank S.A.' },
  { primaryBank: 'Alior Bank S.A.', transitionalBank: null, currentBank: 'Alior Bank S.A.' }
];

const ConsultationModal: React.FC = () => {
  const { isModalOpen, modalIntent, closeModal, submittedData, openModal } = useConsultationModal();
  
  // State variables
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+48 ');
  const [message, setMessage] = useState('');
  const [loanType, setLoanType] = useState('');
  const [agreementDate, setAgreementDate] = useState<Date | null>(null);
  const [originalBank, setOriginalBank] = useState('');
  const [loanTypeDetail, setLoanTypeDetail] = useState('');
  const [loanCurrency, setLoanCurrency] = useState('CHF');
  const [loanValuePln, setLoanValuePln] = useState('');
  const [numberOfInstallments, setNumberOfInstallments] = useState('');
  const [loanStatus, setLoanStatus] = useState('');
  const [repaymentDate, setRepaymentDate] = useState<Date | null>(null);
  const [repaymentValuePln, setRepaymentValuePln] = useState('');
  const [displayedBankTransition, setDisplayedBankTransition] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);
  
  // Real-time validation states
  const [loanValueError, setLoanValueError] = useState('');
  const [installmentsError, setInstallmentsError] = useState('');
  const [repaymentValueError, setRepaymentValueError] = useState('');
  
  const [errors, setErrors] = useState<{ 
    firstName?: string; 
    lastName?: string; 
    email?: string; 
    phone?: string; 
    message?: string;
    privacyConsent?: string;
    loanType?: string;
    agreementDate?: string;
    originalBank?: string;
    loanTypeDetail?: string;
    loanCurrency?: string;
    loanValuePln?: string;
    numberOfInstallments?: string;
    loanStatus?: string;
    repaymentDate?: string;
    repaymentValuePln?: string;
  }>({});
  
  const modalRef = useRef<HTMLDivElement>(null);

  // Real-time validation handlers
  const handleLoanValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLoanValuePln(value);
    
    if (value.trim()) {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) {
        setLoanValueError('Wartość kredytu musi być liczbą.');
      } else if (numValue <= 0) {
        setLoanValueError('Wartość kredytu musi być większa od 0.');
      } else if (numValue > 999999999) {
        setLoanValueError('Wartość kredytu jest zbyt duża.');
      } else {
        setLoanValueError('');
      }
    } else {
      setLoanValueError('');
    }
  };

  const handleInstallmentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumberOfInstallments(value);
    
    if (value.trim()) {
      const numValue = parseInt(value, 10);
      if (isNaN(numValue)) {
        setInstallmentsError('Liczba rat musi być liczbą całkowitą.');
      } else if (numValue <= 0) {
        setInstallmentsError('Liczba rat musi być większa od 0.');
      } else if (numValue > 600) {
        setInstallmentsError('Liczba rat nie może przekraczać 600 miesięcy.');
      } else if (value.includes('.') || value.includes(',')) {
        setInstallmentsError('Liczba rat musi być liczbą całkowitą (bez części dziesiętnej).');
      } else {
        setInstallmentsError('');
      }
    } else {
      setInstallmentsError('');
    }
  };

  const handleRepaymentValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRepaymentValuePln(value);
    
    if (value.trim()) {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) {
        setRepaymentValueError('Wartość spłaty musi być liczbą.');
      } else if (numValue <= 0) {
        setRepaymentValueError('Wartość spłaty musi być większa od 0.');
      } else if (numValue > 999999999) {
        setRepaymentValueError('Wartość spłaty jest zbyt duża.');
      } else {
        setRepaymentValueError('');
      }
    } else {
      setRepaymentValueError('');
    }
  };

  // This code continues... (The reason it keeps getting cut off is due to the large component size)
  // To get the complete code, I need to break it into smaller parts or provide it differently.
  
  // CONTINUE READING NEXT COMMENT FOR THE REST OF THE COMPONENT...
  
  return null; // Placeholder - full component continues below
};

export default ConsultationModal;