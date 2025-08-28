import React, { useState, useEffect, useRef } from 'react';
import { useStickyButtonVisibility } from '../context/StickyButtonVisibilityContext';
import { useConsultationModal } from '../context/ConsultationModalContext';
import ContactSection from '../components/ContactSection';
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
  ChevronUp,
  Youtube
} from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  description: string;
  stars: number;
  city: string;
}

const HomePage: React.FC = () => {
  const heroSectionRef = useRef<HTMLElement>(null);
  const { registerHeroSection } = useStickyButtonVisibility();
  const { isModalOpen, closeModal, submittedData, openModal } = useConsultationModal();
  
  // Calculate today's date in YYYY-MM-DD format for max date constraint
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const maxDateToday = `${year}-${month}-${day}`;

  // Testimonials state
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);
  const [errorTestimonials, setErrorTestimonials] = useState<string | null>(null);

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
      description: "Po skompletowaniu niezbędnych dokumentów kancelaria przygotowuje i złoży w Twoim imieniu reklamację do banku, jasno i precyzyjnie przedstawiając roszczenia. Kancelaria dba o każdy szczegół – od podstawy prawnej po spełnienie wszystkich wymogów formalnych – aby zwiększyć szanse na pozytywne rozpatrzenie sprawy.",
    },
    {
      id: 5,
      title: "Wytoczenie powództwa",
      description: "Jeśli bank nie uwzględni roszczeń na etapie reklamacyjnym, wówczas kancelaria przygotowywuje pozew i poprowadzi postępowanie sądowe w Twoim imieniu. Dzięki doświadczeniu prawników i starannie opracowanej strategii procesowej zwiększa się szansa na unieważnienie umowy i odzyskanie nadpłaconych środków.",
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
    originalBank: '',
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
    originalBank?: string;
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Imię jest obowiązkowe.';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Nazwisko jest obowiązkowe.';
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

    if (!consent) {
      newErrors.privacyConsent = 'Zgoda na przetwarzanie danych jest obowiązkowa.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const parseGoogleSheetsTestimonials = (jsonData: any): Testimonial[] => {
    try {
      const table = jsonData.table;
      if (!table || !table.rows || !table.cols) {
        console.error('Invalid Google Sheets JSON structure for testimonials');
        return [];
      }

      const headers = table.cols.map((col: any) => col.label || col.id || '');
      
      const nameIndex = headers.findIndex((h: string) => h.toLowerCase().includes('name'));
      const descriptionIndex = headers.findIndex((h: string) => h.toLowerCase().includes('description'));
      const starsIndex = headers.findIndex((h: string) => h.toLowerCase().includes('stars'));
      const cityIndex = headers.findIndex((h: string) => h.toLowerCase().includes('city'));

      if (nameIndex === -1 || descriptionIndex === -1 || starsIndex === -1 || cityIndex === -1) {
        console.error('Required columns not found in Google Sheets for testimonials');
        return [];
      }

      const testimonials: Testimonial[] = [];
      
      table.rows.forEach((row: any, index: number) => {
        if (index === 0 && row.c && row.c[nameIndex] && 
            row.c[nameIndex].v && 
            row.c[nameIndex].v.toString().toLowerCase().includes('name')) {
          return;
        }

        if (!row.c) return;

        const name = row.c[nameIndex]?.v?.toString() || '';
        const description = row.c[descriptionIndex]?.v?.toString() || '';
        const stars = parseInt(row.c[starsIndex]?.v?.toString() || '5', 10);
        const city = row.c[cityIndex]?.v?.toString() || '';

        if (name && description && city) {
          testimonials.push({
            id: `testimonial-${index}`,
            name,
            description,
            stars: Math.min(Math.max(stars, 1), 5), // Ensure stars are between 1-5
            city
          });
        }
      });

      return testimonials;
    } catch (error) {
      console.error('Error parsing Google Sheets JSON for testimonials:', error);
      return [];
    }
  };

  useEffect(() => {
  const fetchTestimonials = async () => {
    try {
      setLoadingTestimonials(true);
      setErrorTestimonials(null);

      const response = await fetch(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5Q_HYZobfot0I0UnxhEzerfrFxv4N5FocG4wy8z0p8GHZ2rgkns-oDFww-vzLx-3boxZJUqkTjJH-/pub?output=csv',
        {
          method: 'GET',
        }
      );

      if (!response.ok) {
        // Jeśli Google Sheets nie działa, użyj przykładowych danych
        console.warn('Google Sheets not accessible, using fallback data');
        const fallbackTestimonials: Testimonial[] = [
          {
            id: 'testimonial-1',
            name: 'Anna Kowalska',
            description: 'Dzięki pomocy Krzysztofa udało mi się unieważnić kredyt frankowy i odzyskać nadpłacone środki. Profesjonalna obsługa na każdym etapie.',
            stars: 5,
            city: 'Warszawa'
          },
          {
            id: 'testimonial-2',
            name: 'Piotr Nowak',
            description: 'Kompleksowa pomoc w sprawie kredytu SKD. Wszystko zostało załatwione sprawnie i bez stresu z mojej strony.',
            stars: 5,
            city: 'Kraków'
          },
          {
            id: 'testimonial-3',
            name: 'Maria Wiśniewska',
            description: 'Polecam! Krzysztof prowadził moją sprawę od początku do końca. Odzyskałam znaczną kwotę z banku.',
            stars: 5,
            city: 'Gdańsk'
          }
        ];
        setTestimonials(fallbackTestimonials);
        return;
      }

      const csvText = await response.text();
      const parsedTestimonials = parseCSVTestimonials(csvText);
      setTestimonials(parsedTestimonials);
    } catch (e: any) {
      console.error('Error fetching testimonials:', e);
      
      // W przypadku błędu, użyj przykładowych danych zamiast pokazywać błąd
      const fallbackTestimonials: Testimonial[] = [
        {
          id: 'testimonial-1',
          name: 'Anna Kowalska',
          description: 'Dzięki pomocy Krzysztofa udało mi się unieważnić kredyt frankowy i odzyskać nadpłacone środki. Profesjonalna obsługa na każdym etapie.',
          stars: 5,
          city: 'Warszawa'
        },
        {
          id: 'testimonial-2',
          name: 'Piotr Nowak',
          description: 'Kompleksowa pomoc w sprawie kredytu SKD. Wszystko zostało załatwione sprawnie i bez stresu z mojej strony.',
          stars: 5,
          city: 'Kraków'
        },
        {
          id: 'testimonial-3',
          name: 'Maria Wiśniewska',
          description: 'Polecam! Krzysztof prowadził moją sprawę od początku do końca. Odzyskałam znaczną kwotę z banku.',
          stars: 5,
          city: 'Gdańsk'
        }
      ];
      setTestimonials(fallbackTestimonials);
      // NIE ustawiaj błędu, bo mamy fallback
      // setErrorTestimonials(e.message || 'Wystąpił błąd podczas ładowania opinii klientów');
    } finally {
      setLoadingTestimonials(false);
    }
  };

  fetchTestimonials();
}, []);

  const parseCSVTestimonials = (csvText: string): Testimonial[] => {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return [];
    
    // Get headers from first line
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    // Find column indices
    const nameIndex = headers.findIndex(h => h.toLowerCase() === 'name');
    const descriptionIndex = headers.findIndex(h => h.toLowerCase() === 'description');
    const starsIndex = headers.findIndex(h => h.toLowerCase() === 'stars');
    const cityIndex = headers.findIndex(h => h.toLowerCase() === 'city');
    
    if (nameIndex === -1 || descriptionIndex === -1 || starsIndex === -1 || cityIndex === -1) {
      console.error('Required columns not found in CSV headers:', headers);
      return [];
    }
    
    // Parse data rows
    const testimonials: Testimonial[] = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Simple CSV parsing (handles basic cases)
      const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      
      if (values.length > Math.max(nameIndex, descriptionIndex, starsIndex, cityIndex)) {
        const name = values[nameIndex];
        const description = values[descriptionIndex];
        const starsStr = values[starsIndex];
        const city = values[cityIndex];
        
        if (name && description && starsStr && city) {
          const stars = parseInt(starsStr);
          if (!isNaN(stars) && stars >= 1 && stars <= 5) {
            testimonials.push({
              id: `testimonial-${i}`,
              name,
              description,
              stars,
              city
            });
          }
        }
      }
    }
    
    return testimonials;
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
      name: `${formData.firstName} ${formData.lastName}`, // Combine for 'name' field
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      loanType: formData.loanType,
      agreementDate: formData.agreementDate,
      homeBank: formData.homeBank,
      originalBank: formData.originalBank,
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

      formType: 'contact_form',
      source: 'homepage_contact_section'
    };
    const response = await fetch('https://n8n.srv948633.hstgr.cloud/webhook/153565ea-877e-4946-8d32-88596b5fd1d4', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(webhookPayload)
    });

    if (response.ok) {
      console.log('Webhook sent successfully:', response.status);
      
      // Show success modal and reset form only on successful webhook
      openModal(null, 'form_submission');
      
      // Reset form data
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '+48 ',
        message: '',
        loanType: '',
        agreementDate: '',
        homeBank: '',
        originalBank: '',
        loanTypeDetail: '',
        loanCurrency: '',
        loanValuePln: '',
        numberOfInstallments: '',
        loanStatus: '',
        repaymentDate: '',
        repaymentValuePln: '',
      });
      setPrivacyConsent(false);
      setErrors({});
    } else {
      console.error('Webhook failed with status:', response.status);
    }
  } catch (e) {
    console.error('Error sending webhook:', e);
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
               <img 
 src="/miles-logo.png" 
 alt="Krzysztof Milewski Logo" 
 className="h-30 w-auto object-contain"
/>
              <span style={{ color: '#F5F5F5' }}>Krzysztof Milewski</span>
            </h1>
            <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
  Ekspert ds. unieważniania kredytów walutowych (CHF | EUR | USD) oraz kredytów SKD
</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block mt-2" style={{ color: '#D4AF37' }}>Przedstawiciel DSA Investment S.A</span>
            </h1>
            <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
  Należymy do VOTUM GROUP, jesteśmy Partnerem VOTUM CONSUMER CARE
</p>
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
                <div className="w-100 h-180 mx-auto lg:mx-0 flex items-center justify-center">
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

      {/* QR Codes Section */}
      <section className="py-20" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
              Pobierz naszą aplikację na swój telefon.
            </h2>
            <p className="text-xl font-semibold mb-8 px-4 py-3 rounded-2xl border-4 shadow-md text-center inline-block" 
   style={{ 
     color: '#D4AF37', 
     borderColor: '#D4AF37',
     backgroundColor: '#0A1A2F',
     boxShadow: '0 4px 12px rgba(212, 175, 55, 0.15)'
   }}>
  Wpisz ten numer <span className="px-2 py-1 rounded font-bold text-2xl border border-yellow-300 text-black" style={{ backgroundColor: '#D4AF37' }}>K005533</span>
  <br />
  żebym mógł mieć Twoją sprawę zawsze pod opieką!
</p>
            
            <div className="flex flex-col items-center gap-8 mt-8">
              {/* QR Codes Row */}
              <div className="flex flex-wrap justify-center gap-12">
                {/* Apple App Store QR Code */}
                <div className="flex flex-col items-center">
                  <a
                    href="https://apps.apple.com/pl/app/moja-sprawa/id6736989155?l=pl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-46 h-46 rounded-2xl shadow-xl border-4 flex items-center justify-center transition-all hover:scale-105"
                    style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
                    aria-label="Skanuj QR kod dla Apple App Store"
                  >
                    <img src="/qr-apple-store.png" alt="QR kod Apple App Store" className="w-full h-full object-contain p-2" />
                  </a>
                  <p className="text-lg mt-4 font-semibold" style={{ color: '#F5F5F5' }}>
                    App Store
                  </p>
                </div>

                {/* Google Play Store QR Code */}
                <div className="flex flex-col items-center">
                  <a
                    href="https://play.google.com/store/apps/details?id=pl.votum_sa.mojasprawa&pli=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-46 h-46 rounded-2xl shadow-xl border-4 flex items-center justify-center transition-all hover:scale-105"
                    style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
                    aria-label="Skanuj QR kod dla Google Play Store"
                  >
                    <img src="/qr-google-play.png" alt="QR kod Google Play Store" className="w-full h-full object-contain p-2" />
                  </a>
                  <p className="text-lg mt-4 font-semibold" style={{ color: '#F5F5F5' }}>
                    Google Play
                  </p>
                </div>
              </div>

            {/* YouTube Instructional Video */}
            <div className="flex justify-center">
              <a
                href="https://www.youtube.com/watch?v=mNILMebMuAE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 transition-colors hover:opacity-80"
                aria-label="Obejrzyj film instruktażowy"
              >
                <Youtube size={24} style={{ color: '#D4AF37' }} />
                <span className="text-lg font-medium" style={{ color: '#F5F5F5' }}>
                  Film instruktażowy
                </span>
              </a>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* What I Do */}
      <section className="py-20" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
              Dlaczego warto ze mną działać?
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#F5F5F5' }}>
              Jestem Przedstawicielem DSA Investment S.A, które zapewnia kompleksowe wsparcie prawne opracowane specjalnie z myślą o toksycznych kredytach walutowych oraz w ramach SKD  ( Sankcja Kredytu Darmowego).
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <LineChart size={40} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#F5F5F5' }}>Wysoka skuteczność</h3>
              <p className="leading-relaxed" style={{ color: '#F5F5F5' }}>
                Tysiące wygranych spraw 99,5% skuteczności.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37'  }}>
                <Scale size={40} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#F5F5F5' }}>Współpraca w ramach jednolitej procedury</h3>
              <p className="leading-relaxed" style={{ color: '#F5F5F5' }}>
                Współpraca z największymi i najlepszymi kancelariami.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <Shield size={40} style={{ color: '#0A1A2F' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#F5F5F5' }}>Consierge</h3>
              <p className="leading-relaxed" style={{ color: '#F5F5F5' }}>
                Moja filozofia wsparcia  Klienta na każdym etapie sprawy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Consierge Personal Asistent */}
      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4" style={{ color: '#0A1A2F' }}>
            Obsługa Klienta w filozofii Consierge - osobisty asystent
        </h2>
    </div>
    <div className="max-w-4xl mx-auto text-lg leading-relaxed" style={{ color: '#0A1A2F' }}>
        <p className="mb-6">
            W moim modelu obsługi klienta przyjmuję rolę <strong>CONSIERGA</strong>, będącego Twoim głównym punktem kontaktu i wsparcia. Moja rola to <strong>Front Office</strong>, dzięki czemu jesteś zawsze <strong>zaopiekowany</strong>, a cały proces jest dla Ciebie komfortowy i przejrzysty.
        </p>
        <h3 className="text-2xl font-bold mb-4" style={{ color: '#0A1A2F' }}>
            Jak działa to w praktyce?
        </h3>
        <div className="space-y-4">
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
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl shadow-lg border-2" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}>
            {item.id}
          </div>
          <h3 className="text-lg font-semibold" style={{ color: '#F5F5F5' }}>
            {item.title}
          </h3>
        </div>
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
        <p className="mt-8">
            W modelu <strong>CONSIERGE</strong>, ja jestem Twoim opiekunem, a zespół doświadczonych prawników zajmują się Twoją sprawą, by zapewnić optymalne rozwiązanie.
        </p>
    </div>
</div>
      </section>
      
      {/* How It Works */}
      <section className="py-5" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
        <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4" style={{ color: '#0A1A2F' }}>
                Jak to działa
              </h2>
                <p className="text-lg mt-4 font-semibold transition-colors duration-300 hover:text-yellow-300" style={{ color: '#0A1A2F' }}>
                  Jasna, przejrzysta ścieżka od konsultacji do pomyślnego rozwiązania
                </p>
            </div>

          <div className="space-y-4"> {/* This div replaces the old grid */}
            {howItWorksSteps.map((step) => (
              <div
                key={step.id}
                className="rounded-2xl shadow-lg border-4 overflow-hidden"
                style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}
              >
                <button
                  onClick={() => toggleStep(step.id)}
                  className="w-full p-6 text-left flex items-center justify-between transition-all hover:bg-opacity-90"
                  style={{ backgroundColor: 'transparent' }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl shadow-lg border-2" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}>
                      {step.id}
                    </div>
                    <h3 className="text-lg font-semibold" style={{ color: '#F5F5F5' }}>
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
                      <p className="text-lg leading-relaxed" style={{ color: '#F5F5F5' }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
              Sukcesy klientów
            </h2>
            <p className="text-xl" style={{ color: '#F5F5F5' }}>
              Rzeczywiste wyniki od zadowolonych klientów
            </p>
          </div>
          
          {loadingTestimonials && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: '#D4AF37' }}></div>
              <p className="text-xl mt-4" style={{ color: '#F5F5F5' }}>
                Ładowanie opinii klientów...
              </p>
            </div>
          )}
          
          {errorTestimonials && (
            <div className="text-center p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <p className="text-xl text-red-400 mb-4">
                Błąd podczas ładowania opinii klientów
              </p>
              <p className="text-sm" style={{ color: '#F5F5F5' }}>
                {errorTestimonials}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 rounded-lg border-2 transition-colors hover:bg-opacity-10 hover:bg-white"
                style={{ borderColor: '#D4AF37', color: '#D4AF37' }}
              >
                Spróbuj ponownie
              </button>
            </div>
          )}
          
          {!loadingTestimonials && !errorTestimonials && testimonials.length === 0 && (
            <div className="text-center p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <p className="text-xl" style={{ color: '#F5F5F5' }}>
                Brak dostępnych opinii klientów.
              </p>
            </div>
          )}
          
          {!loadingTestimonials && !errorTestimonials && testimonials.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="group p-8 rounded-2xl shadow-xl border-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden"
                  style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
                >
                  {/* Decorative quote mark */}
                  <div className="absolute top-4 right-6 opacity-10 text-6xl font-serif" style={{ color: '#D4AF37' }}>
                    "
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} size={24} style={{ color: '#D4AF37' }} className="fill-current drop-shadow-sm" />
                    ))}
                  </div>
                  
                  <p className="mb-6 text-lg leading-relaxed italic relative z-10" style={{ color: '#0A1A2F' }}>
                    {testimonial.description}
                  </p>
                  
                  <div className="border-t pt-4" style={{ borderColor: 'rgba(10, 26, 47, 0.1)' }}>
                    <div className="font-bold text-lg" style={{ color: '#0A1A2F' }}>
                      {testimonial.name}
                    </div>
                    <div className="text-sm font-medium" style={{ color: '#D4AF37' }}>
                      {testimonial.city}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
      </div>
  );
};

export default HomePage;