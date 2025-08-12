```typescript
import React, { useState, useEffect, useRef } from 'react';
import { useStickyButtonVisibility } from '../context/StickyButtonVisibilityContext';
import { useConsultationModal } from '../context/ConsultationModalContext';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  FileText, 
  Users, 
  CheckCircle, 
  Phone, 
  Mail, 
  MessageCircle,
  Star,
  Scale,
  ClipboardList,
  Gavel,
  LineChart,
  Briefcase,
  Search,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const HomePage: React.FC = () => {
  const heroSectionRef = useRef<HTMLElement>(null);
  const { registerHeroSection } = useStickyButtonVisibility();
  const { isModalOpen, closeModal, submittedData, openModal } = useConsultationModal();

  useEffect(() => {
    registerHeroSection(heroSectionRef.current);
  }, [registerHeroSection]);

const [openStep, setOpenStep] = useState<number | null>(null);

// Concierge items
const [openConciergeItem, setOpenConciergeItem] = useState<number | null>(null);
const toggleConciergeItem = (id: number) => {
  setOpenConciergeItem(openConciergeItem === id ? null : id);
};
  
const conciergeItems = [
  {
    id: 1,
    title: "Holistyczna opieka",
    description: "To ja jestem Twoim pierwszym kontaktem. Zbiorę od Ciebie wszystkie niezbędne informacje i dokumenty, a następnie przekazuję je do współpracującej ze mną kancelarii, która specjalizuje się w sprawach kredytów frankowych lub SKD.",
  },
  {
    id: 2,
    title: "Współpraca z ekspertami",
    description: "Kancelaria zajmie się całą, formalną stroną prawną, w tym kontaktem z bankiem. Natomiast w sądzie reprezentować Cię będzie Pełnomocnik, który jest ekspertem w tej dziedzinie. Dzięki temu masz pewność, że sprawą zajmują się specjaliści na każdym etapie.",
  },
  {
    id: 3,
    title: "Ty jesteś w centrum",
    description: "Moją misją jest, abyś czuł się zaopiekowany i na bieżąco informowany, bez konieczności zagłębiania się w skomplikowane kwestie prawne. To ja przekażę Ci wszystkie najważniejsze informacje i wyjaśnię je w przystępny sposób.",
  },
  {
    id: 4,
    title: "Minimalny wysiłek z Twojej strony",
    description: "Dzięki takiemu podziałowi ról, Twój udział w procesie ograniczony jest do absolutnego minimum. Dbam o to, aby wszystkie działania przebiegały płynnie i bezproblemowo, pozwalając Ci odzyskać kontrolę nad finansami bez niepotrzebnego stresu.",
  },
];

// How it works 
  const howItWorksSteps = [
    {
      id: 1,
      title: "Analiza i oferta",
      description: "Przeprowadzę bezpłatną analizę umowy kredytowej i ocenę Twojej sytuacji prawnej. Na jej podstawie przygotuję ofertę dalszego działania, dopasowaną do Twoich potrzeb i możliwości.",
    },
    {
      id: 2,
      title: "Podpisanie umowy",
      description: "Po analizie Twojej sytuacji przygotuję indywidualną ofertę współpracy, dopasowaną do rodzaju umowy kredytowej. Podpisanie umowy to początek kompleksowego działania – zawsze z myślą o Twoim bezpieczeństwie.",
    },
    {
      id: 3,
      title: "Zgromadzenie dokumentów",
      description: "Wspólnie ustalimy, jakie dokumenty są niezbędne do rozpoczęcia postępowania – większość z nich możesz dostarczyć w formie elektronicznej. Na każdym etapie służę wsparciem, aby cały proces przebiegł sprawnie i bez zbędnych formalności.",
    },
    {
      id: 4,
      title: "Zgłoszenie roszczeń",
      description: "Po skompletowaniu niezbędnych dokumentów przygotowuję i złożę w Twoim imieniu reklamację do banku, jasno i precyzyjnie przedstawiając roszczenia. Dbam o każdy szczegół – od podstawy prawnej po spełnienie wszystkich wymogów formalnych – aby zwiększyć szanse na pozytywne rozpatrzenie sprawy.",
    },
    {
      id: 5,
      title: "Wytoczenie powództwa",
      description: "Jeśli bank nie uwzględni roszczeń na etapie reklamacyjnym, zapewniam wsparcie kancelarii prawnej, która może poprowadzić postępowanie sądowe w Twoim imieniu. Dzięki doświadczeniu prawników i starannie opracowanej strategii procesowej zwiększa się szansa na unieważnienie umowy lub odzyskanie nadpłaconych środków.",
    },
    {
      id: 6,
      title: "Wypłata świadczeń",
      description: "Po zakończeniu sprawy uczestniczę w przekazaniu należnych Ci środków od banku. Dbam o to, by proces wypłaty przebiegł sprawnie i bez zbędnych opóźnień – aż do momentu pełnego rozliczenia.",
    },
  ];

  const toggleStep = (id: number) => {
    setOpenStep(openStep === id ? null : id);
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '+48 ',
    message: '',
    loanType: '', // 'currency' or 'skd'
    agreementDate: '',
    homeBank: '',
    originalBank: '', // New field
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
    firstName?: string;
    lastName?: string;
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
  const [isSubmitting, setIsSubmitting] = useState(false);


  const validate = (data: typeof formData, consent: boolean) => {
    const newErrors: {
      firstName?: string; lastName?: string; email?: string; phone?: string; message?: string; privacyConsent?: string;
      loanType?: string; agreementDate?: string; homeBank?: string; loanTypeDetail?: string; loanCurrency?: string; loanValuePln?: string; numberOfInstallments?: string; loanStatus?: string; repaymentDate?: string; repaymentValuePln?: string;
    } = {};

    if (!data.firstName.trim()) {
      newErrors.firstName = 'Imię jest obowiązkowe.';
    }
    if (!data.lastName.trim()) {
      newErrors.lastName = 'Nazwisko jest obowiązkowe.';
    }

    if (!data.email.trim()) {
      newErrors.email = 'Email jest obowiązkowy.';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Nieprawidłowy format email.';
    }

    // Basic phone number validation regex (adjust as needed for specific formats)
    const phoneRegex = /^(?:\+48)?(?:[ -]?\d{3}){3}$/;
    const cleanedPhone = data.phone.replace(/[\s-]/g, '');
    
    if (!cleanedPhone.trim() || cleanedPhone.trim() === '+48') {
      newErrors.phone = 'Numer telefonu jest obowiązkowy.';
    } else if (!phoneRegex.test(cleanedPhone)) {
      newErrors.phone = 'Nieprawidłowy format numeru telefonu.';
    }

    if (!consent) {
      newErrors.privacyConsent = 'Zgoda na przetwarzanie danych jest obowiązkowa.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validate(formData, privacyConsent)) {
    return;
  }

  setIsSubmitting(true);

  try {
    // Prepare webhook payload with all form data and metadata
    const webhookPayload = {
      // Form data
      name: \`${formData.firstName} ${formData.lastName}`, // Combine for 'name' field
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      loanType: formData.loanType,
      agreementDate: formData.agreementDate,
      homeBank: formData.homeBank,
      originalBank: formData.originalBank, // Include new field
      loanTypeDetail: formData.loanTypeDetail,
      loanCurrency: formData.loanCurrency,
      loanValuePln: formData.loanValuePln,
      numberOfInstallments: formData.numberOfInstallments,
      loanStatus: formData.loanStatus,
      repaymentDate: formData.repaymentDate,
      repaymentValuePln: formData.repaymentValuePln,
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
    const response = await fetch('https://n8n.srv948633.hstgr.cloud/webhook/email-workflow', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(webhookPayload) // Changed 'data' to 'webhookPayload'
    });

    if (response.ok) {
      console.log('Webhook sent successfully:', response.status);
    } else {
      console.error('Webhook failed with status:', response.status);
    }
    // Always show success modal for good UX, even if webhook fails
    openModal(formData, 'form_submission');
  } catch (e) {
    console.error('Error sending webhook:', e);
    // Still open modal for user feedback
    openModal(formData, 'form_submission');
  } finally {
    setIsSubmitting(false);
  }
};
  
  
  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: '#0A1A2F' }}>
      {/* Hero Section */}
      <section ref={heroSectionRef} className="relative overflow-hidden" style={{
        backgroundImage: 'url(/hero-background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span style={{ color: '#F5F5F5' }}>Krzysztof Milewski</span>
            </h1>
            <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
  Ekspert ds. unieważniania kredytów walutowych (CHF | EUR | USD) oraz kredytów SKD
</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block mt-2" style={{ color: '#D4AF37' }}>Przedstawiciel Votum Consumer Care</span>
            </h1>
            <button 
              className="font-bold py-4 px-8 rounded-lg text-lg transition-all hover:-translate-y-2 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4"
              style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
              onClick={() => openModal(null, 'direct_consultation')}
            >
              Bezpłatna konsultacja
            </button>
          </div>
        </div>
      </section>

      {/* About the Agent */}
      <section className="py-20" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-80 h-80 rounded-2xl mx-auto lg:mx-0 flex items-center justify-center shadow-xl border-8 overflow-hidden" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
  <img
  src="/votum-background.jpg"
  alt="Krzysztof Milewski - Expert ds. unieważniania kredytów walutowych"
  className="w-full h-full object-cover" // Ensure the image covers the div
/>

</div>

              </div>
              <div>
                <h2 className="text-4xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
                  Pomagam osobom z kredytem we frankach (CHF), euro (EUR), dolarach (USD) oraz z kredytem SKD
                </h2>
                <ul className="text-lg mb-6 leading-relaxed" style={{ color: '#F5F5F5' }}>
                  <li className="text-lg mb-6 leading-relaxed">✅ Analizuję wstępnie i wyliczam korzyści.
Nie ryzykujesz nic – możesz tylko zyskać.</li>
                  <li className="text-lg mb-6 leading-relaxed">💰 Umowy aktywne i spłacone – Pomagam odzyskać należne środki lub pozbyć się zadłużenia.</li>
                  <li className="text-lg mb-6 leading-relaxed">📄 Pomagam na każdym etapie – Od analizy, przez dokumenty, aż po wyrok sądu.</li>
                  <li className="text-lg mb-6 leading-relaxed">Moje usługi na tym etapie są całkowicie bezpłatne. Nic nie ryzykujesz a możesz tylko zyskać!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Concierge Section */}
      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12" style={{ color: '#0A1A2F' }}>
              Moja rola w procesie
            </h2>
            <div className="space-y-8">
              {conciergeItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl shadow-lg border-4 overflow-hidden"
                  style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}
                >
                  <button
                    onClick={() => toggleConciergeItem(item.id)}
                    className="w-full p-6 text-left flex items-center justify-between transition-all hover:bg-opacity-90"
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <h3 className="text-xl font-semibold" style={{ color: '#F5F5F5' }}>
                      {item.title}
                    </h3>
                    <div className="flex-shrink-0 ml-4">
                      {openConciergeItem === item.id ? (
                        <ChevronUp size={24} style={{ color: '#D4AF37' }} />
                      ) : (
                        <ChevronDown size={24} style={{ color: '#D4AF37' }} />
                      )}
                    </div>
                  </button>
                  {openConciergeItem === item.id && (
                    <div className="px-6 pb-6">
                      <div className="pt-4 border-t" style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }}>
                        <p className="text-lg leading-relaxed" style={{ color: '#F5F5F5' }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12" style={{ color: '#F5F5F5' }}>
              Jak to działa?
            </h2>
            <div className="space-y-8">
              {howItWorksSteps.map((step) => (
                <div
                  key={step.id}
                  className="rounded-2xl shadow-lg border-4 overflow-hidden"
                  style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
                >
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="w-full p-6 text-left flex items-center justify-between transition-all hover:bg-opacity-90"
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#0A1A2F', color: '#D4AF37' }}>
                        {step.id}
                      </div>
                      <h3 className="text-xl font-semibold" style={{ color: '#0A1A2F' }}>
                        {step.title}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      {openStep === step.id ? (
                        <ChevronUp size={24} style={{ color: '#D4AF37' }} />
                      ) : (
                        <ChevronDown size={24} style={{ color: '#D4AF37' }} />
                      )}
                    </div>
                  </button>
                  {openStep === step.id && (
                    <div className="px-6 pb-6">
                      <div className="pt-4 border-t" style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }}>
                        <p className="text-lg leading-relaxed" style={{ color: '#0A1A2F' }}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#0A1A2F' }}>
              Skontaktuj się ze mną
            </h2>
            <p className="text-xl leading-relaxed" style={{ color: '#0A1A2F' }}>
              Wypełnij formularz, a ja skontaktuję się z Tobą w celu umówienia bezpłatnej konsultacji.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 rounded-2xl shadow-xl border-4 space-y-6" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                  Imię <span style={{ color: '#D4AF37' }}>*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'rgba(245, 245, 245, 0.1)',
                    border: '1px solid rgba(245, 245, 245, 0.2)',
                    color: '#F5F5F5',
                    '--tw-ring-color': '#D4AF37'
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
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'rgba(245, 245, 245, 0.1)',
                    border: '1px solid rgba(245, 245, 245, 0.2)',
                    color: '#F5F5F5',
                    '--tw-ring-color': '#D4AF37'
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
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'rgba(245, 245, 245, 0.1)',
                  border: '1px solid rgba(245, 245, 245, 0.2)',
                  color: '#F5F5F5',
                  '--tw-ring-color': '#D4AF37'
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
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'rgba(245, 245, 245, 0.1)',
                  border: '1px solid rgba(245, 245, 245, 0.2)',
                  color: '#F5F5F5',
                  '--tw-ring-color': '#D4AF37'
                }}
                placeholder="Twój numer telefonu"
                required
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && <p id="phone-error" className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="loanType" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                Rodzaj sprawy <span style={{ color: '#D4AF37' }}>*</span>
              </label>
              <select
                id="loanType"
                name="loanType"
                value={formData.loanType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 appearance-none"
                style={{
                  backgroundColor: 'rgba(245, 245, 245, 0.1)',
                  border: '1px solid rgba(245, 245, 245, 0.2)',
                  color: '#F5F5F5',
                  '--tw-ring-color': '#D4AF37'
                }}
                required
                aria-invalid={errors.loanType ? "true" : "false"}
                aria-describedby={errors.loanType ? "loanType-error" : undefined}
              >
                <option value="" disabled>Wybierz rodzaj sprawy</option>
                <option value="currency">Kredyt walutowy (CHF, EUR, USD)</option>
                <option value="skd">Umowa SKD</option>
              </select>
              {errors.loanType && <p id="loanType-error" className="text-red-500 text-sm mt-1">{errors.loanType}</p>}
            </div>

            {formData.loanType === 'currency' && (
              <>
                <div>
                  <label htmlFor="agreementDate" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                    Data zawarcia umowy <span style={{ color: '#D4AF37' }}>*</span>
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
                      '--tw-ring-color': '#D4AF37'
                    }}
                    required
                    aria-invalid={errors.agreementDate ? "true" : "false"}
                    aria-describedby={errors.agreementDate ? "agreementDate-error" : undefined}
                  />
                  {errors.agreementDate && <p id="agreementDate-error" className="text-red-500 text-sm mt-1">{errors.agreementDate}</p>}
                </div>

                <div>
                  <label htmlFor="homeBank" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                    Bank, z którym zawarto umowę <span style={{ color: '#D4AF37' }}>*</span>
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
                      '--tw-ring-color': '#D4AF37'
                    }}
                    placeholder="Nazwa banku"
                    required
                    aria-invalid={errors.homeBank ? "true" : "false"}
                    aria-describedby={errors.homeBank ? "homeBank-error" : undefined}
                  />
                  {errors.homeBank && <p id="homeBank-error" className="text-red-500 text-sm mt-1">{errors.homeBank}</p>}
                </div>

                {/* New field: Bank pierwotny (bank aktualny) */}
                <div>
                  <label htmlFor="originalBank" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                    Bank pierwotny (bank aktualny)
                  </label>
                  <input
                    type="text"
                    id="originalBank"
                    name="originalBank"
                    value={formData.originalBank}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: 'rgba(245, 245, 245, 0.1)',
                      border: '1px solid rgba(245, 245, 245, 0.2)',
                      color: '#F5F5F5',
                      '--tw-ring-color': '#D4AF37'
                    }}
                    placeholder="Nazwa banku pierwotnego"
                  />
                </div>

                <div>
                  <label htmlFor="loanTypeDetail" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                    Typ kredytu <span style={{ color: '#D4AF37' }}>*</span>
                  </label>
                  <select
                    id="loanTypeDetail"
                    name="loanTypeDetail"
                    value={formData.loanTypeDetail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 appearance-none"
                    style={{
                      backgroundColor: 'rgba(245, 245, 245, 0.1)',
                      border: '1px solid rgba(245, 245, 245, 0.2)',
                      color: '#F5F5F5',
                      '--tw-ring-color': '#D4AF37'
                    }}
                    required
                    aria-invalid={errors.loanTypeDetail ? "true" : "false"}
                    aria-describedby={errors.loanTypeDetail ? "loanTypeDetail-error" : undefined}
                  >
                    <option value="" disabled>Wybierz typ kredytu</option>
                    <option value="indexed">Indeksowany</option>
                    <option value="denominated">Denominowany</option>
                    <option value="unknown">Nie wiem</option>
                  </select>
                  {errors.loanTypeDetail && <p id="loanTypeDetail-error" className="text-red-500 text-sm mt-1">{errors.loanTypeDetail}</p>}
                </div>

                <div>
                  <label htmlFor="loanCurrency" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                    Waluta kredytu <span style={{ color: '#D4AF37' }}>*</span>
                  </label>
                  <select
                    id="loanCurrency"
                    name="loanCurrency"
                    value={formData.loanCurrency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 appearance-none"
                    style={{
                      backgroundColor: 'rgba(245, 245, 245, 0.1)',
                      border: '1px solid rgba(245, 245, 245, 0.2)',
                      color: '#F5F5F5',
                      '--tw-ring-color': '#D4AF37'
                    }}
                    required
                    aria-invalid={errors.loanCurrency ? "true" : "false"}
                    aria-describedby={errors.loanCurrency ? "loanCurrency-error" : undefined}
                  >
                    <option value="" disabled>Wybierz walutę</option>
                    <option value="CHF">CHF</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                  </select>
                  {errors.loanCurrency && <p id="loanCurrency-error" className="text-red-500 text-sm mt-1">{errors.loanCurrency}</p>}
                </div>

                <div>
                  <label htmlFor="loanValuePln" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                    Wartość kredytu w PLN (w momencie uruchomienia) <span style={{ color: '#D4AF37' }}>*</span>
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
                      '--tw-ring-color': '#D4AF37'
                    }}
                    placeholder="Wartość w PLN"
                    required
                    aria-invalid={errors.loanValuePln ? "true" : "false"}
                    aria-describedby={errors.loanValuePln ? "loanValuePln-error" : undefined}
                  />
                  {errors.loanValuePln && <p id="loanValuePln-error" className="text-red-500 text-sm mt-1">{errors.loanValuePln}</p>}
                </div>

                <div>
                  <label htmlFor="numberOfInstallments" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                    Liczba rat (zgodnie z umową) <span style={{ color: '#D4AF37' }}>*</span>
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
                      '--tw-ring-color': '#D4AF37'
                    }}
                    placeholder="Liczba rat"
                    required
                    aria-invalid={errors.numberOfInstallments ? "true" : "false"}
                    aria-describedby={errors.numberOfInstallments ? "numberOfInstallments-error" : undefined}
                  />
                  {errors.numberOfInstallments && <p id="numberOfInstallments-error" className="text-red-500 text-sm mt-1">{errors.numberOfInstallments}</p>}
                </div>

                <div>
                  <label htmlFor="loanStatus" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                    Status kredytu <span style={{ color: '#D4AF37' }}>*</span>
                  </label>
                  <select
                    id="loanStatus"
                    name="loanStatus"
                    value={formData.loanStatus}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 appearance-none"
                    style={{
                      backgroundColor: 'rgba(245, 245, 245, 0.1)',
                      border: '1px solid rgba(245, 245, 245, 0.2)',
                      color: '#F5F5F5',
                      '--tw-ring-color': '#D4AF37'
                    }}
                    required
                    aria-invalid={errors.loanStatus ? "true" : "false"}
                    aria-describedby={errors.loanStatus ? "loanStatus-error" : undefined}
                  >
                    <option value="" disabled>Wybierz status</option>
                    <option value="active">Aktywny</option>
                    <option value="repaid">Spłacony</option>
                  </select>
                  {errors.loanStatus && <p id="loanStatus-error" className="text-red-500 text-sm mt-1">{errors.loanStatus}</p>}
                </div>

                {formData.loanStatus === 'repaid' && (
                  <>
                    <div>
                      <label htmlFor="repaymentDate" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                        Data spłaty kredytu <span style={{ color: '#D4AF37' }}>*</span>
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
                          '--tw-ring-color': '#D4AF37'
                        }}
                        required
                        aria-invalid={errors.repaymentDate ? "true" : "false"}
                        aria-describedby={errors.repaymentDate ? "repaymentDate-error" : undefined}
                      />
                      {errors.repaymentDate && <p id="repaymentDate-error" className="text-red-500 text-sm mt-1">{errors.repaymentDate}</p>}
                    </div>

                    <div>
                      <label htmlFor="repaymentValuePln" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                        Wartość spłaty kredytu w PLN <span style={{ color: '#D4AF37' }}>*</span>
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
                          '--tw-ring-color': '#D4AF37'
                        }}
                        placeholder="Wartość spłaty w PLN"
                        required
                        aria-invalid={errors.repaymentValuePln ? "true" : "false"}
                        aria-describedby={errors.repaymentValuePln ? "repaymentValuePln-error" : undefined}
                      />
                      {errors.repaymentValuePln && <p id="repaymentValuePln-error" className="text-red-500 text-sm mt-1">{errors.repaymentValuePln}</p>}
                    </div>
                  </>
                )}
              </>
            )}

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                Wiadomość
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'rgba(245, 245, 245, 0.1)',
                  border: '1px solid rgba(245, 245, 245, 0.2)',
                  color: '#F5F5F5',
                  '--tw-ring-color': '#D4AF37'
                }}
                placeholder="Krótko opisz swoją sprawę lub zadaj pytanie"
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
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
```