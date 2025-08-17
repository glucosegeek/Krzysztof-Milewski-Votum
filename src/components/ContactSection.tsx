import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { pl } from 'date-fns/locale';

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
  { primaryBank: 'Alior Bank S.A.', transitionalBank: null, currentBank: 'Alior Bank S.A.' },
  { primaryBank: 'PKO Bank Polski S.A.', transitionalBank: null, currentBank: 'PKO Bank Polski S.A.' },
  { primaryBank: 'Bank Polska Kasa Opieki S.A.', transitionalBank: null, currentBank: 'Bank Polska Kasa Opieki S.A.' },
  { primaryBank: 'ING Bank Śląski S.A.', transitionalBank: null, currentBank: 'ING Bank Śląski S.A.' }
];

const ContactSection: React.FC = () => {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [errors, setErrors] = useState<{ 
    firstName?: string; 
    lastName?: string; 
    email?: string; 
    phone?: string; 
    message?: string;
    privacyConsent?: string;
    loanType?: string;
    loanValuePln?: string;
    numberOfInstallments?: string;
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
      loanValuePln?: string;
      numberOfInstallments?: string;
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

    if (!loanType) {
      newErrors.loanType = 'Wybór rodzaju sprawy jest obowiązkowy.';
    }

    if (!privacyConsent) {
      newErrors.privacyConsent = 'Zgoda na przetwarzanie danych jest obowiązkowa.';
    }
    
    // Validation for currency loan fields
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

  const resetForm = () => {
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
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const webhookPayload = {
        // Form data
        name: `${firstName} ${lastName}`,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        message: message,
        loanType: loanType,
        agreementDate: agreementDate ? agreementDate.toISOString() : null,
        originalBank: originalBank,
        loanTypeDetail: loanTypeDetail,
        loanCurrency: loanCurrency,
        loanValuePln: loanValuePln,
        numberOfInstallments: numberOfInstallments,
        loanStatus: loanStatus,
        repaymentDate: repaymentDate ? repaymentDate.toISOString() : null,
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

      const response = await fetch('https://n8n.srv948633.hstgr.cloud/webhook/243235be-417h-4446-8h22-52186b5fd6d4', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(webhookPayload)
      });

      if (response.ok) {
        console.log('Contact form webhook sent successfully:', response.status);
        resetForm();
        // You could add a success message here if needed
      } else {
        console.error('Contact form webhook failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error sending contact form webhook:', error);
    } finally {
      setIsSubmitting(false);
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

  return (
    <section id="contact-section" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5', padding: '80px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto', textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '16px', color: '#F5F5F5' }}>
            Porozmawiajmy o Twojej toksycznej umowie kredytowej!
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#F5F5F5' }}>
            Wszystko zaczyna się od decyzji - Twojej decyzji.              
          </p>
          <p style={{ fontSize: '1.25rem', margin: '28px 0', color: '#D4AF37' }}>
            Tu zaczyna się Twoja droga do wiecznych wakacji kredytowych czyli unieważnienia toksycznej umowy!
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px', maxWidth: '1024px', margin: '0 auto' }}>
          <div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                <div>
                  <label htmlFor="firstName" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '8px', color: '#F5F5F5' }}>
                    Imię <span style={{ color: '#D4AF37' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid rgba(245, 245, 245, 0.2)',
                      backgroundColor: 'rgba(245, 245, 245, 0.1)',
                      color: '#F5F5F5',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'all 0.2s'
                    }}
                    placeholder="Twoje imię"
                    required
                    aria-invalid={errors.firstName ? "true" : "false"}
                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                    onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(245, 245, 245, 0.2)'}
                  />
                  {errors.firstName && <p id="firstName-error" style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '4px' }}>{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '8px', color: '#F5F5F5' }}>
                    Nazwisko <span style={{ color: '#D4AF37' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid rgba(245, 245, 245, 0.2)',
                      backgroundColor: 'rgba(245, 245, 245, 0.1)',
                      color: '#F5F5F5',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'all 0.2s'
                    }}
                    placeholder="Twoje nazwisko"
                    required
                    aria-invalid={errors.lastName ? "true" : "false"}
                    aria-describedby={errors.lastName ? "lastName-error" : undefined}
                    onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(245, 245, 245, 0.2)'}
                  />
                  {errors.lastName && <p id="lastName-error" style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '4px' }}>{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '8px', color: '#F5F5F5' }}>
                  Email <span style={{ color: '#D4AF37' }}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(245, 245, 245, 0.2)',
                    backgroundColor: 'rgba(245, 245, 245, 0.1)',
                    color: '#F5F5F5',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                  placeholder="Twój adres email"
                  required
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(245, 245, 245, 0.2)'}
                />
                {errors.email && <p id="email-error" style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '4px' }}>{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '8px', color: '#F5F5F5' }}>
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
                    if (!newValue.startsWith(prefix) || newValue.length < prefix.length) {
                      newValue = prefix;
                    }
                    setPhone(newValue);
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(245, 245, 245, 0.2)',
                    backgroundColor: 'rgba(245, 245, 245, 0.1)',
                    color: '#F5F5F5',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                  placeholder="Twój numer telefonu"
                  required
                  aria-invalid={errors.phone ? "true" : "false"}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(245, 245, 245, 0.2)'}
                />
                {errors.phone && <p id="phone-error" style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '4px' }}>{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="message" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '8px', color: '#F5F5F5' }}>
                  Wiadomość <span style={{ color: '#D4AF37' }}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(245, 245, 245, 0.2)',
                    backgroundColor: 'rgba(245, 245, 245, 0.1)',
                    color: '#F5F5F5',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    resize: 'vertical',
                    minHeight: '100px'
                  }}
                  placeholder="Krótko opisz swoją sprawę"
                  required
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(245, 245, 245, 0.2)'}
                />
                {errors.message && <p id="message-error" style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '4px' }}>{errors.message}</p>}
              </div>
              
              {/* Loan Type Selection */}
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '8px', color: '#F5F5F5' }}>
                  Rodzaj sprawy <span style={{ color: '#D4AF37' }}>*</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="loanType"
                      value="currency"
                      checked={loanType === 'currency'}
                      onChange={(e) => setLoanType(e.target.value)}
                      style={{ accentColor: '#D4AF37', marginRight: '8px' }}
                      required
                    />
                    <span style={{ fontSize: '0.875rem', color: '#F5F5F5' }}>Kredyt walutowy</span>
                  </label>
                  <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="loanType"
                      value="skd"
                      checked={loanType === 'skd'}
                      onChange={(e) => setLoanType(e.target.value)}
                      style={{ accentColor: '#D4AF37', marginRight: '8px' }}
                    />
                    <span style={{ fontSize: '0.875rem', color: '#F5F5F5' }}>SKD</span>
                  </label>
                </div>
                {errors.loanType && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '4px' }}>{errors.loanType}</p>}
              </div>

              {loanType === 'currency' && (
                <>
                  {/* Date of conclusion of the agreement */}
                  <div>
                    <label htmlFor="agreementDate" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '8px', color: '#F5F5F5' }}>
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
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid rgba(245, 245, 245, 0.2)',
                        backgroundColor: 'rgba(245, 245, 245, 0.1)',
                        color: '#F5F5F5',
                        fontSize: '16px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Original bank */}
                  <div>
                    <label htmlFor="originalBank" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '8px', color: '#F5F5F5' }}>
                      Bank pierwotny
                    </label>
                    <select
                      id="originalBank"
                      name="originalBank"
                      value={originalBank}
                      onChange={(e) => handleBankSelection(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid rgba(245, 245, 245, 0.2)',
                        backgroundColor: 'rgba(245, 245, 245, 0.1)',
                        color: '#F5F5F5',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'all 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(245, 245, 245, 0.2)'}
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
                      <div style={{ 
                        marginTop: '12px', 
                        padding: '12px', 
                        borderRadius: '8px', 
                        border: '2px solid #D4AF37',
                        backgroundColor: 'rgba(212, 175, 55, 0.1)' 
                      }}>
                        <p style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '4px', color: '#D4AF37' }}>
                          Łańcuch przejęć banku:
                        </p>
                        <p style={{ fontSize: '0.875rem', lineHeight: '1.5', color: '#F5F5F5' }}>
                          {displayedBankTransition}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Type of loan */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '8px', color: '#F5F5F5' }}>
                      Typ kredytu
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                      <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="loanTypeDetail"
                          value="indexed"
                          checked={loanTypeDetail === 'indexed'}
                          onChange={(e) => setLoanTypeDetail(e.target.value)}
                          style={{ accentColor: '#D4AF37', marginRight: '8px' }}
                        />
                        <span style={{ fontSize: '0.875rem', color: '#F5F5F5' }}>Indeksowany</span>
                      </label>
                      <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="loanTypeDetail"
                          value="denominated"
                          checked={loanTypeDetail === 'denominated'}
                          onChange={(e) => setLoanTypeDetail(e.target.value)}
                          style={{ accentColor: '#D4AF37', marginRight: '8px' }}
                        />
                        <span style={{ fontSize: '0.875rem', color: '#F5F5F5' }}>Denominowany</span>
                      </label>
                      <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="loanTypeDetail"
                          value="unknown"
                          checked={loanTypeDetail === 'unknown'}
                          onChange={(e) => setLoanTypeDetail(e.target.value)}
                          style={{ accentColor: '#D4AF37', marginRight: '8px' }}
                        />
                        <span style={{ fontSize: '0.875rem', color: '#F5F5F5' }}>Nie wiem</span>
                      </label>
                    </div>
                  </div>

                  {/* Loan currency */}
                  <div>
                    <label htmlFor="loanCurrency" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '8px', color: '#F5F5F5' }}>
                      Waluta kredytu
                    </label>
                    <select
                      id="loanCurrency"
                      name="loanCurrency"
                      value={loanCurrency}
                      onChange={(e) => setLoanCurrency(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid rgba(245, 245, 245, 0.2)',
                        backgroundColor: 'rgba(245, 245, 245, 0.1)',
                        color: '#F5F5F5',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'all 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(245, 245, 245, 0.2)'}
                    >
                      <option value="CHF" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5' }}>CHF</option>
                      <option value="EUR" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5' }}>EUR</option>
                      <option value="USD" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5' }}>USD</option>
                    </select>
                  </div>

                  {/* Value in PLN */}
                  <div>
                    <label htmlFor="loanValuePln" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '8px', color: '#F5F5F5' }}>
                      Wartość kredytu w PLN (w momencie zawarcia umowy)
                    </label>
                    <input
                      type="number"
                      id="loanValuePln"
                      name="loanValuePln"
                      value={loanValuePln}
                      onChange={(e) => setLoanValuePln(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid rgba(245, 245, 245, 0.2)',
                        backgroundColor: 'rgba(245, 245, 245, 0.1)',
                        color: '#F5F5F5',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'all 0.2s'
                      }}
                      placeholder="Wartość w PLN"
                      aria-invalid={errors.loanValuePln ? "true" : "false"}
                      aria-describedby={errors.loanValuePln ? "loanValuePln-error" : undefined}
                      onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(245, 245, 245, 0.2)'}
                    />
                    {errors.loanValuePln && (
                      <p id="loanValuePln-error" style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '4px' }}>
                        {errors.loanValuePln}
                      </p>
                    )}
                  </div>

                  {/* Number of installments in months */}
                  <div>
                    <label htmlFor="numberOfInstallments" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '8px', color: '#F5F5F5' }}>
                      Liczba rat w miesiącach (zgodnie z umową)
                    </label>
                    <input
                      type="number"
                      id="numberOfInstallments"
                      name="numberOfInstallments"
                      value={numberOfInstallments}
                      onChange={(e) => setNumberOfInstallments(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid rgba(245, 245, 245, 0.2)',
                        backgroundColor: 'rgba(245, 245, 245, 0.1)',
                        color: '#F5F5F5',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'all 0.2s'
                      }}
                      placeholder="Liczba miesięcy"
                      aria-invalid={errors.numberOfInstallments ? "true" : "false"}
                      aria-describedby={errors.numberOfInstallments ? "numberOfInstallments-error" : undefined}
                      onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(245, 245, 245, 0.2)'}
                    />
                    {errors.numberOfInstallments && (
                      <p id="numberOfInstallments-error" style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '4px' }}>
                        {errors.numberOfInstallments}
                      </p>
                    )}
                  </div>

                  {/* Active or repaid loan */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '8px', color: '#F5F5F5' }}>
                      Status kredytu
                    </label>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="loanStatus"
                          value="active"
                          checked={loanStatus === 'active'}
                          onChange={(e) => setLoanStatus(e.target.value)}
                          style={{ accentColor: '#D4AF37', marginRight: '8px' }}
                        />
                        <span style={{ fontSize: '0.875rem', color: '#F5F5F5' }}>Aktywny</span>
                      </label>
                      <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="loanStatus"
                          value="repaid"
                          checked={loanStatus === 'repaid'}
                          onChange={(e) => setLoanStatus(e.target.value)}
                          style={{ accentColor: '#D4AF37', marginRight: '8px' }}
                        />
                        <span style={{ fontSize: '0.875rem', color: '#F5F5F5' }}>Spłacony</span>
                      </label>
                    </div>
                  </div>

                  {loanStatus === 'repaid' && (
                    <>
                      {/* If repaid, enter the date of repayment */}
                      <div>
                        <label htmlFor="repaymentDate" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '8px', color: '#F5F5F5' }}>
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
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            border: '1px solid rgba(245, 245, 245, 0.2)',
                            backgroundColor: 'rgba(245, 245, 245, 0.1)',
                            color: '#F5F5F5',
                            fontSize: '16px',
                            outline: 'none'
                          }}
                        />
                      </div>

                      {/* and the value of the payment in PLN. */}
                      <div>
                        <label htmlFor="repaymentValuePln" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '8px', color: '#F5F5F5' }}>
                          Wartość spłaty w PLN
                        </label>
                        <input
                          type="number"
                          id="repaymentValuePln"
                          name="repaymentValuePln"
                          value={repaymentValuePln}
                          onChange={(e) => setRepaymentValuePln(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            border: '1px solid rgba(245, 245, 245, 0.2)',
                            backgroundColor: 'rgba(245, 245, 245, 0.1)',
                            color: '#F5F5F5',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'all 0.2s'
                          }}
                          placeholder="Wartość spłaty w PLN"
                          aria-invalid={errors.repaymentValuePln ? "true" : "false"}
                          aria-describedby={errors.repaymentValuePln ? "repaymentValuePln-error" : undefined}
                          onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                          onBlur={(e) => e.target.style.borderColor = 'rgba(245, 245, 245, 0.2)'}
                        />
                        {errors.repaymentValuePln && (
                          <p id="repaymentValuePln-error" style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '4px' }}>
                            {errors.repaymentValuePln}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </>
              )}

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', fontSize: '0.875rem', fontWeight: '500', width: '100%', color: '#F5F5F5', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    id="privacy-consent"
                    name="privacyConsent"
                    checked={privacyConsent}
                    onChange={(e) => setPrivacyConsent(e.target.checked)}
                    style={{ accentColor: '#D4AF37', marginRight: '8px', marginTop: '4px', flexShrink: 0 }}
                    required
                    aria-invalid={errors.privacyConsent ? "true" : "false"}
                    aria-describedby={errors.privacyConsent ? "privacy-consent-error" : undefined}
                  />
                  <span style={{ lineHeight: '1.5', flex: 1 }}>
                    Wyrażam zgodę na przetwarzanie moich danych osobowych przez właściciela strony internetowej uwolnieniekredytowe.pl w celach kontaktowych, marketingowych oraz związanych z nawiązaniem współpracy, zgodnie z <Link to="/privacy-policy" style={{ color: '#fde047', textDecoration: 'underline' }}>polityką prywatności.</Link> Zostałem/am poinformowany/a o przysługujących mi prawach, w tym o możliwości wycofania zgody w dowolnym momencie.<span style={{ color: '#D4AF37' }}>*</span>
                  </span>
                </label>
                {errors.privacyConsent && <p id="privacy-consent-error" style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '4px' }}>{errors.privacyConsent}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  fontWeight: 'bold',
                  padding: '16px 32px',
                  borderRadius: '8px',
                  fontSize: '1.125rem',
                  transition: 'all 0.3s',
                  transform: isSubmitting ? 'none' : 'translateY(0)',
                  backgroundColor: isSubmitting ? 'rgba(245, 245, 245, 0.7)' : '#F5F5F5',
                  border: `4px solid #D4AF37`,
                  color: '#0A1A2F',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.target.style.transform = 'translateY(-4px) scale(1.02)';
                    e.target.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                  }
                }}
                onMouseDown={(e) => {
                  if (!isSubmitting) {
                    e.target.style.transform = 'translateY(0) scale(0.98)';
                    e.target.style.boxShadow = 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)';
                  }
                }}
                onMouseUp={(e) => {
                  if (!isSubmitting) {
                    e.target.style.transform = 'translateY(-4px) scale(1.02)';
                    e.target.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                  }
                }}
              >
                {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
              </button>
            </form>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
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
    </section>
  );
};

export default ContactSection;