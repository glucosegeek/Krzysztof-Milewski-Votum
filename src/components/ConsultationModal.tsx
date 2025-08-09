import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useConsultationModal } from '../context/ConsultationModalContext';
import { Link } from 'react-router-dom';

const ConsultationModal: React.FC = () => {
  const { isModalOpen, modalIntent, closeModal, submittedData } = useConsultationModal();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+48 '); // Default area code
  const [message, setMessage] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string; privacyConsent?: string }>({});
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
      setName('');
      setEmail('');
      setPhone('+48 '); // Reset phone to default
      setMessage('');
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
    const newErrors: { name?: string; email?: string; phone?: string; privacyConsent?: string } = {};
    if (!name.trim()) {
      newErrors.name = 'Imię i nazwisko jest obowiązkowe.';
    }
    if (!email.trim()) {
      newErrors.email = 'Email jest obowiązkowy.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Nieprawidłowy format email.';
    }

    // Updated regex for Polish phone numbers:
    // Allows for +48 prefix (optional), followed by 9 digits,
    // with optional spaces or hyphens between groups of 3 digits.
    const phoneRegex = /^(?:\+48)?(?:[ -]?\d{3}){3}$/;
    
    // Clean the phone number for validation by removing spaces and hyphens
    const cleanedPhone = phone.replace(/[\s-]/g, '');

    if (!cleanedPhone.trim() || cleanedPhone.trim() === '+48') { // Check for empty or just "+48"
      newErrors.phone = 'Numer telefonu jest obowiązkowy.';
    } else if (!phoneRegex.test(cleanedPhone)) { // Validate the cleaned number
      newErrors.phone = 'Nieprawidłowy format numeru telefonu.';
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
      console.log('Form Data:', { name, email, phone, message });
      
      // Check the intent that opened this modal
      if (modalIntent === 'direct_consultation') {
        // For direct consultation, redirect to Calendly after form submission
        window.open('https://calendly.com/krzysztof-milewski-dsa/30-minutowe-spotkanie', '_blank');
        closeModal();
      } else {
        // For other cases, show success message
        openModal({ name, email, phone, message, privacyConsent }, 'form_submission');
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
