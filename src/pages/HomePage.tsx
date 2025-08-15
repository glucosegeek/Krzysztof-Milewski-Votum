import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Scale, FileText, Users, Award, CheckCircle, Phone, Mail, MapPin, Clock, Star, TrendingUp, Shield, Gavel, DollarSign, AlertTriangle, ChevronDown, ChevronUp, BookOpen, Newspaper } from 'lucide-react';
import { useStickyButtonVisibility } from '../context/StickyButtonVisibilityContext';
import { useConsultationModal } from '../context/ConsultationModalContext';
import DatePicker from 'react-datepicker';

const HomePage: React.FC = () => {
  const { registerHeroSection } = useStickyButtonVisibility();
  const { openModal } = useConsultationModal();
  const heroRef = useRef<HTMLElement>(null);
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [newsArticles, setNewsArticles] = useState<any[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '+48 ',
    message: '',
    loanType: '',
    agreementDate: null as Date | null,
    homeBank: '',
    originalBank: '',
    loanTypeDetail: '',
    loanCurrency: '',
    loanValuePln: '',
    numberOfInstallments: '',
    loanStatus: '',
    repaymentDate: null as Date | null,
    repaymentValuePln: '',
    privacyConsent: false
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (heroRef.current) {
      registerHeroSection(heroRef.current);
    }
  }, [registerHeroSection]);

  const currencyIcons = [
    { name: 'EUR' },
    { name: 'USD' },
    { name: 'CHF' }
  ];

  const testimonials = [
    {
      name: "Anna Kowalska",
      location: "Warszawa",
      text: "Dzięki pomocy eksperta odzyskałam ponad 150 000 zł z kredytu frankowego. Profesjonalna obsługa i pełne wsparcie przez cały proces.",
      rating: 5,
      case: "Kredyt CHF - 180 000 zł"
    },
    {
      name: "Marek Nowak",
      location: "Kraków",
      text: "Sceptycznie podchodziłem do sprawy, ale rezultat przeszedł moje najśmielsze oczekiwania. Unieważnienie umowy i zwrot nadpłat.",
      rating: 5,
      case: "Kredyt EUR - 220 000 zł"
    },
    {
      name: "Katarzyna Wiśniewska",
      location: "Gdańsk",
      text: "Kompleksowa pomoc od analizy po wyrok sądu. Kredyt został unieważniony, a bank musi zwrócić wszystkie nadpłacone kwoty.",
      rating: 5,
      case: "Kredyt CHF - 95 000 zł"
    }
  ];

  const faqs = [
    {
      id: 1,
      question: "Czy konsultacja jest rzeczywiście bezpłatna?",
      answer: "Tak, pierwsza konsultacja jest całkowicie bezpłatna i bez zobowiązań. Podczas niej analizujemy Twoją sytuację, sprawdzamy dokumenty i informujemy o możliwościach prawnych."
    },
    {
      id: 2,
      question: "Ile trwa proces sądowy z bankiem?",
      answer: "Czas trwania procesu może się różnić, ale zazwyczaj postępowanie w pierwszej instancji trwa od 12 do 24 miesięcy. Reprezentujemy klientów przez cały proces."
    },
    {
      id: 3,
      question: "Co się stanie, jeśli przegram sprawę?",
      answer: "Działamy w oparciu o sukces - nasze wynagrodzenie uzależnione jest od wygranej. W przypadku przegranej nie płacisz nam honorarium."
    },
    {
      id: 4,
      question: "Czy mogę dochodzić roszczeń po spłaceniu kredytu?",
      answer: "Tak, możesz dochodzić zwrotu nadpłaconych kwot nawet po spłaceniu kredytu. Jeśli umowa zawierała klauzule abuzywne, masz prawo do odzyskania różnicy."
    }
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % currencyIcons.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [currencyIcons.length]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const parseGoogleSheetsJson = (jsonData: any): any[] => {
    try {
      const table = jsonData.table;
      if (!table || !table.rows || !table.cols) {
        console.error('Invalid Google Sheets JSON structure');
        return [];
      }

      const headers = table.cols.map((col: any) => col.label || col.id || '');
      
      const idIndex = headers.findIndex((h: string) => h.toLowerCase().includes('id'));
      const titleIndex = headers.findIndex((h: string) => h.toLowerCase().includes('title'));
      const dateIndex = headers.findIndex((h: string) => h.toLowerCase().includes('date'));
      const contentIndex = headers.findIndex((h: string) => h.toLowerCase().includes('content'));

      if (idIndex === -1 || titleIndex === -1 || contentIndex === -1) {
        console.error('Required columns not found in Google Sheets');
        return [];
      }

      const articles: any[] = [];
      
      table.rows.forEach((row: any, index: number) => {
        if (index === 0 && row.c && row.c[titleIndex] && 
            row.c[titleIndex].v && 
            row.c[titleIndex].v.toString().toLowerCase().includes('title')) {
          return;
        }

        if (!row.c) return;

        const id = row.c[idIndex]?.v?.toString() || '';
        const title = row.c[titleIndex]?.v?.toString() || '';
        const date = row.c[dateIndex]?.v?.toString() || '';
        const content = row.c[contentIndex]?.v?.toString() || '';

        if (id && title && content) {
          articles.push({
            id,
            title,
            date,
            content
          });
        }
      });

      return articles;
    } catch (error) {
      console.error('Error parsing Google Sheets JSON:', error);
      return [];
    }
  };

  const parseDateString = (dateString: string): Date => {
    const googleSheetsDateMatch = dateString.match(/^Date\((\d{4}),(\d{1,2}),(\d{1,2})\)$/);
    if (googleSheetsDateMatch) {
      const year = parseInt(googleSheetsDateMatch[1], 10);
      const month = parseInt(googleSheetsDateMatch[2], 10);
      const day = parseInt(googleSheetsDateMatch[3], 10);
      const date = new Date(year, month, day);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }

    const parts = dateString.split('.');
    if (parts.length === 3) {
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];
      const date = new Date(`${year}-${month}-${day}`);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }

    let date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date;
    }

    return new Date('');
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoadingNews(true);
        setNewsError(null);

        const response = await fetch(
          'https://docs.google.com/spreadsheets/d/1lzN_O5z6z4Ed-Lvo0TK9PqU4bQ3sJqUD7poNnuhi6RY/gviz/tq?gid=0&tqx=out:json',
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseText = await response.text();
        
        const jsonStart = responseText.indexOf('{');
        const jsonEnd = responseText.lastIndexOf('}');
        let jsonString = '';
        if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
          jsonString = responseText.substring(jsonStart, jsonEnd + 1);
        } else {
          console.error('Could not find valid JSON in responseText:', responseText);
          throw new Error('Invalid JSON response from Google Sheets.');
        }
        const jsonData = JSON.parse(jsonString);
        
        const parsedData = parseGoogleSheetsJson(jsonData);

        const processedData = parsedData.map(article => {
          let rawContent = article.content;
          const lines = rawContent.split('\n');
          let newContentLines: string[] = [];
          let inList = false;

          lines.forEach((line) => {
            const trimmedLine = line.trim();
            const isListItem = line.startsWith('\t• ');

            if (isListItem) {
              if (!inList) {
                newContentLines.push('<ul>');
                inList = true;
              }
              newContentLines.push(`<li>${line.substring(3)}</li>`);
            } else {
              if (inList) {
                newContentLines.push('</ul>');
                inList = false;
              }
              newContentLines.push(line);
            }
          });

          if (inList) {
            newContentLines.push('</ul>');
          }

          const parsedDate = parseDateString(article.date);
          let formattedDate = article.date;
          if (!isNaN(parsedDate.getTime())) {
            const day = String(parsedDate.getDate()).padStart(2, '0');
            const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
            const year = parsedDate.getFullYear();
            formattedDate = `${day}.${month}.${year}`;
          }
          
          return { ...article, content: newContentLines.join('\n'), date: formattedDate };
        });

        const sortedData = processedData.sort((a, b) => {
          const dateA = parseDateString(a.date);
          const dateB = parseDateString(b.date);

          if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
            return 0;
          }
          return dateB.getTime() - dateA.getTime();
        });
        
        setNewsArticles(sortedData.slice(0, 3));
      } catch (e: any) {
        console.error('Error fetching news:', e);
        setNewsError(e.message || 'Wystąpił błąd podczas ładowania aktualności');
      } finally {
        setLoadingNews(false);
      }
    };

    fetchNews();
  }, []);

  React.useEffect(() => {
    if (newsArticles.length > 1) {
      const interval = setInterval(() => {
        setCurrentNewsIndex((prev) => (prev + 1) % newsArticles.length);
      }, 6000);
      
      return () => clearInterval(interval);
    }
  }, [newsArticles.length]);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
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

    const phoneRegex = /^(?:\+48)?(?:[ -]?\d{3}){3}$/;
    const cleanedPhone = formData.phone.replace(/[\s-]/g, '');

    if (!cleanedPhone.trim() || cleanedPhone.trim() === '+48') {
      newErrors.phone = 'Numer telefonu jest obowiązkowy.';
    } else if (!phoneRegex.test(cleanedPhone)) {
      newErrors.phone = 'Nieprawidłowy format numeru telefonu.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Wiadomość jest obowiązkowa.';
    }

    if (!formData.privacyConsent) {
      newErrors.privacyConsent = 'Zgoda na przetwarzanie danych jest obowiązkowa.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form Data:', formData);
      
      const webhookPayload = {
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`,
        platform: 'web',
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        referrer: document.referrer || 'direct',
        formType: 'homepage_contact',
        source: 'contact_form'
      };

      fetch('https://n8n.srv948633.hstgr.cloud/webhook/243235be-417h-4446-8h22-52186b5fd6d4', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(webhookPayload)
      }).then(response => {
        if (response.ok) {
          console.log('Homepage webhook sent successfully:', response.status);
        } else {
          console.error('Homepage webhook failed with status:', response.status);
        }
      }).catch(e => {
        console.error('Error sending homepage webhook:', e);
      }).finally(() => {
        openModal(formData, 'form_submission');
        
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '+48 ',
          message: '',
          loanType: '',
          agreementDate: null,
          homeBank: '',
          originalBank: '',
          loanTypeDetail: '',
          loanCurrency: '',
          loanValuePln: '',
          numberOfInstallments: '',
          loanStatus: '',
          repaymentDate: null,
          repaymentValuePln: '',
          privacyConsent: false
        });
        setErrors({});
      });
    }
  };

  const handleInputChange = (field: string, value: any) => {
    if (field === 'phone') {
      const prefix = '+48 ';
      let newValue = value;

      if (!newValue.startsWith(prefix) || newValue.length < prefix.length) {
        newValue = prefix;
      }
      setFormData(prev => ({ ...prev, [field]: newValue }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A1A2F' }}>
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 overflow-hidden" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="absolute inset-0 opacity-10">
          <img 
            src="/hero-background.jpg" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-24 h-24 rounded-2xl shadow-xl border-4 flex items-center justify-center mb-8 transition-all duration-500" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <span className="text-2xl font-bold" style={{ color: '#0A1A2F' }}>
                  {currencyIcons[currentIconIndex].name}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
                Uwolnij się od toksycznego kredytu
              </h1>
              <p className="text-xl mb-8 leading-relaxed" style={{ color: '#F5F5F5' }}>
                Specjalizuję się w unieważnianiu kredytów walutowych i umów SKD. 
                Bezpłatna konsultacja i działanie w oparciu o sukces.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => openModal(null, 'direct_consultation')}
                  className="font-bold py-4 px-8 rounded-lg text-lg transition-all hover:-translate-y-2 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4"
                  style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}
                >
                  Bezpłatna konsultacja
                </button>
                <Link 
                  to="#contact-section"
                  className="font-bold py-4 px-8 rounded-lg text-lg transition-all hover:-translate-y-2 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4 text-center"
                  style={{ backgroundColor: 'transparent', borderColor: '#D4AF37', color: '#F5F5F5' }}
                >
                  Sprawdź swoją sprawę
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full max-w-md mx-auto p-8 rounded-2xl shadow-2xl border-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
                <div className="text-center mb-6">
                  <Scale size={48} style={{ color: '#0A1A2F' }} className="mx-auto mb-4" />
                  <h3 className="text-2xl font-bold" style={{ color: '#0A1A2F' }}>
                    Sprawdź swoją sprawę
                  </h3>
                  <p className="text-sm mt-2" style={{ color: '#0A1A2F' }}>
                    Wypełnij formularz, a skontaktujemy się z Tobą
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Imię *"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 border"
                        style={{
                          backgroundColor: '#F5F5F5',
                          borderColor: errors.firstName ? '#ef4444' : 'rgba(10, 26, 47, 0.2)',
                          color: '#0A1A2F',
                          '--tw-ring-color': '#D4AF37'
                        }}
                        required
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Nazwisko *"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 border"
                        style={{
                          backgroundColor: '#F5F5F5',
                          borderColor: errors.lastName ? '#ef4444' : 'rgba(10, 26, 47, 0.2)',
                          color: '#0A1A2F',
                          '--tw-ring-color': '#D4AF37'
                        }}
                        required
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email *"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 border"
                      style={{
                        backgroundColor: '#F5F5F5',
                        borderColor: errors.email ? '#ef4444' : 'rgba(10, 26, 47, 0.2)',
                        color: '#0A1A2F',
                        '--tw-ring-color': '#D4AF37'
                      }}
                      required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="Numer telefonu *"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 border"
                      style={{
                        backgroundColor: '#F5F5F5',
                        borderColor: errors.phone ? '#ef4444' : 'rgba(10, 26, 47, 0.2)',
                        color: '#0A1A2F',
                        '--tw-ring-color': '#D4AF37'
                      }}
                      required
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <textarea
                      placeholder="Krótko opisz swoją sprawę *"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 border"
                      style={{
                        backgroundColor: '#F5F5F5',
                        borderColor: errors.message ? '#ef4444' : 'rgba(10, 26, 47, 0.2)',
                        color: '#0A1A2F',
                        '--tw-ring-color': '#D4AF37'
                      }}
                      required
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>

                  {/* Loan Type Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                      Rodzaj sprawy
                    </label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="loanType"
                          value="currency"
                          checked={formData.loanType === 'currency'}
                          onChange={(e) => handleInputChange('loanType', e.target.value)}
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
                          checked={formData.loanType === 'skd'}
                          onChange={(e) => handleInputChange('loanType', e.target.value)}
                          className="form-radio"
                          style={{ accentColor: '#D4AF37' }}
                        />
                        <span className="ml-2 text-sm" style={{ color: '#0A1A2F' }}>SKD</span>
                      </label>
                    </div>
                  </div>

                  {formData.loanType === 'currency' && (
                    <>
                      {/* Date of conclusion of the agreement */}
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                          Data zawarcia umowy
                        </label>
                        <DatePicker
                          selected={formData.agreementDate}
                          onChange={(date: Date | null) => handleInputChange('agreementDate', date)}
                          dateFormat="dd.MM.yyyy"
                          minDate={new Date(2000, 0, 1)}
                          maxDate={new Date()}
                          showYearDropdown
                          scrollableYearDropdown
                          yearDropdownItemNumber={100}
                          showMonthDropdown
                          className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 border"
                          wrapperClassName="w-full"
                          placeholderText="DD.MM.YYYY"
                          locale="pl"
                          style={{
                            backgroundColor: '#F5F5F5',
                            borderColor: 'rgba(10, 26, 47, 0.2)',
                            color: '#0A1A2F',
                            '--tw-ring-color': '#D4AF37'
                          }}
                        />
                      </div>

                      {/* Home bank with which the agreement was concluded */}
                      <div>
                        <input
                          type="text"
                          placeholder="Bank, z którym zawarto umowę"
                          value={formData.homeBank}
                          onChange={(e) => handleInputChange('homeBank', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 border"
                          style={{
                            backgroundColor: '#F5F5F5',
                            borderColor: 'rgba(10, 26, 47, 0.2)',
                            color: '#0A1A2F',
                            '--tw-ring-color': '#D4AF37'
                          }}
                        />
                      </div>

                      {/* Original bank */}
                      <div>
                        <input
                          type="text"
                          placeholder="Bank pierwotny (bank aktualny)"
                          value={formData.originalBank}
                          onChange={(e) => handleInputChange('originalBank', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 border"
                          style={{
                            backgroundColor: '#F5F5F5',
                            borderColor: 'rgba(10, 26, 47, 0.2)',
                            color: '#0A1A2F',
                            '--tw-ring-color': '#D4AF37'
                          }}
                        />
                      </div>

                      {/* Type of loan */}
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                          Typ kredytu
                        </label>
                        <div className="flex flex-wrap gap-4">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="loanTypeDetail"
                              value="indexed"
                              checked={formData.loanTypeDetail === 'indexed'}
                              onChange={(e) => handleInputChange('loanTypeDetail', e.target.value)}
                              className="form-radio"
                              style={{ accentColor: '#D4AF37' }}
                            />
                            <span className="ml-2 text-sm" style={{ color: '#0A1A2F' }}>Indeksowany</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="loanTypeDetail"
                              value="denominated"
                              checked={formData.loanTypeDetail === 'denominated'}
                              onChange={(e) => handleInputChange('loanTypeDetail', e.target.value)}
                              className="form-radio"
                              style={{ accentColor: '#D4AF37' }}
                            />
                            <span className="ml-2 text-sm" style={{ color: '#0A1A2F' }}>Denominowany</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="loanTypeDetail"
                              value="unknown"
                              checked={formData.loanTypeDetail === 'unknown'}
                              onChange={(e) => handleInputChange('loanTypeDetail', e.target.value)}
                              className="form-radio"
                              style={{ accentColor: '#D4AF37' }}
                            />
                            <span className="ml-2 text-sm" style={{ color: '#0A1A2F' }}>Nie wiem</span>
                          </label>
                        </div>
                      </div>

                      {/* Loan currency */}
                      <div>
                        <input
                          type="text"
                          placeholder="Waluta kredytu (np. CHF, EUR, USD)"
                          value={formData.loanCurrency}
                          onChange={(e) => handleInputChange('loanCurrency', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 border"
                          style={{
                            backgroundColor: '#F5F5F5',
                            borderColor: 'rgba(10, 26, 47, 0.2)',
                            color: '#0A1A2F',
                            '--tw-ring-color': '#D4AF37'
                          }}
                        />
                      </div>

                      {/* Value in PLN */}
                      <div>
                        <input
                          type="number"
                          placeholder="Wartość kredytu w PLN (w momencie zawarcia umowy)"
                          value={formData.loanValuePln}
                          onChange={(e) => handleInputChange('loanValuePln', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 border"
                          style={{
                            backgroundColor: '#F5F5F5',
                            borderColor: 'rgba(10, 26, 47, 0.2)',
                            color: '#0A1A2F',
                            '--tw-ring-color': '#D4AF37'
                          }}
                        />
                      </div>

                      {/* Number of installments in months */}
                      <div>
                        <input
                          type="number"
                          placeholder="Liczba rat w miesiącach (zgodnie z umową)"
                          value={formData.numberOfInstallments}
                          onChange={(e) => handleInputChange('numberOfInstallments', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 border"
                          style={{
                            backgroundColor: '#F5F5F5',
                            borderColor: 'rgba(10, 26, 47, 0.2)',
                            color: '#0A1A2F',
                            '--tw-ring-color': '#D4AF37'
                          }}
                        />
                      </div>

                      {/* Active or repaid loan */}
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                          Status kredytu
                        </label>
                        <div className="flex space-x-4">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="loanStatus"
                              value="active"
                              checked={formData.loanStatus === 'active'}
                              onChange={(e) => handleInputChange('loanStatus', e.target.value)}
                              className="form-radio"
                              style={{ accentColor: '#D4AF37' }}
                            />
                            <span className="ml-2 text-sm" style={{ color: '#0A1A2F' }}>Aktywny</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="loanStatus"
                              value="repaid"
                              checked={formData.loanStatus === 'repaid'}
                              onChange={(e) => handleInputChange('loanStatus', e.target.value)}
                              className="form-radio"
                              style={{ accentColor: '#D4AF37' }}
                            />
                            <span className="ml-2 text-sm" style={{ color: '#0A1A2F' }}>Spłacony</span>
                          </label>
                        </div>
                      </div>

                      {formData.loanStatus === 'repaid' && (
                        <>
                          {/* If repaid, enter the date of repayment */}
                          <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: '#0A1A2F' }}>
                              Data spłaty kredytu
                            </label>
                            <DatePicker
                              selected={formData.repaymentDate}
                              onChange={(date: Date | null) => handleInputChange('repaymentDate', date)}
                              dateFormat="dd.MM.yyyy"
                              minDate={new Date(1950, 0, 1)}
                              maxDate={new Date()}
                              showYearDropdown
                              scrollableYearDropdown
                              yearDropdownItemNumber={100}
                              showMonthDropdown
                              className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 border"
                              wrapperClassName="w-full"
                              placeholderText="DD.MM.YYYY"
                              locale="pl"
                              style={{
                                backgroundColor: '#F5F5F5',
                                borderColor: 'rgba(10, 26, 47, 0.2)',
                                color: '#0A1A2F',
                                '--tw-ring-color': '#D4AF37'
                              }}
                            />
                          </div>

                          {/* and the value of the payment in PLN. */}
                          <div>
                            <input
                              type="number"
                              placeholder="Wartość spłaty w PLN"
                              value={formData.repaymentValuePln}
                              onChange={(e) => handleInputChange('repaymentValuePln', e.target.value)}
                              className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 border"
                              style={{
                                backgroundColor: '#F5F5F5',
                                borderColor: 'rgba(10, 26, 47, 0.2)',
                                color: '#0A1A2F',
                                '--tw-ring-color': '#D4AF37'
                              }}
                            />
                          </div>
                        </>
                      )}
                    </>
                  )}

                  <div className="mb-4">
                    <label className="flex items-start text-sm font-medium w-full" style={{ color: '#0A1A2F' }}>
                      <input
                        type="checkbox"
                        checked={formData.privacyConsent}
                        onChange={(e) => handleInputChange('privacyConsent', e.target.checked)}
                        className="mr-2 mt-1 flex-shrink-0"
                        style={{ accentColor: '#D4AF37' }}
                        required
                      />
                      <span className="leading-relaxed flex-1">
                        Wyrażam zgodę na przetwarzanie moich danych osobowych przez właściciela strony internetowej uwolnieniekredytowe.pl w celach kontaktowych, marketingowych oraz związanych z nawiązaniem współpracy, zgodnie z <Link to="/privacy-policy" className="text-blue-600 underline">polityką prywatności.</Link> Zostałem/am poinformowany/a o przysługujących mi prawach, w tym o możliwości wycofania zgody w dowolnym momencie. *
                      </span>
                    </label>
                    {errors.privacyConsent && <p className="text-red-500 text-sm mt-1">{errors.privacyConsent}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full font-bold py-4 px-8 rounded-lg text-lg transition-all hover:-translate-y-1 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4"
                    style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37', color: '#F5F5F5' }}
                  >
                    Wyślij formularz
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: '#0A1A2F' }}>
              Nasze specjalizacje
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#0A1A2F' }}>
              Pomagamy klientom w unieważnianiu umów kredytowych i odzyskiwaniu nadpłaconych środków
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
                Kredyty walutowe
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: '#F5F5F5' }}>
                Specjalizujemy się w sprawach dotyczących kredytów denominowanych w CHF, EUR i USD. 
                Pomagamy w unieważnieniu umów i odzyskaniu nadpłaconych kwot.
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
                Umowy SKD
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: '#F5F5F5' }}>
                Pomoc prawna w sprawach dotyczących umów sprzedaży konsumenckiej na odległość 
                oraz nieuczciwych praktyk handlowych.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
              Dlaczego warto nam zaufać?
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
              Nasze doświadczenie i profesjonalizm gwarantują najwyższą jakość obsługi
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
              <div className="w-16 h-16 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                <Users size={32} style={{ color: '#F5F5F5' }} />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#0A1A2F' }}>
                Doświadczenie
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: '#0A1A2F' }}>
                Ponad 10 lat doświadczenia w sprawach kredytów walutowych i umów SKD. 
                Setki wygranych spraw.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
              <div className="w-16 h-16 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                <Award size={32} style={{ color: '#F5F5F5' }} />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#0A1A2F' }}>
                Sukces
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: '#0A1A2F' }}>
                Działamy w oparciu o sukces - płacisz tylko wtedy, gdy wygrywamy Twoją sprawę. 
                Bez ukrytych kosztów.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
              <div className="w-16 h-16 rounded-2xl shadow-xl border-4 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                <CheckCircle size={32} style={{ color: '#F5F5F5' }} />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#0A1A2F' }}>
                Bezpłatna konsultacja
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: '#0A1A2F' }}>
                Pierwsza konsultacja jest całkowicie bezpłatna. Analizujemy Twoją sprawę 
                i informujemy o szansach na sukces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: '#0A1A2F' }}>
              Nasze osiągnięcia w liczbach
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <div className="text-4xl font-bold mb-2" style={{ color: '#D4AF37' }}>500+</div>
              <p className="text-lg" style={{ color: '#F5F5F5' }}>Wygranych spraw</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <div className="text-4xl font-bold mb-2" style={{ color: '#D4AF37' }}>95%</div>
              <p className="text-lg" style={{ color: '#F5F5F5' }}>Skuteczność</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <div className="text-4xl font-bold mb-2" style={{ color: '#D4AF37' }}>50M+</div>
              <p className="text-lg" style={{ color: '#F5F5F5' }}>Odzyskanych złotych</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <div className="text-4xl font-bold mb-2" style={{ color: '#D4AF37' }}>10+</div>
              <p className="text-lg" style={{ color: '#F5F5F5' }}>Lat doświadczenia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
              Co mówią nasi klienci
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
              Opinie zadowolonych klientów, którzy odzyskali swoje pieniądze
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl shadow-xl border-4 transition-all duration-500" style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}>
              <div className="flex items-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} size={24} fill="#D4AF37" style={{ color: '#D4AF37' }} />
                ))}
              </div>
              <p className="text-xl mb-6 leading-relaxed italic" style={{ color: '#0A1A2F' }}>
                "{testimonials[currentTestimonial].text}"
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg" style={{ color: '#0A1A2F' }}>
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-sm" style={{ color: '#0A1A2F' }}>
                    {testimonials[currentTestimonial].location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold" style={{ color: '#D4AF37' }}>
                    {testimonials[currentTestimonial].case}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'scale-125' : 'opacity-50'
                  }`}
                  style={{ backgroundColor: '#D4AF37' }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: '#0A1A2F' }}>
              Najnowsze aktualności
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#0A1A2F' }}>
              Bądź na bieżąco z najważniejszymi informacjami z branży prawniczej
            </p>
          </div>
          
          {loadingNews && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: '#D4AF37' }}></div>
              <p className="text-xl mt-4" style={{ color: '#0A1A2F' }}>
                Ładowanie aktualności...
              </p>
            </div>
          )}
          
          {newsError && (
            <div className="text-center p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <p className="text-xl text-red-400 mb-4">
                Błąd podczas ładowania aktualności
              </p>
              <p className="text-sm" style={{ color: '#F5F5F5' }}>
                {newsError}
              </p>
            </div>
          )}
          
          {!loadingNews && !newsError && newsArticles.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <div className="p-8 rounded-2xl shadow-xl border-4 transition-all duration-500" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                <div className="flex items-center mb-4">
                  <Newspaper size={24} style={{ color: '#D4AF37' }} className="mr-2" />
                  <span className="text-sm" style={{ color: '#D4AF37' }}>
                    {newsArticles[currentNewsIndex].date}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
                  {newsArticles[currentNewsIndex].title}
                </h3>
                <div 
                  className="text-lg leading-relaxed mb-6 h-24 overflow-hidden" 
                  style={{ color: '#F5F5F5' }}
                  dangerouslySetInnerHTML={{ __html: newsArticles[currentNewsIndex].content }}
                />
                <div className="flex justify-between items-center">
                  <Link 
                    to="/news"
                    className="inline-block font-bold py-3 px-6 rounded-lg text-md transition-all hover:-translate-y-1 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4"
                    style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}
                  >
                    Zobacz wszystkie aktualności →
                  </Link>
                </div>
              </div>
              
              {newsArticles.length > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  {newsArticles.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentNewsIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentNewsIndex ? 'scale-125' : 'opacity-50'
                      }`}
                      style={{ backgroundColor: '#D4AF37' }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
              Najczęściej zadawane pytania
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
              Odpowiedzi na najważniejsze pytania dotyczące kredytów walutowych i umów SKD
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div 
                key={faq.id}
                className="rounded-2xl shadow-lg border-4 overflow-hidden"
                style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37' }}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between transition-all hover:bg-opacity-90"
                  style={{ backgroundColor: 'transparent' }}
                >
                  <h3 className="text-lg font-semibold" style={{ color: '#0A1A2F' }}>
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    {openFAQ === faq.id ? (
                      <ChevronUp size={24} style={{ color: '#D4AF37' }} />
                    ) : (
                      <ChevronDown size={24} style={{ color: '#D4AF37' }} />
                    )}
                  </div>
                </button>
                
                {openFAQ === faq.id && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t" style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }}>
                      <p className="text-lg leading-relaxed" style={{ color: '#0A1A2F' }}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/faq"
              className="inline-block font-bold py-4 px-8 rounded-lg text-lg transition-all hover:-translate-y-2 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4"
              style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}
            >
              Zobacz wszystkie pytania
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: '#0A1A2F' }}>
              Skontaktuj się z nami
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#0A1A2F' }}>
              Jesteśmy gotowi pomóc Ci w Twojej sprawie. Skontaktuj się z nami już dziś!
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#0A1A2F' }}>
                    <Phone size={24} style={{ color: '#D4AF37' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: '#0A1A2F' }}>Telefon</h3>
                    <p className="text-lg" style={{ color: '#0A1A2F' }}>+48 601 227 876</p>
                    <p className="text-sm" style={{ color: '#0A1A2F' }}>Pon-Pt: 9:00-17:00</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#0A1A2F' }}>
                    <Mail size={24} style={{ color: '#D4AF37' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: '#0A1A2F' }}>Email</h3>
                    <p className="text-lg" style={{ color: '#0A1A2F' }}>krzysztof.milewski@dsa.pl</p>
                    <p className="text-sm" style={{ color: '#0A1A2F' }}>Odpowiadamy w ciągu 24h</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#0A1A2F' }}>
                    <Clock size={24} style={{ color: '#D4AF37' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: '#0A1A2F' }}>Godziny pracy</h3>
                    <p className="text-lg" style={{ color: '#0A1A2F' }}>Poniedziałek - Piątek</p>
                    <p className="text-sm" style={{ color: '#0A1A2F' }}>9:00 - 17:00</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
                  Bezpłatna konsultacja
                </h3>
                <p className="text-lg mb-6 leading-relaxed" style={{ color: '#F5F5F5' }}>
                  Umów się na bezpłatną konsultację i dowiedz się, jakie masz możliwości prawne. 
                  Analizujemy Twoją sprawę bez żadnych zobowiązań.
                </p>
                <button
                  onClick={() => openModal(null, 'direct_consultation')}
                  className="w-full font-bold py-4 px-8 rounded-lg text-lg transition-all hover:-translate-y-2 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4"
                  style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}
                >
                  Umów konsultację
                </button>
              </div>
            </div>
            
            <div className="p-8 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
              <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: '#F5F5F5' }}>
                Wyślij wiadomość
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Imię *"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: 'rgba(245, 245, 245, 0.1)',
                        border: '1px solid rgba(245, 245, 245, 0.2)',
                        color: '#F5F5F5',
                        '--tw-ring-color': '#D4AF37'
                      }}
                      required
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Nazwisko *"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: 'rgba(245, 245, 245, 0.1)',
                        border: '1px solid rgba(245, 245, 245, 0.2)',
                        color: '#F5F5F5',
                        '--tw-ring-color': '#D4AF37'
                      }}
                      required
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: 'rgba(245, 245, 245, 0.1)',
                      border: '1px solid rgba(245, 245, 245, 0.2)',
                      color: '#F5F5F5',
                      '--tw-ring-color': '#D4AF37'
                    }}
                    required
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <input
                    type="tel"
                    placeholder="Numer telefonu *"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: 'rgba(245, 245, 245, 0.1)',
                      border: '1px solid rgba(245, 245, 245, 0.2)',
                      color: '#F5F5F5',
                      '--tw-ring-color': '#D4AF37'
                    }}
                    required
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <textarea
                    placeholder="Twoja wiadomość *"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: 'rgba(245, 245, 245, 0.1)',
                      border: '1px solid rgba(245, 245, 245, 0.2)',
                      color: '#F5F5F5',
                      '--tw-ring-color': '#D4AF37'
                    }}
                    required
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <div className="mb-6">
                  <label className="flex items-start text-sm font-medium w-full" style={{ color: '#F5F5F5' }}>
                    <input
                      type="checkbox"
                      checked={formData.privacyConsent}
                      onChange={(e) => handleInputChange('privacyConsent', e.target.checked)}
                      className="mr-2 mt-1 flex-shrink-0"
                      style={{ accentColor: '#D4AF37' }}
                      required
                    />
                    <span className="leading-relaxed flex-1">
                      Wyrażam zgodę na przetwarzanie moich danych osobowych przez właściciela strony internetowej uwolnieniekredytowe.pl w celach kontaktowych, marketingowych oraz związanych z nawiązaniem współpracy, zgodnie z <Link to="/privacy-policy" className="text-yellow-300 underline">polityką prywatności.</Link> Zostałem/am poinformowany/a o przysługujących mi prawach, w tym o możliwości wycofania zgody w dowolnym momencie. *
                    </span>
                  </label>
                  {errors.privacyConsent && <p className="text-red-500 text-sm mt-1">{errors.privacyConsent}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full font-bold py-4 px-8 rounded-lg text-lg transition-all hover:-translate-y-1 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4"
                  style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}
                >
                  Wyślij wiadomość
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;