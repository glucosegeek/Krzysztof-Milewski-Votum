import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Scale, Shield, Users, CheckCircle, Phone, Mail, MapPin, Star, ArrowRight, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useConsultationModal } from '../context/ConsultationModalContext';
import { useStickyButtonVisibility } from '../context/StickyButtonVisibilityContext';
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
  const { openModal } = useConsultationModal();
  const { registerHeroSection } = useStickyButtonVisibility();
  const heroRef = useRef<HTMLElement>(null);

  // Contact form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+48 ');
  const [message, setMessage] = useState('');
  const [loanType, setLoanType] = useState('');
  const [agreementDate, setAgreementDate] = useState<Date | null>(null);
  const [originalBank, setOriginalBank] = useState('');
  const [displayedBankTransition, setDisplayedBankTransition] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [errors, setErrors] = useState<{ 
    firstName?: string; 
    lastName?: string; 
    email?: string; 
    phone?: string; 
    message?: string;
    privacyConsent?: string;
    agreementDate?: string;
    originalBank?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (heroRef.current) {
      registerHeroSection(heroRef.current);
    }
  }, [registerHeroSection]);

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
      agreementDate?: string;
      originalBank?: string;
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

    // Conditional validation for currency loan fields
    if (loanType === 'currency') {
      if (!agreementDate) {
        newErrors.agreementDate = 'Data zawarcia umowy jest obowiązkowa dla kredytów walutowych.';
      }
      if (!originalBank) {
        newErrors.originalBank = 'Bank pierwotny jest obowiązkowy dla kredytów walutowych.';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      
      const webhookPayload = {
        // Form data
        name: `${firstName} ${lastName}`,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        message: message,
        loanType: loanType,
        agreementDate: agreementDate ? agreementDate.toLocaleDateString('pl-PL') : '',
        originalBank: originalBank,
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
        source: 'homepage_contact'
      };

      try {
        const response = await fetch('https://n8n.srv948633.hstgr.cloud/webhook/243235be-417h-4446-8h22-52186b5fd6d4', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(webhookPayload)
        });

        if (response.ok) {
          console.log('Contact form webhook sent successfully:', response.status);
          setSubmitSuccess(true);
          
          // Reset form
          setFirstName('');
          setLastName('');
          setEmail('');
          setPhone('+48 ');
          setMessage('');
          setLoanType('');
          setAgreementDate(null);
          setOriginalBank('');
          setDisplayedBankTransition('');
          setPrivacyConsent(false);
          setErrors({});
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            setSubmitSuccess(false);
          }, 5000);
        } else {
          console.error('Contact form webhook failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error sending contact form webhook:', error);
      } finally {
        setIsSubmitting(false);
      }
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
            Specjalizuję się w sprawach dotyczących kredytów CHF, EUR, USD oraz umów SKD. 
            Pomogę Ci odzyskać nadpłacone środki.
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
              Oferuję kompleksową pomoc prawną w sprawach kredytów walutowych i umów SKD
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl shadow-xl border-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <div className="w-16 h-16 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <Scale size={32} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center" style={{ color: '#F5F5F5' }}>
                Kredyty walutowe
              </h3>
              <p className="text-lg leading-relaxed mb-6 text-center" style={{ color: '#F5F5F5' }}>
                Unieważnianie umów kredytowych denominowanych w CHF, EUR, USD. 
                Pomoc w odzyskaniu nadpłaconych środków.
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
                <Shield size={32} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center" style={{ color: '#F5F5F5' }}>
                Umowy SKD
              </h3>
              <p className="text-lg leading-relaxed mb-6 text-center" style={{ color: '#F5F5F5' }}>
                Unieważnianie umów sprzedaży konsumenckiej na odległość. 
                Ochrona przed nieuczciwymi praktykami handlowymi.
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

      {/* Why Choose Me Section */}
      <section className="py-20" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
              Dlaczego warto mi zaufać?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#D4AF37' }}>
                <Users size={40} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
                Doświadczenie
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: '#F5F5F5' }}>
                Wieloletnie doświadczenie w sprawach kredytów walutowych i umów SKD
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#D4AF37' }}>
                <CheckCircle size={40} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
                Skuteczność
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: '#F5F5F5' }}>
                Wysokie wskaźniki wygranych spraw i zadowolonych klientów
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#D4AF37' }}>
                <Star size={40} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
                Indywidualne podejście
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: '#F5F5F5' }}>
                Każda sprawa jest analizowana indywidualnie z pełnym zaangażowaniem
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#0A1A2F' }}>
                Współpraca z <span style={{ color: '#D4AF37' }}>Votum S.A.</span>
              </h2>
              <p className="text-xl mb-6 leading-relaxed" style={{ color: '#0A1A2F' }}>
                Jestem przedstawicielem Votum Consumer Care - wiodącej firmy w Polsce 
                specjalizującej się w ochronie praw konsumentów.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle size={24} style={{ color: '#D4AF37' }} className="mt-1 flex-shrink-0" />
                  <p className="text-lg" style={{ color: '#0A1A2F' }}>
                    Profesjonalna obsługa prawna na najwyższym poziomie
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle size={24} style={{ color: '#D4AF37' }} className="mt-1 flex-shrink-0" />
                  <p className="text-lg" style={{ color: '#0A1A2F' }}>
                    Bezpłatna analiza wstępna każdej sprawy
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle size={24} style={{ color: '#D4AF37' }} className="mt-1 flex-shrink-0" />
                  <p className="text-lg" style={{ color: '#0A1A2F' }}>
                    Działanie w oparciu o sukces - płacisz tylko za wygraną
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div 
                className="w-full h-96 rounded-2xl shadow-xl border-4 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(/votum-background.jpg)',
                  borderColor: '#D4AF37'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-20" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
                Skontaktuj się ze mną
              </h2>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
                Masz pytania? Chcesz dowiedzieć się więcej o swoich prawach? 
                Napisz do mnie - odpowiem najszybciej jak to możliwe.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                    <Phone size={24} style={{ color: '#0A1A2F' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: '#F5F5F5' }}>
                      Telefon
                    </h3>
                    <p className="text-lg" style={{ color: '#F5F5F5' }}>
                      +48 601 227 876
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                    <Mail size={24} style={{ color: '#0A1A2F' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: '#F5F5F5' }}>
                      Email
                    </h3>
                    <p className="text-lg" style={{ color: '#F5F5F5' }}>
                      krzysztof.milewski@dsa.pl
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                    <MapPin size={24} style={{ color: '#0A1A2F' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: '#F5F5F5' }}>
                      Obsługuję klientów
                    </h3>
                    <p className="text-lg" style={{ color: '#F5F5F5' }}>
                      Z całej Polski
                    </p>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: '#F5F5F5' }}>
                    Śledź mnie w mediach społecznościowych
                  </h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.facebook.com/ANTYTOKSYK"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg flex items-center justify-center transition-all hover:scale-110 border-2"
                      style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
                    >
                      <Facebook size={24} style={{ color: '#0A1A2F' }} />
                    </a>
                    <a
                      href="https://www.instagram.com/pan_od_toksycznych_kredytow/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg flex items-center justify-center transition-all hover:scale-110 border-2"
                      style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
                    >
                      <Instagram size={24} style={{ color: '#0A1A2F' }} />
                    </a>
                    <a
                      href="https://www.tiktok.com/@krzysztofmilewski59?is_from_webapp=1&sender_device=pc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg flex items-center justify-center transition-all hover:scale-110 border-2"
                      style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
                    >
                      <div className="w-6 h-6 rounded-sm" style={{ backgroundColor: '#0A1A2F' }}>
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                        </svg>
                      </div>
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg flex items-center justify-center transition-all hover:scale-110 border-2"
                      style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
                    >
                      <Linkedin size={24} style={{ color: '#0A1A2F' }} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                {submitSuccess ? (
                  <div className="text-center py-12">
                    <CheckCircle size={64} style={{ color: '#D4AF37' }} className="mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-4" style={{ color: '#0A1A2F' }}>
                      Wiadomość została wysłana!
                    </h3>
                    <p className="text-lg" style={{ color: '#0A1A2F' }}>
                      Dziękuję za kontakt. Odpowiem najszybciej jak to możliwe.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                          Imię <span style={{ color: '#D4AF37' }}>*</span>
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                          style={{
                            borderColor: errors.firstName ? '#ef4444' : '#D4AF37',
                            '--tw-ring-color': '#D4AF37'
                          }}
                          placeholder="Twoje imię"
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                          Nazwisko <span style={{ color: '#D4AF37' }}>*</span>
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                          style={{
                            borderColor: errors.lastName ? '#ef4444' : '#D4AF37',
                            '--tw-ring-color': '#D4AF37'
                          }}
                          placeholder="Twoje nazwisko"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                        Email <span style={{ color: '#D4AF37' }}>*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                        style={{
                          borderColor: errors.email ? '#ef4444' : '#D4AF37',
                          '--tw-ring-color': '#D4AF37'
                        }}
                        placeholder="Twój adres email"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                        Numer telefonu <span style={{ color: '#D4AF37' }}>*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => {
                          const prefix = '+48 ';
                          let newValue = e.target.value;
                          if (!newValue.startsWith(prefix) || newValue.length < prefix.length) {
                            newValue = prefix;
                          }
                          setPhone(newValue);
                        }}
                        className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                        style={{
                          borderColor: errors.phone ? '#ef4444' : '#D4AF37',
                          '--tw-ring-color': '#D4AF37'
                        }}
                        placeholder="Twój numer telefonu"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                        Wiadomość <span style={{ color: '#D4AF37' }}>*</span>
                      </label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                        style={{
                          borderColor: errors.message ? '#ef4444' : '#D4AF37',
                          '--tw-ring-color': '#D4AF37'
                        }}
                        placeholder="Opisz swoją sprawę..."
                      />
                      {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>

                    {/* Loan Type Selection */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                        Rodzaj sprawy
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
                          />
                          <span className="ml-2 text-sm" style={{ color: '#0A1A2F' }}>Kredyt walutowy</span>
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
                          <span className="ml-2 text-sm" style={{ color: '#0A1A2F' }}>SKD</span>
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
                          <span className="ml-2 text-sm" style={{ color: '#0A1A2F' }}>Inne</span>
                        </label>
                      </div>
                    </div>

                    {loanType === 'currency' && (
                      <>
                        {/* Date of conclusion of the agreement */}
                        <div>
                          <label htmlFor="agreementDate" className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                            Data zawarcia umowy <span style={{ color: '#D4AF37' }}>*</span>
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
                            className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                            wrapperClassName="w-full"
                            placeholderText="DD.MM.YYYY"
                            style={{
                              borderColor: errors.agreementDate ? '#ef4444' : '#D4AF37',
                              '--tw-ring-color': '#D4AF37'
                            }}
                          />
                          {errors.agreementDate && <p className="text-red-500 text-sm mt-1">{errors.agreementDate}</p>}
                        </div>

                        {/* Original bank */}
                        <div>
                          <label htmlFor="originalBank" className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                            Bank pierwotny <span style={{ color: '#D4AF37' }}>*</span>
                          </label>
                          <select
                            id="originalBank"
                            name="originalBank"
                            value={originalBank}
                            onChange={(e) => handleBankSelection(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                            style={{
                              borderColor: errors.originalBank ? '#ef4444' : '#D4AF37',
                              '--tw-ring-color': '#D4AF37'
                            }}
                          >
                            <option value="">
                              Wybierz bank
                            </option>
                            {bankData.map((bank, index) => (
                              <option 
                                key={index} 
                                value={bank.primaryBank}
                              >
                                {bank.primaryBank}
                              </option>
                            ))}
                          </select>
                          {errors.originalBank && <p className="text-red-500 text-sm mt-1">{errors.originalBank}</p>}
                          
                          {displayedBankTransition && (
                            <div className="mt-3 p-3 rounded-lg border-2" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: '#D4AF37' }}>
                              <p className="text-sm font-medium mb-1" style={{ color: '#D4AF37' }}>
                                Łańcuch przejęć banku:
                              </p>
                              <p className="text-sm leading-relaxed" style={{ color: '#0A1A2F' }}>
                                {displayedBankTransition}
                              </p>
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    <div className="mb-6">
                      <label className="flex items-start text-sm font-medium w-full" style={{ color: '#0A1A2F' }}>
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
                          Wyrażam zgodę na przetwarzanie moich danych osobowych przez właściciela strony internetowej uwolnieniekredytowe.pl w celach kontaktowych, marketingowych oraz związanych z nawiązaniem współpracy, zgodnie z <Link to="/privacy-policy" className="text-blue-600 underline">polityką prywatności.</Link> Zostałem/am poinformowany/a o przysługujących mi prawach, w tym o możliwości wycofania zgody w dowolnym momencie.<span style={{ color: '#D4AF37' }}>*</span>
                        </span>
                      </label>
                      {errors.privacyConsent && <p className="text-red-500 text-sm mt-1">{errors.privacyConsent}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full font-bold py-4 px-8 rounded-lg text-lg transition-all hover:-translate-y-1 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37', color: '#F5F5F5' }}
                    >
                      {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
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