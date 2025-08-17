import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MessageCircle } from 'lucide-react';
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

const ContactSection: React.FC = () => {
  // Calculate today's date in YYYY-MM-DD format for max date constraint
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const maxDateToday = `${year}-${month}-${day}`;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+48 '); // Default area code
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
    
    // Validation for currency loan fields
    if (loanType === 'currency') {
      // Validate loan value in PLN
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

      // Validate number of installments
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

      // Validate repayment value if loan is repaid
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
      // Prepare webhook payload (keeping original webhook intact)
      const webhookPayload = {
        // Form data
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

        // Platform and metadata
        platform: 'web',
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        referrer: document.referrer || 'direct',

        // Additional metadata
        formType: 'contact_section',
        source: 'contact_form'
      };

      // Send to webhook (keeping the existing webhook URL untouched)
      fetch('https://n8n.srv948633.hstgr.cloud/webhook/243235be-417h-4446-8h22-52186b5fd6d4', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(webhookPayload)
      }).then(response => {
        if (response.ok) {
          console.log('Contact form webhook sent successfully:', response.status);
        } else {
          console.error('Contact form webhook failed with status:', response.status);
        }
      }).catch(e => {
        console.error('Error sending contact form webhook:', e);
      }).finally(() => {
        // Reset form after submission
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
      });
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

  const handleRepaymentValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRepaymentValuePln(value);
    
    // Real-time validation for repayment value
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

  return (
    <section id="contact-section" className="py-20" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
            Porozmawiajmy o Twojej toksycznej umowie kredytowej!
          </h2>
          <p className="text-xl" style={{ color: '#F5F5F5' }}>
            Wszystko zaczyna się od decyzji - Twojej decyzji.              
          </p>
          <p className="text-xl my-7" style={{ color: '#D4AF37' }}>Tu zaczyna się Twoja droga do wiecznych wakacji kredytowych czyli unieważnienia toksycznej umowy!</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                    Imię <span style={{ color: '#D4AF37' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
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
                    aria-invalid={errors.firstName ? "true" : "false"}
                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                  />
                  {errors.firstName && <p id="firstName-error" className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                    Nazwisko <span style={{ color: '#D4AF37' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
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
                    aria-invalid={errors.lastName ? "true" : "false"}
                    aria-describedby={errors.lastName ? "lastName-error" : undefined}
                  />
                  {errors.lastName && <p id="lastName-error" className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                  Email <span style={{ color: '#D4AF37' }}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
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
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                  Numer telefonu <span style={{ color: '#D4AF37' }}>*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => {
                    const prefix = '+48 ';
                    let newValue = e.target.value;

                    // If the new value doesn't start with the prefix, or is shorter than the prefix,
                    // reset it to the prefix.
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
                  aria-invalid={errors.phone ? "true" : "false"}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && <p id="phone-error" className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                  Wiadomość <span style={{ color: '#D4AF37' }}>*</span>
                </label>
                <textarea
                  id="message"
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
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={errors.message ? "message-error" : undefined}
                ></textarea>
                {errors.message && <p id="message-error" className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
              
              {/* Loan Type Selection */}
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
                {errors.loanType && <p className="text-red-500 text-sm mt-1">{errors.loanType}</p>}
              </div>

              {loanType === 'currency' && (
                <>
                  {/* Date of conclusion of the agreement */}
                  <div>
                    <label htmlFor="agreementDate" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                      Data zawarcia umowy
                    </label>
                    <DatePicker
                      id="agreementDate"
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
                    {errors.agreementDate && <p className="text-red-500 text-sm mt-1">{errors.agreementDate}</p>}
                  </div>

                  {/* Original bank */}
                  <div>
                    <label htmlFor="originalBank" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                      Bank pierwotny
                    </label>
                    <select
                      id="originalBank"
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
                    {errors.originalBank && <p className="text-red-500 text-sm mt-1">{errors.originalBank}</p>}
                  </div>

                  {/* Type of loan */}
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
                    {errors.loanTypeDetail && <p className="text-red-500 text-sm mt-1">{errors.loanTypeDetail}</p>}
                  </div>

                  {/* Loan currency */}
                  <div>
                    <label htmlFor="loanCurrency" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                      Waluta kredytu
                    </label>
                    <select
                      id="loanCurrency"
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
                    {errors.loanCurrency && <p className="text-red-500 text-sm mt-1">{errors.loanCurrency}</p>}
                  </div>

                  {/* Value in PLN */}
                  <div>
                    <label htmlFor="loanValuePln" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                      Wartość kredytu w PLN (w momencie zawarcia umowy)
                    </label>
                    <input
                      type="number"
                      id="loanValuePln"
                      name="loanValuePln"
                      value={loanValuePln}
                      onChange={(e) => setLoanValuePln(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: 'rgba(245, 245, 245, 0.1)',
                        border: '1px solid rgba(245, 245, 245, 0.2)',
                        color: '#F5F5F5',
                        '--tw-ring-color': '#D4AF37',
                      }}
                      placeholder="Wartość w PLN"
                      aria-invalid={errors.loanValuePln ? "true" : "false"}
                      aria-describedby={errors.loanValuePln ? "loanValuePln-error" : undefined}
                    />
                    {(loanValueError || errors.loanValuePln) && (
                      <p id="loanValuePln-error" className="text-red-500 text-sm mt-1">
                        {loanValueError || errors.loanValuePln}
                      </p>
                    )}
                  </div>

                  {/* Number of installments in months */}
                  <div>
                    <label htmlFor="numberOfInstallments" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                      Liczba rat w miesiącach (zgodnie z umową)
                    </label>
                    <input
                      type="number"
                      id="numberOfInstallments"
                      name="numberOfInstallments"
                      value={numberOfInstallments}
                      onChange={(e) => setNumberOfInstallments(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: 'rgba(245, 245, 245, 0.1)',
                        border: '1px solid rgba(245, 245, 245, 0.2)',
                        color: '#F5F5F5',
                        '--tw-ring-color': '#D4AF37',
                      }}
                      placeholder="Liczba miesięcy"
                      aria-invalid={errors.numberOfInstallments ? "true" : "false"}
                      aria-describedby={errors.numberOfInstallments ? "numberOfInstallments-error" : undefined}
                    />
                    {(installmentsError || errors.numberOfInstallments) && (
                      <p id="numberOfInstallments-error" className="text-red-500 text-sm mt-1">
                        {installmentsError || errors.numberOfInstallments}
                      </p>
                    )}
                  </div>

                  {/* Active or repaid loan */}
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
                    {errors.loanStatus && <p className="text-red-500 text-sm mt-1">{errors.loanStatus}</p>}
                  </div>

                  {loanStatus === 'repaid' && (
                    <>
                      {/* If repaid, enter the date of repayment */}
                      <div>
                        <label htmlFor="repaymentDate" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                          Data spłaty kredytu
                        </label>
                        <DatePicker
                          id="repaymentDate"
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
                        {errors.repaymentDate && <p className="text-red-500 text-sm mt-1">{errors.repaymentDate}</p>}
                      </div>

                      {/* and the value of the payment in PLN. */}
                      <div>
                        <label htmlFor="repaymentValuePln" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                          Wartość spłaty w PLN
                        </label>
                        <input
                          type="text"
                          inputMode="decimal"
                          id="repaymentValuePln"
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
                          aria-invalid={errors.repaymentValuePln ? "true" : "false"}
                          aria-describedby={errors.repaymentValuePln ? "repaymentValuePln-error" : undefined}
                        />
                        {(repaymentValueError || errors.repaymentValuePln) && (
                          <p id="repaymentValuePln-error" className="text-red-500 text-sm mt-1">
                            {repaymentValueError || errors.repaymentValuePln}
                          </p>
                        )}
                      </div>
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
                    aria-invalid={errors.privacyConsent ? "true" : "false"}
                    aria-describedby={errors.privacyConsent ? "privacy-consent-error" : undefined}
                  />
                  <span className="leading-relaxed flex-1">
                    Wyrażam zgodę na przetwarzanie moich danych osobowych przez właściciela strony internetowej uwolnieniekredytowe.pl w celach kontaktowych, marketingowych oraz związanych z nawiązaniem współpracy, zgodnie z <Link to="/privacy-policy" className="text-yellow-300 underline">polityką prywatności.</Link> Zostałem/am poinformowany/a o przysługujących mi prawach, w tym o możliwości wycofania zgody w dowolnym momencie.<span style={{ color: '#D4AF37' }}>*</span>
                  </span>
                </label>
                {errors.privacyConsent && <p id="privacy-consent-error" className="text-red-500 text-sm mt-1">{errors.privacyConsent}</p>}
              </div>

              <button
                type="submit"
                className="w-full font-bold py-4 px-8 rounded-lg text-lg transition-all hover:-translate-y-1 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4 active:scale-95 active:shadow-inner"
                style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}
              >
                Wyślij wiadomość
              </button>
            </form>
          </div>
          
          {/* Right side - Contact Information */}
          <div className="lg:pl-8">
            <div className="sticky top-8">
              <div className="space-y-8">
                <h3 className="text-2xl font-bold mb-6" style={{ color: '#F5F5F5' }}>Skontaktuj się z nami</h3>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-md border-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                  <Phone size={24} style={{ color: '#0A1A2F' }} />
                </div>
                <div>
                  <div className="font-semibold" style={{ color: '#F5F5F5' }}>Telefon</div>
                  <div style={{ color: '#F5F5F5' }}>+48 601 227 876</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-md border-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                  <Mail size={24} style={{ color: '#0A1A2F' }} />
                </div>
                <div>
                  <div className="font-semibold" style={{ color: '#F5F5F5' }}>Email</div>
                  <div style={{ color: '#F5F5F5' }}>krzysztof.milewski@dsa.pl</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-md border-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                  <MessageCircle size={24} style={{ color: '#0A1A2F' }} />
                </div>
                <div>
                  <div className="font-semibold" style={{ color: '#F5F5F5' }}>WhatsApp</div>
                  <div style={{ color: '#F5F5F5' }}>Szybka konsultacja dostępna</div>
                </div>
              </div>
              
              <div className="pt-6">
                <p className="text-sm leading-relaxed" style={{ color: '#F5F5F5' }}>
                  Wszystkie konsultacje są całkowicie poufne i bezpłatne. 
                  Na pytania odpowiadam natychmiast w dni robocze.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;