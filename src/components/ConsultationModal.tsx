import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useConsultationModal } from '../context/ConsultationModalContext';
import { Link } from 'react-router-dom';

const ConsultationModal: React.FC = () => {
  const { isModalOpen, modalIntent, closeModal, submittedData } = useConsultationModal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+48 ',
    message: '',
    loanType: '', // 'currency' or 'skd'
    agreementDate: '',
    homeBank: '',
    loanTypeDetail: '', // 'indexed', 'denominated', 'unknown'
    loanCurrency: '',
    loanValuePln: '',
    numberOfInstallments: '',
    loanStatus: '', // 'active' or 'repaid'
    repaymentDate: '',
    repaymentValuePln: '',
  });
  
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
    privacyConsent?: string;
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
      setFormData({
        name: '',
        email: '',
        phone: '+48 ',
        message: '',
        loanType: '',
        agreementDate: '',
        homeBank: '',
        loanTypeDetail: '',
        loanCurrency: '',
        loanValuePln: '',
        numberOfInstallments: '',
        loanStatus: '',
        repaymentDate: '',
        repaymentValuePln: '',
      });
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
    const newErrors: typeof errors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Imię i nazwisko jest obowiązkowe.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email jest obowiązkowy.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy format email.';
    }

    // Basic phone number validation regex (adjust as needed for specific formats)
    const phoneRegex = /^(?:\+48)?(?:[ -]?\d{3}){3}$/;
    const cleanedPhone = formData.phone.replace(/[\s-]/g, '');
    
    if (!cleanedPhone.trim() || cleanedPhone.trim() === '+48') {
      newErrors.phone = 'Numer telefonu jest obowiązkowy.';
    } else if (!phoneRegex.test(cleanedPhone)) {
      newErrors.phone = 'Nieprawidłowy format numeru telefonu.';
    }

    if (!privacyConsent) {
      newErrors.privacyConsent = 'Zgoda na przetwarzanie danych jest obowiązkowa.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const prefix = '+48 ';
      let newValue = value;

      if (!newValue.startsWith(prefix) || newValue.length < prefix.length) {
        newValue = prefix;
      }

      setFormData({
        ...formData,
        [name]: newValue
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form Data:', formData);
      
      // Check the intent that opened this modal
      if (modalIntent === 'direct_consultation') {
        // For direct consultation, redirect to Calendly after form submission
        window.open('https://calendly.com/krzysztof-milewski-dsa/30-minutowe-spotkanie', '_blank');
        closeModal();
      } else {
        // For other cases, show success message
        openModal({ ...formData, privacyConsent }, 'form_submission');
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
              <p><strong>Imię i nazwisko:</strong> {submittedData.name}</p>
              <p><strong>Email:</strong> {submittedData.email}</p>
              <p><strong>Telefon:</strong> {submittedData.phone}</p>
              {submittedData.message && <p><strong>Wiadomość:</strong> {submittedData.message}</p>}
              <p><strong>Rodzaj sprawy:</strong> {submittedData.loanType === 'currency' ? 'Kredyt walutowy' : submittedData.loanType === 'skd' ? 'SKD' : 'N/A'}</p>

              {submittedData.loanType === 'currency' && (
                <>
                  <p><strong>Data zawarcia umowy:</strong> {submittedData.agreementDate}</p>
                  <p><strong>Bank:</strong> {submittedData.homeBank}</p>
                  <p><strong>Typ kredytu:</strong> {submittedData.loanTypeDetail === 'indexed' ? 'Indeksowany' : submittedData.loanTypeDetail === 'denominated' ? 'Denominowany' : 'Nie wiem'}</p>
                  <p><strong>Waluta kredytu:</strong> {submittedData.loanCurrency}</p>
                  <p><strong>Wartość kredytu w PLN:</strong> {submittedData.loanValuePln}</p>
                  <p><strong>Liczba rat:</strong> {submittedData.numberOfInstallments}</p>
                  <p><strong>Status kredytu:</strong> {submittedData.loanStatus === 'active' ? 'Aktywny' : 'Spłacony'}</p>
                  {submittedData.loanStatus === 'repaid' && (
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
              <div>
                <label htmlFor="modal-name" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                  Imię i nazwisko <span style={{ color: '#D4AF37' }}>*</span>
                </label>
                <input
                  type="text"
                  id="modal-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'rgba(245, 245, 245, 0.1)',
                    border: '1px solid rgba(245, 245, 245, 0.2)',
                    color: '#F5F5F5',
                    '--tw-ring-color': '#D4AF37',
                  }}
                  placeholder="Twoje imię i nazwisko"
                  required
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="modal-email" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                  Email <span style={{ color: '#D4AF37' }}>*</span>
                </label>
                <input
                  type="email"
                  id="modal-email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
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
                  value={formData.phone}
                  onChange={handleInputChange}
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
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'rgba(245, 245, 245, 0.1)',
                    border: '1px solid rgba(245, 245, 245, 0.2)',
                    color: '#F5F5F5',
                    '--tw-ring-color': '#D4AF37',
                  }}
                  placeholder="Krótko opisz swoją sprawę (opcjonalnie)"
                  required
                ></textarea>
              </div>
                
                {/* Loan Type Selection */}
<div>
  <label className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
    Rodzaj sprawy <span style={{ color: '#D4AF37' }}></span>
  </label>
  <div className="flex space-x-4">
    <label className="inline-flex items-center">
      <input
        type="radio"
        name="loanType"
        value="currency"
        checked={formData.loanType === 'currency'}
        onChange={handleInputChange}
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
        checked={formData.loanType === 'skd'}
        onChange={handleInputChange}
        className="form-radio"
        style={{ accentColor: '#D4AF37' }}
      />
      <span className="ml-2 text-sm" style={{ color: '#F5F5F5' }}>SKD</span>
    </label>
  </div>
  {errors.loanType && <p className="text-red-400 text-sm mt-1">{errors.loanType}</p>}
</div>

{formData.loanType === 'currency' && (
  <>
    {/* Date of conclusion of the agreement */}
    <div>
      <label htmlFor="agreementDate" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
        Data zawarcia umowy <span style={{ color: '#D4AF37' }}></span>
      </label>
      <input
        type="date"
        id="agreementDate"
        name="agreementDate"
        value={formData.agreementDate}
        onChange={handleInputChange}
        className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
        style={{
          backgroundColor: 'rgba(245, 245, 245, 0.1)',
          border: '1px solid rgba(245, 245, 245, 0.2)',
          color: '#F5F5F5',
          '--tw-ring-color': '#D4AF37',
        }}
        
      />
      {errors.agreementDate && <p className="text-red-400 text-sm mt-1">{errors.agreementDate}</p>}
    </div>

    {/* Home bank with which the agreement was concluded */}
    <div>
      <label htmlFor="homeBank" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
        Bank, z którym zawarto umowę <span style={{ color: '#D4AF37' }}></span>
      </label>
      <input
        type="text"
        id="homeBank"
        name="homeBank"
        value={formData.homeBank}
        onChange={handleInputChange}
        className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
        style={{
          backgroundColor: 'rgba(245, 245, 245, 0.1)',
          border: '1px solid rgba(245, 245, 245, 0.2)',
          color: '#F5F5F5',
          '--tw-ring-color': '#D4AF37',
        }}
        placeholder="Nazwa banku"
        
      />
      {errors.homeBank && <p className="text-red-400 text-sm mt-1">{errors.homeBank}</p>}
    </div>

    {/* Type of loan */}
    <div>
      <label className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
        Typ kredytu <span style={{ color: '#D4AF37' }}></span>
      </label>
      <div className="flex flex-wrap gap-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="loanTypeDetail"
            value="indexed"
            checked={formData.loanTypeDetail === 'indexed'}
            onChange={handleInputChange}
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
            checked={formData.loanTypeDetail === 'denominated'}
            onChange={handleInputChange}
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
            checked={formData.loanTypeDetail === 'unknown'}
            onChange={handleInputChange}
            className="form-radio"
            style={{ accentColor: '#D4AF37' }}
          />
          <span className="ml-2 text-sm" style={{ color: '#F5F5F5' }}>Nie wiem</span>
        </label>
      </div>
      {errors.loanTypeDetail && <p className="text-red-400 text-sm mt-1">{errors.loanTypeDetail}</p>}
    </div>

    {/* Loan currency */}
    <div>
      <label htmlFor="loanCurrency" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
        Waluta kredytu <span style={{ color: '#D4AF37' }}></span>
      </label>
      <input
        type="text"
        id="loanCurrency"
        name="loanCurrency"
        value={formData.loanCurrency}
        onChange={handleInputChange}
        className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
        style={{
          backgroundColor: 'rgba(245, 245, 245, 0.1)',
          border: '1px solid rgba(245, 245, 245, 0.2)',
          color: '#F5F5F5',
          '--tw-ring-color': '#D4AF37',
        }}
        placeholder="np. CHF, EUR, USD"
        
      />
      {errors.loanCurrency && <p className="text-red-400 text-sm mt-1">{errors.loanCurrency}</p>}
    </div>

    {/* Value in PLN */}
    <div>
      <label htmlFor="loanValuePln" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
        Wartość kredytu w PLN (w momencie zawarcia umowy) <span style={{ color: '#D4AF37' }}></span>
      </label>
      <input
        type="number"
        id="loanValuePln"
        name="loanValuePln"
        value={formData.loanValuePln}
        onChange={handleInputChange}
        className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
        style={{
          backgroundColor: 'rgba(245, 245, 245, 0.1)',
          border: '1px solid rgba(245, 245, 245, 0.2)',
          color: '#F5F5F5',
          '--tw-ring-color': '#D4AF37',
        }}
        placeholder="Wartość w PLN"
        
      />
      {errors.loanValuePln && <p className="text-red-400 text-sm mt-1">{errors.loanValuePln}</p>}
    </div>

    {/* Number of installments in months */}
    <div>
      <label htmlFor="numberOfInstallments" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
        Liczba rat w miesiącach (zgodnie z umową) <span style={{ color: '#D4AF37' }}></span>
      </label>
      <input
        type="number"
        id="numberOfInstallments"
        name="numberOfInstallments"
        value={formData.numberOfInstallments}
        onChange={handleInputChange}
        className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
        style={{
          backgroundColor: 'rgba(245, 245, 245, 0.1)',
          border: '1px solid rgba(245, 245, 245, 0.2)',
          color: '#F5F5F5',
          '--tw-ring-color': '#D4AF37',
        }}
        placeholder="Liczba miesięcy"
        
      />
      {errors.numberOfInstallments && <p className="text-red-400 text-sm mt-1">{errors.numberOfInstallments}</p>}
    </div>

    {/* Active or repaid loan */}
    <div>
      <label className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
        Status kredytu <span style={{ color: '#D4AF37' }}></span>
      </label>
      <div className="flex space-x-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="loanStatus"
            value="active"
            checked={formData.loanStatus === 'active'}
            onChange={handleInputChange}
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
            checked={formData.loanStatus === 'repaid'}
            onChange={handleInputChange}
            className="form-radio"
            style={{ accentColor: '#D4AF37' }}
          />
          <span className="ml-2 text-sm" style={{ color: '#F5F5F5' }}>Spłacony</span>
        </label>
      </div>
      {errors.loanStatus && <p className="text-red-400 text-sm mt-1">{errors.loanStatus}</p>}
    </div>

    {formData.loanStatus === 'repaid' && (
      <>
        {/* If repaid, enter the date of repayment */}
        <div>
          <label htmlFor="repaymentDate" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
            Data spłaty kredytu <span style={{ color: '#D4AF37' }}></span>
          </label>
          <input
            type="date"
            id="repaymentDate"
            name="repaymentDate"
            value={formData.repaymentDate}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
            style={{
              backgroundColor: 'rgba(245, 245, 245, 0.1)',
              border: '1px solid rgba(245, 245, 245, 0.2)',
              color: '#F5F5F5',
              '--tw-ring-color': '#D4AF37',
            }}
            
          />
          {errors.repaymentDate && <p className="text-red-400 text-sm mt-1">{errors.repaymentDate}</p>}
        </div>

        {/* and the value of the payment in PLN. */}
        <div>
          <label htmlFor="repaymentValuePln" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
            Wartość spłaty w PLN <span style={{ color: '#D4AF37' }}></span>
          </label>
          <input
            type="number"
            id="repaymentValuePln"
            name="repaymentValuePln"
            value={formData.repaymentValuePln}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
            style={{
              backgroundColor: 'rgba(245, 245, 245, 0.1)',
              border: '1px solid rgba(245, 245, 245, 0.2)',
              color: '#F5F5F5',
              '--tw-ring-color': '#D4AF37',
            }}
            placeholder="Wartość spłaty w PLN"
            
          />
          {errors.repaymentValuePln && <p className="text-red-400 text-sm mt-1">{errors.repaymentValuePln}</p>}
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
                    Wyrażam zgodę na przetwarzanie moich danych osobowych poprzez Krzysztof Milewski zgodnie z Rozporządzeniem Parlamentu Europejskiego I Rady (UE) 2016/679 z dnia 27 kwietnia 2016r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych) oraz zapoznałem/am się z <Link to="/privacy-policy" className="text-yellow-300 underline">informacjami dotyczącymi przetwarzania danych osobowych</Link>. <span style={{ color: '#D4AF37' }}>*</span>
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