import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, CheckCircle, Scale, CreditCard, FileText, Users, Award, TrendingUp } from 'lucide-react';
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

  // Form state variables - identical to ConsultationModal
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

  // Real-time validation handlers - identical to ConsultationModal
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
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, '');
    setNumberOfInstallments(value);
    
    if (value.trim()) {
      const numValue = parseInt(value, 10);
      if (isNaN(numValue)) {
        setInstallmentsError('Liczba rat musi być liczbą całkowitą.');
      } else if (numValue <= 0) {
        setInstallmentsError('Liczba rat musi być większa od 0.');
      } else if (numValue > 600) {
        setInstallmentsError('Liczba rat nie może przekraczać 600 miesięcy.');
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
    setPrivacyConsent(false);
    setDisplayedBankTransition('');
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

      // Send to webhook - NO Calendly redirection
      fetch('https://n8n.srv948633.hstgr.cloud/webhook/243235be-417h-4446-8h22-52186b5fd6d4', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(webhookPayload)
      }).then(response => {
        if (response.ok) {
          console.log('Contact form webhook sent successfully:', response.status);
          setShowSuccessMessage(true);
          resetForm();
          // Auto-hide success message after 5 seconds
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 5000);
        } else {
          console.error('Contact form webhook failed with status:', response.status);
        }
      }).catch(e => {
        console.error('Error sending contact form webhook:', e);
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
            Expert specjalizujący się w sprawach kredytów walutowych i SKD
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
            Profesjonalna pomoc prawna w unieważnianiu umów kredytowych. 
            Bezpłatna konsultacja i działanie w oparciu o sukces.
          </p>
          <button
            onClick={() => openModal(null, 'direct_consultation')}
            className="font-bold py-4 px-8 rounded-lg text-xl transition-all hover:-translate-y-2 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4"
            style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}
          >
            Umów bezpłatną konsultację
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#0A1A2F' }}>
              Nasze usługi
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#0A1A2F' }}>
              Specjalizujemy się w kompleksowej obsłudze spraw związanych z nieuczciwymi praktykami banków
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-8 rounded-2xl shadow-xl border-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <div className="w-16 h-16 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <Scale size={32} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center" style={{ color: '#F5F5F5' }}>
                Kredyty walutowe
              </h3>
              <p className="text-lg mb-6 text-center leading-relaxed" style={{ color: '#F5F5F5' }}>
                Unieważnianie umów kredytów denominowanych w CHF, EUR, USD. 
                Odzyskiwanie nadpłaconych kwot i anulowanie zadłużenia.
              </p>
              <div className="text-center">
                <Link 
                  to="/services/currency"
                  className="inline-block font-bold py-3 px-6 rounded-lg text-md transition-all hover:-translate-y-1 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4"
                  style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}
                >
                  Dowiedz się więcej →
                </Link>
              </div>
            </div>
            
            <div className="p-8 rounded-2xl shadow-xl border-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <div className="w-16 h-16 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <CreditCard size={32} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center" style={{ color: '#F5F5F5' }}>
                Umowy SKD
              </h3>
              <p className="text-lg mb-6 text-center leading-relaxed" style={{ color: '#F5F5F5' }}>
                Pomoc w sprawach sprzedaży konsumenckiej na odległość. 
                Unieważnianie nieuczciwych umów i odzyskiwanie środków.
              </p>
              <div className="text-center">
                <Link 
                  to="/services/skd"
                  className="inline-block font-bold py-3 px-6 rounded-lg text-md transition-all hover:-translate-y-1 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4"
                  style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}
                >
                  Dowiedz się więcej →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
              Dlaczego warto nas wybrać?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-20 h-20 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <FileText size={40} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
                Bezpłatna konsultacja
              </h3>
              <p className="leading-relaxed" style={{ color: '#F5F5F5' }}>
                Pierwsza konsultacja jest całkowicie bezpłatna. 
                Oceniamy Twoją sprawę bez żadnych zobowiązań.
              </p>
            </div>
            
            <div className="text-center p-8">
              <div className="w-20 h-20 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <Users size={40} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
                Działanie w oparciu o sukces
              </h3>
              <p className="leading-relaxed" style={{ color: '#F5F5F5' }}>
                Nasze wynagrodzenie uzależnione jest od wygranej. 
                Nie wygrywamy - nie płacisz.
              </p>
            </div>
            
            <div className="text-center p-8">
              <div className="w-20 h-20 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <Award size={40} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
                Doświadczenie i skuteczność
              </h3>
              <p className="leading-relaxed" style={{ color: '#F5F5F5' }}>
                Lata doświadczenia w sprawach kredytowych 
                i wysoki odsetek wygranych spraw.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#0A1A2F' }}>
              Nasze osiągnięcia
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl shadow-lg border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <TrendingUp size={48} style={{ color: '#D4AF37' }} className="mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2" style={{ color: '#F5F5F5' }}>95%</div>
              <p className="text-lg" style={{ color: '#F5F5F5' }}>Skuteczność w sprawach</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl shadow-lg border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <Users size={48} style={{ color: '#D4AF37' }} className="mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2" style={{ color: '#F5F5F5' }}>500+</div>
              <p className="text-lg" style={{ color: '#F5F5F5' }}>Zadowolonych klientów</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl shadow-lg border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <Award size={48} style={{ color: '#D4AF37' }} className="mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2" style={{ color: '#F5F5F5' }}>10+</div>
              <p className="text-lg" style={{ color: '#F5F5F5' }}>lat doświadczenia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Synchronized with ConsultationModal */}
      <section id="contact-section" className="py-20" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
                Skontaktuj się z nami
              </h2>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
                Wypełnij formularz, a my skontaktujemy się z Tobą w ciągu 24 godzin
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#D4AF37' }}>
                    <Phone size={24} style={{ color: '#0A1A2F' }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: '#F5F5F5' }}>Telefon</h3>
                    <p style={{ color: '#F5F5F5' }}>+48 601 227 876</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#D4AF37' }}>
                    <Mail size={24} style={{ color: '#0A1A2F' }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: '#F5F5F5' }}>Email</h3>
                    <p style={{ color: '#F5F5F5' }}>krzysztof.milewski@dsa.pl</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#D4AF37' }}>
                    <MapPin size={24} style={{ color: '#0A1A2F' }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: '#F5F5F5' }}>Adres</h3>
                    <p style={{ color: '#F5F5F5' }}>Ogrody Bielawy 6, 05-520 Bielawa</p>
                  </div>
                </div>
              </div>

              {/* Contact Form - Identical to ConsultationModal */}
              <div className="p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                {showSuccessMessage ? (
                  <div className="text-center py-12">
                    <CheckCircle size={64} style={{ color: '#D4AF37' }} className="mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
                      Wiadomość została wysłana!
                    </h3>
                    <p className="text-lg" style={{ color: '#F5F5F5' }}>
                      Dziękujemy za kontakt. Skontaktujemy się z Tobą w najbliższym czasie.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
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
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;