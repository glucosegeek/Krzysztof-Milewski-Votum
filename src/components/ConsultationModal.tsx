import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useConsultationModal } from '../context/ConsultationModalContext';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';

const ConsultationModal: React.FC = () => {
  const { isModalOpen, modalIntent, closeModal, submittedData } = useConsultationModal();
  
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
  const [loanCurrency, setLoanCurrency] = useState('');
  const [loanValuePln, setLoanValuePln] = useState('');
  const [numberOfInstallments, setNumberOfInstallments] = useState('');
  const [loanStatus, setLoanStatus] = useState('');
  const [repaymentDate, setRepaymentDate] = useState<Date | null>(null);
  const [repaymentValuePln, setRepaymentValuePln] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [errors, setErrors] = useState<{ 
    firstName?: string; 
    lastName?: string; 
    email?: string; 
    phone?: string; 
    message?: string;
    privacyConsent?: string;
    loanType?: string;
    agreementDate?: string;
    homeBank?: string;
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

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling background
      // Focus the first input when modal opens for accessibility
      if (modalIntent !== 'form_submission') {
        const firstInput = modalRef.current?.querySelector('input, textarea') as HTMLElement;
        if (firstInput) {
          firstInput.focus();
        }
      }
    } else {
      document.body.style.overflow = ''; // Restore scrolling
      // Clear form and errors when modal closes
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('+48 '); // Reset phone to default
      setMessage('');
      setLoanType('');
      setAgreementDate(null);
      setHomeBank('');
      setOriginalBank('');
      setLoanTypeDetail('');
      setLoanCurrency('');
      setLoanValuePln('');
      setNumberOfInstallments('');
      setLoanStatus('');
      setRepaymentDate(null);
      setRepaymentValuePln('');
      setPrivacyConsent(false); // Reset privacy consent
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
      homeBank?: string;
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('+48 '); // Reset phone to default
      setMessage('');
      setLoanType('');
      setAgreementDate(null);
      setHomeBank('');
      setOriginalBank('');
      setLoanTypeDetail('');
      setLoanCurrency('');
      setLoanValuePln('');
      setNumberOfInstallments('');
      setLoanStatus('');
      setRepaymentDate(null);
      setRepaymentValuePln('');
      setPrivacyConsent(false); // Reset privacy consent
      console.log('Form Data:', { firstName, lastName, email, phone, message });
      
      // Check the intent that opened this modal
      if (modalIntent === 'direct_consultation') {
        // For direct consultation, send to webhook then redirect to Calendly
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
          homeBank: homeBank,
          originalBank: originalBank,
          loanTypeDetail: loanTypeDetail,
          loanCurrency: loanCurrency,
          loanValuePln: loanValuePln,
          numberOfInstallments: numberOfInstallments,
          loanStatus: loanStatus,
          repaymentDate: repaymentDate,
          repaymentValuePln: repaymentValuePln,
          privacyConsent: privacyConsent,

          // Platform and metadata
          platform: 'web',
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          referrer: document.referrer || 'direct',

          // Additional metadata
          formType: 'consultation_modal',
          source: 'consultation_button'
        };

        // Send to webhook
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
          // Always redirect to Calendly and close modal for good UX
          window.open('https://calendly.com/krzysztof-milewski-dsa/30-minutowe-spotkanie', '_blank');
          closeModal();
        });
      } else {
        // For other cases, show success message
        openModal(null, 'form_submission');
        
        // Auto-close modal after 5 seconds
        setTimeout(() => {
          closeModal();
        }, 5000);
      }
    }
  };

  if (!isModalOpen) return null;

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
            {/* Display submitted data */}
            {submittedData && <div className="mt-8 text-left space-y-2" style={{ color: '#F5F5F5' }}>
              <p><strong>Imię:</strong> {submittedData.firstName}</p>
              <p><strong>Nazwisko:</strong> {submittedData.lastName}</p>
              <p><strong>Email:</strong> {submittedData.email}</p>
              <p><strong>Telefon:</strong> {submittedData.phone}</p>
              {submittedData.message && <p><strong>Wiadomość:</strong> {submittedData.message}</p>}
              <p><strong>Rodzaj sprawy:</strong> {submittedData.loanType === 'currency' ? 'Kredyt walutowy' : submittedData.loanType === 'skd' ? 'SKD' : 'N/A'}</p>

              {submittedData.loanType === 'currency' && (
                <>
                  <p><strong>Data zawarcia umowy:</strong> {submittedData.agreementDate}</p>
                  <p><strong>Bank aktualny:</strong> {submittedData.originalBank}</p>
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
            </div>}
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
                    aria-invalid={errors.firstName ? "true" : "false"}
                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                  />
                  {errors.firstName && <p id="firstName-error" className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
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
                    aria-invalid={errors.lastName ? "true" : "false"}
                    aria-describedby={errors.lastName ? "lastName-error" : undefined}
                  />
                  {errors.lastName && <p id="lastName-error" className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
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
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                ></textarea>
              </div>

              {modalIntent === 'direct_consultation' && (
                <>
                  {/* Loan Type Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                      Rodzaj sprawy
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
                      {/* Date of conclusion of the agreement */}
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

                      {/* Original bank */}
                      <div>
                        <label htmlFor="modal-originalBank" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                          Bank pierwotny (bank aktualny)
                        </label>
                        <input
                          type="text"
                          id="modal-originalBank"
                          name="originalBank"
                          value={originalBank}
                          onChange={(e) => setOriginalBank(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                          style={{
                            backgroundColor: 'rgba(245, 245, 245, 0.1)',
                            border: '1px solid rgba(245, 245, 245, 0.2)',
                            color: '#F5F5F5',
                            '--tw-ring-color': '#D4AF37',
                          }}
                          placeholder="Nazwa banku aktualnego"
                        />
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
                      </div>

                      {/* Loan currency */}
                      <div>
                        <label htmlFor="modal-loanCurrency" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                          Waluta kredytu
                        </label>
                        <input
                          type="text"
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
                          placeholder="np. CHF, EUR, USD"
                        />
                      </div>

                      {/* Value in PLN */}
                      <div>
                        <label htmlFor="modal-loanValuePln" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                          Wartość kredytu w PLN (w momencie zawarcia umowy)
                        </label>
                        <input
                          type="number"
                          id="modal-loanValuePln"
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
                        />
                      </div>

                      {/* Number of installments in months */}
                      <div>
                        <label htmlFor="modal-numberOfInstallments" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                          Liczba rat w miesiącach (zgodnie z umową)
                        </label>
                        <input
                          type="number"
                          id="modal-numberOfInstallments"
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
                        />
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
                      </div>

                      {loanStatus === 'repaid' && (
                        <>
                          {/* If repaid, enter the date of repayment */}
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

                          {/* and the value of the payment in PLN. */}
                          <div>
                            <label htmlFor="modal-repaymentValuePln" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                              Wartość spłaty w PLN
                            </label>
                            <input
                              type="number"
                              id="modal-repaymentValuePln"
                              name="repaymentValuePln"
                              value={repaymentValuePln}
                              onChange={(e) => setRepaymentValuePln(e.target.value)}
                              className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                              style={{
                                backgroundColor: 'rgba(245, 245, 245, 0.1)',
                                border: '1px solid rgba(245, 245, 245, 0.2)',
                                color: '#F5F5F5',
                                '--tw-ring-color': '#D4AF37',
                              }}
                              placeholder="Wartość spłaty w PLN"
                            />
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
};

export default ConsultationModal;