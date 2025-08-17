import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Scale, FileText, Users, Award, CheckCircle, Phone, Mail, MapPin, Clock, Star, TrendingUp, Shield, Gavel, DollarSign, AlertTriangle, Calendar, User, MessageSquare } from 'lucide-react';
import { useStickyButtonVisibility } from '../context/StickyButtonVisibilityContext';
import { useConsultationModal } from '../context/ConsultationModalContext';
import DatePicker from 'react-datepicker';
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
  { primaryBank: 'Alior Bank S.A.', transitionalBank: null, currentBank: 'Alior Bank S.A.' }
];

const HomePage: React.FC = () => {
  const { registerHeroSection } = useStickyButtonVisibility();
  const { openModal } = useConsultationModal();
  const heroRef = useRef<HTMLElement>(null);

  // Form state variables - synchronized with ConsultationModal
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+48 ');
  const [message, setMessage] = useState('');
  const [loanType, setLoanType] = useState('');
  const [agreementDate, setAgreementDate] = useState<Date | null>(null);
  const [originalBank, setOriginalBank] = useState('');
  const [loanTypeDetail, setLoanTypeDetail] = useState('');
  const [loanCurrency, setLoanCurrency] = useState('PLN');
  const [loanValuePln, setLoanValuePln] = useState('');
  const [numberOfInstallments, setNumberOfInstallments] = useState('');
  const [loanStatus, setLoanStatus] = useState('');
  const [repaymentDate, setRepaymentDate] = useState<Date | null>(null);
  const [repaymentValuePln, setRepaymentValuePln] = useState('');
  const [displayedBankTransition, setDisplayedBankTransition] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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

  useEffect(() => {
    if (heroRef.current) {
      registerHeroSection(heroRef.current);
    }
  }, [registerHeroSection]);

  // Real-time validation handlers
  const handleLoanValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLoanValuePln(value);
    
    // Clear previous error
    setLoanValueError('');
    
    if (value.trim()) {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) {
        setLoanValueError('Wartość kredytu musi być liczbą.');
      } else if (numValue <= 0) {
        setLoanValueError('Wartość kredytu musi być większa od 0.');
      } else if (numValue > 999999999) {
        setLoanValueError('Wartość kredytu jest zbyt duża.');
      }
    }
  };

  const handleInstallmentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Remove any non-digit characters
    value = value.replace(/[^\d]/g, '');
    
    setNumberOfInstallments(value);
    
    // Clear previous error
    setInstallmentsError('');
    
    if (value.trim()) {
      const numValue = parseInt(value, 10);
      if (isNaN(numValue)) {
        setInstallmentsError('Liczba rat musi być liczbą całkowitą.');
      } else if (numValue <= 0) {
        setInstallmentsError('Liczba rat musi być większa od 0.');
      } else if (numValue > 600) {
        setInstallmentsError('Liczba rat nie może przekraczać 600 miesięcy.');
      }
    }
  };

  const handleRepaymentValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRepaymentValuePln(value);
    
    // Clear previous error
    setRepaymentValueError('');
    
    if (value.trim()) {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) {
        setRepaymentValueError('Wartość spłaty musi być liczbą.');
      } else if (numValue <= 0) {
        setRepaymentValueError('Wartość spłaty musi być większa od 0.');
      } else if (numValue > 999999999) {
        setRepaymentValueError('Wartość spłaty jest zbyt duża.');
      }
    }
  };

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
    setLoanCurrency('PLN');
    setLoanValuePln('');
    setNumberOfInstallments('');
    setLoanStatus('');
    setRepaymentDate(null);
    setRepaymentValuePln('');
    setDisplayedBankTransition('');
    setPrivacyConsent(false);
    setLoanValueError('');
    setInstallmentsError('');
    setRepaymentValueError('');
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
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
        formType: 'contact_form',
        source: 'homepage_contact_section'
      };

      // Send to webhook (NO Calendly redirection)
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
        // Show success message and reset form
        setShowSuccessMessage(true);
        resetForm();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      });
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A1A2F' }}>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/hero-background.jpg)',
            filter: 'brightness(0.3)'
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" style={{ color: '#F5F5F5' }}>
            Ekspert ds. unieważniania<br />
            <span style={{ color: '#D4AF37' }}>kredytów walutowych</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
            Specjalizuję się w sprawach kredytów CHF, EUR, USD oraz umów SKD. 
            Bezpłatna konsultacja i działanie w oparciu o sukces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => openModal(null, 'direct_consultation')}
              className="font-bold py-4 px-8 rounded-lg text-lg transition-all hover:-translate-y-2 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4"
              style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}
            >
              Umów bezpłatną konsultację
            </button>
            <Link
              to="#contact-section"
              className="font-bold py-4 px-8 rounded-lg text-lg transition-all hover:-translate-y-2 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4"
              style={{ backgroundColor: 'transparent', borderColor: '#D4AF37', color: '#F5F5F5' }}
            >
              Skontaktuj się
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#0A1A2F' }}>
              Moje usługi
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#0A1A2F' }}>
              Pomagam klientom w unieważnianiu umów kredytowych i odzyskiwaniu należnych środków
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Link
              to="/services/currency"
              className="group p-8 rounded-2xl shadow-xl border-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}
            >
              <div className="w-16 h-16 rounded-2xl shadow-xl border-4 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <Scale size={32} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
                Unieważnianie umów walutowych
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: '#F5F5F5' }}>
                Specjalizuję się w sprawach kredytów denominowanych w CHF, EUR, USD. 
                Pomogę Ci unieważnić umowę i odzyskać nadpłacone środki.
              </p>
            </Link>
            
            <Link
              to="/services/skd"
              className="group p-8 rounded-2xl shadow-xl border-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}
            >
              <div className="w-16 h-16 rounded-2xl shadow-xl border-4 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <FileText size={32} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
                Unieważnianie umów SKD
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: '#F5F5F5' }}>
                Pomoc w sprawach dotyczących umów sprzedaży konsumenckiej na odległość 
                oraz nieuczciwych praktyk handlowych.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <Users size={32} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-3xl font-bold mb-2" style={{ color: '#D4AF37' }}>500+</h3>
              <p className="text-lg" style={{ color: '#F5F5F5' }}>Zadowolonych klientów</p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <Award size={32} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-3xl font-bold mb-2" style={{ color: '#D4AF37' }}>95%</h3>
              <p className="text-lg" style={{ color: '#F5F5F5' }}>Skuteczność</p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <TrendingUp size={32} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-3xl font-bold mb-2" style={{ color: '#D4AF37' }}>50M+</h3>
              <p className="text-lg" style={{ color: '#F5F5F5' }}>PLN odzyskanych</p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <Clock size={32} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-3xl font-bold mb-2" style={{ color: '#D4AF37' }}>15+</h3>
              <p className="text-lg" style={{ color: '#F5F5F5' }}>lat doświadczenia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Synchronized with ConsultationModal */}
      <section id="contact-section" className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#0A1A2F' }}>
              Skontaktuj się ze mną
            </h2>
            <p className="text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#0A1A2F' }}>
              Wypełnij formularz, a skontaktuję się z Tobą w ciągu 24 godzin
            </p>
          </div>

          {showSuccessMessage && (
            <div className="mb-8 p-6 rounded-2xl shadow-xl border-4 text-center" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <CheckCircle size={48} style={{ color: '#D4AF37' }} className="mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#F5F5F5' }}>
                Wiadomość została wysłana!
              </h3>
              <p className="text-lg" style={{ color: '#F5F5F5' }}>
                Dziękuję za kontakt. Skontaktuję się z Tobą w najbliższym czasie.
              </p>
            </div>
          )}

          <div className="p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
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
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              {/* Loan Type Selection */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                  Rodzaj sprawy <span style={{ color: '#D4AF37' }}>*</span>
                </label>
                <div className="flex flex-wrap gap-4">
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
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="loanType"
                      value="other"
                      checked={loanType === 'other'}
                      onChange={(e) => setLoanType(e.target.value)}
                      className="form-radio"
                      style={{ accentColor: '#D4AF37' }}
                    />
                    <span className="ml-2 text-sm" style={{ color: '#F5F5F5' }}>Inne</span>
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
                      required
                    >
                      <option value="PLN" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5' }}>
                        PLN
                      </option>
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
                      type="text"
                      inputMode="decimal"
                      id="loanValuePln"
                      name="loanValuePln"
                      value={loanValuePln}
                      onChange={handleLoanValueChange}
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
                      type="text"
                      inputMode="numeric"
                      id="numberOfInstallments"
                      name="numberOfInstallments"
                      value={numberOfInstallments}
                      onChange={handleInstallmentsChange}
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

          {/* Contact Information */}
          <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                <Phone size={32} style={{ color: '#F5F5F5' }} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#0A1A2F' }}>Telefon</h3>
              <p className="text-lg" style={{ color: '#0A1A2F' }}>+48 601 227 876</p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                <Mail size={32} style={{ color: '#F5F5F5' }} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#0A1A2F' }}>Email</h3>
              <p className="text-lg" style={{ color: '#0A1A2F' }}>krzysztof.milewski@dsa.pl</p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                <Clock size={32} style={{ color: '#F5F5F5' }} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#0A1A2F' }}>Godziny pracy</h3>
              <p className="text-lg" style={{ color: '#0A1A2F' }}>Pon-Pt: 9:00-17:00</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;