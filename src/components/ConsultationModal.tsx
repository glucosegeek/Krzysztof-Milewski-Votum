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
// PART 2: useEffect and Handler Functions

useEffect(() => {
  if (isModalOpen) {
    document.body.style.overflow = 'hidden';
    if (modalIntent !== 'form_submission') {
      const firstInput = modalRef.current?.querySelector('input, textarea') as HTMLElement;
      if (firstInput) {
        firstInput.focus();
      }
    }
  } else {
    document.body.style.overflow = '';
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('+48 ');
    setMessage('');
    setLoanType('');
    setAgreementDate(null);
    setOriginalBank('');
    setLoanTypeDetail('');
    setLoanCurrency('CHF');
    setLoanValuePln('');
    setNumberOfInstallments('');
    setLoanStatus('');
    setRepaymentDate(null);
    setRepaymentValuePln('');
    setPrivacyConsent(false);
    setDisplayedBankTransition('');
    setLoanValueError('');
    setInstallmentsError('');
    setRepaymentValueError('');
    setErrors({});
  }

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  document.addEventListener('keydown', handleEscape);
  return () => {
    document.removeEventListener('keydown', handleEscape);
  };
}, [isModalOpen, closeModal, modalIntent]);

const validate = () => {
  const newErrors: { 
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
  } = {};
  
  if (!firstName.trim()) {
    newErrors.firstName = 'Imię jest obowiązkowe.';
  }
  if (!lastName.trim()) {
    newErrors.lastName = 'Nazwisko jest obowiązkowe.';
  }
  if (!email.trim()) {
    newErrors.email = 'Email jest obowiązkowy.';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = 'Nieprawidłowy format email.';
  }

  const phoneRegex = /^(?:\+48)?(?:[ -]?\d{3}){3}$/;
  const cleanedPhone = phone.replace(/[\s-]/g, '');

  if (!cleanedPhone.trim() || cleanedPhone.trim() === '+48') {
    newErrors.phone = 'Numer telefonu jest obowiązkowy.';
  } else if (!phoneRegex.test(cleanedPhone)) {
    newErrors.phone = 'Nieprawidłowy format numeru telefonu.';
  }

  if (!message.trim()) {
    newErrors.message = 'Wiadomość jest obowiązkowa.';
  }

  if (!privacyConsent) {
    newErrors.privacyConsent = 'Zgoda na przetwarzanie danych jest obowiązkowa.';
  }
  
  if (loanType === 'currency') {
    if (loanValuePln.trim()) {
      const loanValue = parseFloat(loanValuePln);
      if (isNaN(loanValue)) {
        newErrors.loanValuePln = 'Wartość kredytu musi być liczbą.';
      } else if (loanValue <= 0) {
        newErrors.loanValuePln = 'Wartość kredytu musi być większa od 0.';
      } else if (loanValue > 999999999) {
        newErrors.loanValuePln = 'Wartość kredytu jest zbyt duża.';
      }
    }

    if (numberOfInstallments.trim()) {
      const installments = parseInt(numberOfInstallments, 10);
      if (isNaN(installments)) {
        newErrors.numberOfInstallments = 'Liczba rat musi być liczbą całkowitą.';
      } else if (installments <= 0) {
        newErrors.numberOfInstallments = 'Liczba rat musi być większa od 0.';
      } else if (installments > 600) {
        newErrors.numberOfInstallments = 'Liczba rat nie może przekraczać 600 miesięcy.';
      } else if (numberOfInstallments.includes('.') || numberOfInstallments.includes(',')) {
        newErrors.numberOfInstallments = 'Liczba rat musi być liczbą całkowitą (bez części dziesiętnej).';
      }
    }

    if (loanStatus === 'repaid' && repaymentValuePln.trim()) {
      const repaymentValue = parseFloat(repaymentValuePln);
      if (isNaN(repaymentValue)) {
        newErrors.repaymentValuePln = 'Wartość spłaty musi być liczbą.';
      } else if (repaymentValue <= 0) {
        newErrors.repaymentValuePln = 'Wartość spłaty musi być większa od 0.';
      } else if (repaymentValue > 999999999) {
        newErrors.repaymentValuePln = 'Wartość spłaty jest zbyt duża.';
      }
    }
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (validate()) {
    if (modalIntent === 'direct_consultation') {
      const webhookPayload = {
        name: `${firstName} ${lastName}`,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        message: message,
        loanType: loanType,
        agreementDate: agreementDate,
        originalBank: originalBank,
        loanTypeDetail: loanTypeDetail,
        loanCurrency: loanCurrency,
        loanValuePln: loanValuePln,
        numberOfInstallments: numberOfInstallments,
        loanStatus: loanStatus,
        repaymentDate: repaymentDate,
        repaymentValuePln: repaymentValuePln,
        bankTransitionChain: displayedBankTransition,
        privacyConsent: privacyConsent,
        platform: 'web',
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        referrer: document.referrer || 'direct',
        formType: 'consultation_modal',
        source: 'consultation_button'
      };

      fetch('https://n8n.srv948633.hstgr.cloud/webhook/243235be-417h-4446-8h22-52186b5fd6d4', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(webhookPayload)
      }).then(response => {
        if (response.ok) {
          console.log('Consultation webhook sent successfully:', response.status);
        } else {
          console.error('Consultation webhook failed with status:', response.status);
        }
      }).catch(e => {
        console.error('Error sending consultation webhook:', e);
      }).finally(() => {
        window.open('https://calendly.com/krzysztof-milewski-dsa/30-minutowe-spotkanie', '_blank');
        closeModal();
      });
    } else {
      openModal({
        firstName,
        lastName,
        email,
        phone,
        message,
        loanType,
        agreementDate: agreementDate ? agreementDate.toLocaleDateString('pl-PL') : '',
        originalBank,
        loanTypeDetail,
        loanCurrency,
        loanValuePln,
        numberOfInstallments,
        loanStatus,
        repaymentDate: repaymentDate ? repaymentDate.toLocaleDateString('pl-PL') : '',
        repaymentValuePln,
        bankTransitionChain: displayedBankTransition,
        privacyConsent
      }, 'form_submission');
      
      setTimeout(() => {
        closeModal();
      }, 5000);
    }

    // Reset form
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('+48 ');
    setMessage('');
    setLoanType('');
    setAgreementDate(null);
    setOriginalBank('');
    setLoanTypeDetail('');
    setLoanCurrency('CHF');
    setLoanValuePln('');
    setNumberOfInstallments('');
    setLoanStatus('');
    setRepaymentDate(null);
    setRepaymentValuePln('');
    setPrivacyConsent(false);
    setDisplayedBankTransition('');
    setLoanValueError('');
    setInstallmentsError('');
    setRepaymentValueError('');
    setErrors({});
  }
};

