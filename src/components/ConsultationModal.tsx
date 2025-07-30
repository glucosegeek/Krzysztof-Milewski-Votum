import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useConsultationModal } from '../context/ConsultationModalContext';
import { Link } from 'react-router-dom';

const ConsultationModal: React.FC = () => {
  const { isModalOpen, closeModal } = useConsultationModal();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const modalRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling background
      // Focus the first input when modal opens for accessibility
      const firstInput = modalRef.current?.querySelector('input, textarea') as HTMLElement;
      if (firstInput) {
        firstInput.focus();
      }
    } else {
      document.body.style.overflow = ''; // Restore scrolling
      // Clear form and errors when modal closes
      setName('');
      setEmail('');
      setMessage('');
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
  }, [isModalOpen, closeModal]);

  const validate = () => {
  const newErrors: { name?: string; email?: string; privacyConsent?: string } = {}; // Update type
  if (!name.trim()) {
    newErrors.name = 'Imię i nazwisko jest obowiązkowe.';
  }
  if (!email.trim()) {
    newErrors.email = 'Email jest obowiązkowy.';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = 'Nieprawidłowy format email.';
  }
  if (!privacyConsent) { // Add this block
    newErrors.privacyConsent = 'Zgoda na przetwarzanie danych jest obowiązkowa.';
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // In a real application, you would send this data to your backend
      console.log('Form Data:', { name, email, message });
      // Redirect to Calendly
      window.open('https://calendly.com/krzysztof-milewski-dsa/30-minutowe-spotkanie', '_blank');
      closeModal(); // Close the modal after redirection
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
        className="relative w-full max-w-md p-8 rounded-2xl shadow-2xl border-4"
        style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 rounded-full transition-colors hover:bg-opacity-10 hover:bg-white"
          style={{ color: '#F5F5F5' }}
          aria-label="Zamknij"
        >
          <X size={24} />
        </button>

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
            <label htmlFor="modal-message" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
              Wiadomość (opcjonalnie)
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
              placeholder="Krótko opisz swoją sprawę (opcjonalnie)"
            ></textarea>
          </div>

<div className="mb-6">
  <label className="flex items-start text-sm font-medium" style={{ color: '#F5F5F5' }}>
    <input
      type="checkbox"
      id="privacy-consent"
      name="privacyConsent"
      checked={privacyConsent}
      onChange={(e) => setPrivacyConsent(e.target.checked)}
      className="mr-2 mt-1"
      style={{ accentColor: '#D4AF37' }} // Styles the checkbox itself
      required
      aria-invalid={errors.privacyConsent ? "true" : "false"}
      aria-describedby={errors.privacyConsent ? "privacy-consent-error" : undefined}
    />
   <span className="leading-relaxed">
  Wyrażam zgodę na przetwarzanie moich danych osobowych poprzez Krzysztof Milewski zgodnie z Rozporządzeniem Parlamentu Europejskiego I Rady (UE) 2016/679 z dnia 27 kwietnia 2016r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych) oraz zapoznałem/am się z <Link to="/privacy-policy" className="text-yellow-300 underline">informacjami dotyczącymi przetwarzania danych osobowych</Link>. <span style={{ color: '#D4AF37' }}>*</span>
</span>
  </label>
  {errors.privacyConsent && <p id="privacy-consent-error" className="text-red-500 text-sm mt-1">{errors.privacyConsent}</p>}
</div>
          
          <button
            type="submit"
            className="w-full font-bold py-4 px-8 rounded-lg text-lg transition-all hover:-translate-y-1 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4"
            style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}
          disabled={!privacyConsent}
            >
            Umów bezpłatną konsultację
          </button>
              <p className="text-center text-sm mt-4" style={{ color: '#F5F5F5' }}>
                Kliknięcie przycisku przekieruje Cię do strony rezerwacji terminu w Calendly. 
              </p>
        </form>
      </div>
    </div>
  );
};

export default ConsultationModal;