const handleBankSelection = (selectedBank: string) => {
  setOriginalBank(selectedBank);
  
  if (selectedBank) {
    const bankTransition = bankData.find(bank => bank.primaryBank === selectedBank);
    if (bankTransition) {
      let transitionChain = `${bankTransition.primaryBank} (Bank pierwotny)`;
      
      if (bankTransition.transitionalBank) {
        transitionChain += ` -> ${bankTransition.transitionalBank} (Bank przejściowy)`;
      }
      
      transitionChain += ` -> ${bankTransition.currentBank} (Bank aktualny)`;
      
      setDisplayedBankTransition(transitionChain);
    }
  } else {
    setDisplayedBankTransition('');
  }
};

if (!isModalOpen) return null;
  // PART 3: JSX Return Statement

return (
  <div
    className="fixed inset-0 z-[999] flex items-center justify-center p-4"
    style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
    onClick={(e) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    }}
  >
    <div
      ref={modalRef}
      className="relative w-full max-w-md p-8 rounded-2xl shadow-2xl border-4 overflow-y-auto max-h-[90vh]"
      style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 p-2 rounded-full transition-colors hover:bg-opacity-10 hover:bg-white"
        style={{ color: '#F5F5F5' }}
        aria-label="Zamknij"
      >
        <X size={24} />
      </button>

      {modalIntent === 'form_submission' ? (
        <div className="text-center py-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
            Wiadomość została wysłana!
          </h2>
          <p className="text-lg" style={{ color: '#F5F5F5' }}>
            Dziękujemy za kontakt. Skontaktujemy się z Tobą w najbliższym czasie.
          </p>
          {submittedData && (
            <div className="mt-8 text-left space-y-2" style={{ color: '#F5F5F5' }}>
              <p><strong>Imię:</strong> {submittedData.firstName}</p>
              <p><strong>Nazwisko:</strong> {submittedData.lastName}</p>
              <p><strong>Email:</strong> {submittedData.email}</p>
              <p><strong>Telefon:</strong> {submittedData.phone}</p>
              {submittedData.message && <p><strong>Wiadomość:</strong> {submittedData.message}</p>}
              <p><strong>Rodzaj sprawy:</strong> {submittedData.loanType === 'currency' ? 'Kredyt walutowy' : submittedData.loanType === 'skd' ? 'SKD' : 'N/A'}</p>

              {submittedData.loanType === 'currency' && (
                <>
                  <p><strong>Data zawarcia umowy:</strong> {submittedData.agreementDate}</p>
                  {submittedData.bankTransitionChain && <p><strong>Łańcuch banków:</strong> {submittedData.bankTransitionChain}</p>}
                  <p><strong>Typ kredytu:</strong> {submittedData.loanTypeDetail === 'indexed' ? 'Indeksowany' : submittedData.loanTypeDetail === 'denominated' ? 'Denominowany' : 'Nie wiem'}</p>
                  <p><strong>Waluta kredytu:</strong> {submittedData.loanCurrency}</p>
                  <p><strong>Wartość kredytu w PLN:</strong> {submittedData.loanValuePln}</p>
                  <p><strong>Liczba rat:</strong> {submittedData.numberOfInstallments}</p>
                  <p><strong>Status kredytu:</strong> {submittedData.loanStatus === 'active' ? 'Aktywny' : 'Spłacony'}</p>
                  {submittedData.loanStatus === 'repaid' && submittedData.repaymentDate && (
                    <>
                      <p><strong>Data spłaty:</strong> {submittedData.repaymentDate}</p>
                      <p><strong>Wartość spłaty w PLN:</strong> {submittedData.repaymentValuePln}</p>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: '#F5F5F5' }}>
            Umów bezpłatną konsultację
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="modal-firstName" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                  Imię <span style={{ color: '#D4AF37' }}>*</span>
                </label>
                <input
                  type="text"
                  id="modal-firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'rgba(245, 245, 245, 0.1)',
                    border: '1px solid rgba(245, 245, 245, 0.2)',
                    color: '#F5F5F5',
                    '--tw-ring-color': '#D4AF37',
                  }}
                  placeholder="Twoje imię"
                  required
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label htmlFor="modal-lastName" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                  Nazwisko <span style={{ color: '#D4AF37' }}>*</span>
                </label>
                <input
                  type="text"
                  id="modal-lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'rgba(245, 245, 245, 0.1)',
                    border: '1px solid rgba(245, 245, 245, 0.2)',
                    color: '#F5F5F5',
                    '--tw-ring-color': '#D4AF37',
                  }}
                  placeholder="Twoje nazwisko"
                  required
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="modal-email" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                Email <span style={{ color: '#D4AF37' }}>*</span>
              </label>
              <input
                type="email"
                id="modal-email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'rgba(245, 245, 245, 0.1)',
                  border: '1px solid rgba(245, 245, 245, 0.2)',
                  color: '#F5F5F5',
                  '--tw-ring-color': '#D4AF37',
                }}
                placeholder="Twój adres email"
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="modal-phone" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                Numer telefonu <span style={{ color: '#D4AF37' }}>*</span>
              </label>
              <input
                type="tel"
                id="modal-phone"
                name="phone"
                value={phone}
                onChange={(e) => {
                  const prefix = '+48 ';
                  let newValue = e.target.value;
                  if (!newValue.startsWith(prefix) || newValue.length < prefix.length) {
                    newValue = prefix;
                  }
                  setPhone(newValue);
                }}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'rgba(245, 245, 245, 0.1)',
                  border: '1px solid rgba(245, 245, 245, 0.2)',
                  color: '#F5F5F5',
                  '--tw-ring-color': '#D4AF37',
                }}
                placeholder="Twój numer telefonu"
                required
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="modal-message" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                Wiadomość <span style={{ color: '#D4AF37' }}>*</span>
              </label>
              <textarea
                id="modal-message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'rgba(245, 245, 245, 0.1)',
                  border: '1px solid rgba(245, 245, 245, 0.2)',
                  color: '#F5F5F5',
                  '--tw-ring-color': '#D4AF37',
                }}
                placeholder="Krótko opisz swoją sprawę"
                required
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            {modalIntent === 'direct_consultation' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                    Rodzaj sprawy <span style={{ color: '#D4AF37' }}>*</span>
                  </label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="loanType"
                        value="currency"
                        checked={loanType === 'currency'}
                        onChange={(e) => setLoanType(e.target.value)}
                        className="form-radio"
                        style={{ accentColor: '#D4AF37' }}
                        required
                      />
                      <span className="ml-2 text-sm" style={{ color: '#F5F5F5' }}>Kredyt walutowy</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="loanType"
                        value="skd"
                        checked={loanType === 'skd'}
                        onChange={(e) => setLoanType(e.target.value)}
                        className="form-radio"
                        style={{ accentColor: '#D4AF37' }}
                      />
                      <span className="ml-2 text-sm" style={{ color: '#F5F5F5' }}>SKD</span>
                    </label>
                  </div>
                </div>

                {loanType === 'currency' && (
                  <>
                    <div>
                      <label htmlFor="modal-agreementDate" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                        Data zawarcia umowy
                      </label>
                      <DatePicker
                        id="modal-agreementDate"
                        selected={agreementDate}
                        onChange={(date: Date | null) => setAgreementDate(date)}
                        dateFormat="dd.MM.yyyy"
                        locale="pl"
                        minDate={new Date(2000, 0, 1)}
                        maxDate={new Date()}
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        showMonthDropdown
                        className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                        wrapperClassName="w-full"
                        placeholderText="DD.MM.YYYY"
                        style={{
                          backgroundColor: 'rgba(245, 245, 245, 0.1)',
                          border: '1px solid rgba(245, 245, 245, 0.2)',
                          color: '#F5F5F5',
                          '--tw-ring-color': '#D4AF37',
                        }}
                      />
                    </div>

                    {/* Continue to Part 4 for the rest of the currency loan fields... */}
                  </>
                )}
              </>
            )}
          </form>
        </>
      )}
    </div>
  </div>
);
 // PART 4: Currency Loan Fields (continues from Part 3)

                    <div>
                      <label htmlFor="modal-originalBank" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                        Bank pierwotny
                      </label>
                      <select
                        id="modal-originalBank"
                        name="originalBank"
                        value={originalBank}
                        onChange={(e) => handleBankSelection(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                        style={{
                          backgroundColor: 'rgba(245, 245, 245, 0.1)',
                          border: '1px solid rgba(245, 245, 245, 0.2)',
                          color: '#F5F5F5',
                          '--tw-ring-color': '#D4AF37',
                        }}
                      >
                        <option value="" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5' }}>
                          Wybierz bank
                        </option>
                        {bankData.map((bank, index) => (
                          <option 
                            key={index} 
                            value={bank.primaryBank}
                            style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5' }}
                          >
                            {bank.primaryBank}
                          </option>
                        ))}
                      </select>
                      
                      {displayedBankTransition && (
                        <div className="mt-3 p-3 rounded-lg border-2" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: '#D4AF37' }}>
                          <p className="text-sm font-medium mb-1" style={{ color: '#D4AF37' }}>
                            Łańcuch przejęć banku:
                          </p>
                          <p className="text-sm leading-relaxed" style={{ color: '#F5F5F5' }}>
                            {displayedBankTransition}
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                        Typ kredytu
                      </label>
                      <div className="flex flex-wrap gap-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="loanTypeDetail"
                            value="indexed"
                            checked={loanTypeDetail === 'indexed'}
                            onChange={(e) => setLoanTypeDetail(e.target.value)}
                            className="form-radio"
                            style={{ accentColor: '#D4AF37' }}
                          />
                          <span className="ml-2 text-sm" style={{ color: '#F5F5F5' }}>Indeksowany</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="loanTypeDetail"
                            value="denominated"
                            checked={loanTypeDetail === 'denominated'}
                            onChange={(e) => setLoanTypeDetail(e.target.value)}
                            className="form-radio"
                            style={{ accentColor: '#D4AF37' }}
                          />
                          <span className="ml-2 text-sm" style={{ color: '#F5F5F5' }}>Denominowany</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="loanTypeDetail"
                            value="unknown"
                            checked={loanTypeDetail === 'unknown'}
                            onChange={(e) => setLoanTypeDetail(e.target.value)}
                            className="form-radio"
                            style={{ accentColor: '#D4AF37' }}
                          />
                          <span className="ml-2 text-sm" style={{ color: '#F5F5F5' }}>Nie wiem</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="modal-loanCurrency" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                        Waluta kredytu
                      </label>
                      <select
                        id="modal-loanCurrency"
                        name="loanCurrency"
                        value={loanCurrency}
                        onChange={(e) => setLoanCurrency(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                        style={{
                          backgroundColor: 'rgba(245, 245, 245, 0.1)',
                          border: '1px solid rgba(245, 245, 245, 0.2)',
                          color: '#F5F5F5',
                          '--tw-ring-color': '#D4AF37',
                        }}
                      >
                        <option value="CHF" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5' }}>
                          CHF
                        </option>
                        <option value="EUR" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5' }}>
                          EUR
                        </option>
                        <option value="USD" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5' }}>
                          USD
                        </option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="modal-loanValuePln" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                        Wartość kredytu w PLN (w momencie zawarcia umowy)
                      </label>
                      <input
                        type="number"
                        id="modal-loanValuePln"
                        name="loanValuePln"
                        value={loanValuePln}
                        onChange={handleLoanValueChange}
                        min="0.01"
                        step="0.01"
                        className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                        style={{
                          backgroundColor: 'rgba(245, 245, 245, 0.1)',
                          border: '1px solid rgba(245, 245, 245, 0.2)',
                          color: '#F5F5F5',
                          '--tw-ring-color': '#D4AF37',
                        }}
                        placeholder="Wartość w PLN (tylko wartości większe od 0)"
                      />
                      {(loanValueError || errors.loanValuePln) && (
                        <p className="text-red-500 text-sm mt-1">
                          {loanValueError || errors.loanValuePln}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="modal-numberOfInstallments" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                        Liczba rat w miesiącach (zgodnie z umową)
                      </label>
                      <input
                        type="number"
                        id="modal-numberOfInstallments"
                        name="numberOfInstallments"
                        value={numberOfInstallments}
                        onChange={handleInstallmentsChange}
                        min="1"
                        step="1"
                        className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                        style={{
                          backgroundColor: 'rgba(245, 245, 245, 0.1)',
                          border: '1px solid rgba(245, 245, 245, 0.2)',
                          color: '#F5F5F5',
                          '--tw-ring-color': '#D4AF37',
                        }}
                        placeholder="Liczba miesięcy (tylko wartości większe od 0)"
                      />
                      {(installmentsError || errors.numberOfInstallments) && (
                        <p className="text-red-500 text-sm mt-1">
                          {installmentsError || errors.numberOfInstallments}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                        Status kredytu
                      </label>
                      <div className="flex space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="loanStatus"
                            value="active"
                            checked={loanStatus === 'active'}
                            onChange={(e) => setLoanStatus(e.target.value)}
                            className="form-radio"
                            style={{ accentColor: '#D4AF37' }}
                          />
                          <span className="ml-2 text-sm" style={{ color: '#F5F5F5' }}>Aktywny</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="loanStatus"
                            value="repaid"
                            checked={loanStatus === 'repaid'}
                            onChange={(e) => setLoanStatus(e.target.value)}
                            className="form-radio"
                            style={{ accentColor: '#D4AF37' }}
                          />
                          <span className="ml-2 text-sm" style={{ color: '#F5F5F5' }}>Spłacony</span>
                        </label>
                      </div>
                    </div>

                    {loanStatus === 'repaid' && (
                      <>
                        <div>
                          <label htmlFor="modal-repaymentDate" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                            Data spłaty kredytu
                          </label>
                          <DatePicker
                            id="modal-repaymentDate"
                            selected={repaymentDate}
                            onChange={(date: Date | null) => setRepaymentDate(date)}
                            dateFormat="dd.MM.yyyy"
                            locale="pl"
                            minDate={new Date(1950, 0, 1)}
                            maxDate={new Date()}
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                            showMonthDropdown
                            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                            wrapperClassName="w-full"
                            placeholderText="DD.MM.YYYY"
                            style={{
                              backgroundColor: 'rgba(245, 245, 245, 0.1)',
                              border: '1px solid rgba(245, 245, 245, 0.2)',
                              color: '#F5F5F5',
                              '--tw-ring-color': '#D4AF37',
                            }}
                          />
                        </div>

                        <div>
                          <label htmlFor="modal-repaymentValuePln" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                            Wartość spłaty w PLN
                          </label>
                          <input
                            type="text"
                            inputMode="decimal"
                            id="modal-repaymentValuePln"
                            name="repaymentValuePln"
                            value={repaymentValuePln}
                            onChange={handleRepaymentValueChange}
                            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                            style={{
                              backgroundColor: 'rgba(245, 245, 245, 0.1)',
                              border: '1px solid rgba(245, 245, 245, 0.2)',
                              color: '#F5F5F5',
                              '--tw-ring-color': '#D4AF37',
                            }}
                            placeholder="Wartość spłaty w PLN"
                          />
                          {(repaymentValueError || errors.repaymentValuePln) && (
                            <p className="text-red-500 text-sm mt-1">
                              {repaymentValueError || errors.repaymentValuePln}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            )}

            <div className="mb-6">
              <label className="flex items-start text-sm font-medium w-full" style={{ color: '#F5F5F5' }}>
                <input
                  type="checkbox"
                  id="privacy-consent"
                  name="privacyConsent"
                  checked={privacyConsent}
                  onChange={(e) => setPrivacyConsent(e.target.checked)}
                  className="mr-2 mt-1 flex-shrink-0"
                  style={{ accentColor: '#D4AF37' }}
                  required
                />
                <span className="leading-relaxed flex-1">
                  Wyrażam zgodę na przetwarzanie moich danych osobowych przez właściciela strony internetowej uwolnieniekredytowe.pl w celach kontaktowych, marketingowych oraz związanych z nawiązaniem współpracy, zgodnie z <Link to="/privacy-policy" className="text-yellow-300 underline">polityką prywatności.</Link> Zostałem/am poinformowany/a o przysługujących mi prawach, w tym o możliwości wycofania zgody w dowolnym momencie.<span style={{ color: '#D4AF37' }}>*</span>
                </span>
              </label>
              {errors.privacyConsent && <p className="text-red-500 text-sm mt-1">{errors.privacyConsent}</p>}
            </div>

            <button
              type="submit"
              className="w-full font-bold py-4 px-8 rounded-lg text-lg transition-all hover:-translate-y-1 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4 active:scale-95 active:shadow-inner"
              style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}
            >
              {modalIntent === 'direct_consultation' ? 'Umów bezpłatną konsultację' : 'Wyślij wiadomość'}
            </button>
            {modalIntent === 'direct_consultation' && (
              <p className="text-center text-sm mt-4" style={{ color: '#F5F5F5' }}>
                Kliknięcie przycisku przekieruje Cię do strony rezerwacji terminu w Calendly.
              </p>
            )}
          </form>
        </>
      )}
    </div>
  </div>
);

// COMPONENT ENDING
};

export default ConsultationModal;