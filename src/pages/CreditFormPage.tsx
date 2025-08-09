import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Define the form data interface for type safety
interface FormData {
  typ_kredytu: string;
  waluta: string;
  waluta_inna: string;
  powiedz_mi_wiecej: string[];
  data_zawarcia_umowy: string;
  bank_macierzysty: string;
  rodzaj_kredytu: string;
  wartosc_pln: number | '';
  liczba_rat: number | '';
  status_kredytu: string;
  data_splaty: string;
  laczna_wartosc_wplat_pln: number | '';
}

const CreditFormPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    typ_kredytu: '',
    waluta: '',
    waluta_inna: '',
    powiedz_mi_wiecej: [],
    data_zawarcia_umowy: '',
    bank_macierzysty: '',
    rodzaj_kredytu: '',
    wartosc_pln: '',
    liczba_rat: '',
    status_kredytu: '',
    data_splaty: '',
    laczna_wartosc_wplat_pln: '',
  });

  const [errors, setErrors] = useState<Partial<FormData & { [key: string]: string }>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'number') {
      setFormData((prev) => ({ ...prev, [name]: value === '' ? '' : parseFloat(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { options } = e.target;
    const value: string[] = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setFormData((prev) => ({ ...prev, powiedz_mi_wiecej: value }));
  };

  const validate = () => {
    const newErrors: Partial<FormData & { [key: string]: string }> = {};
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // typ_kredytu
    if (!formData.typ_kredytu) {
      newErrors.typ_kredytu = 'Typ kredytu jest wymagany.';
    }

    // waluta and waluta_inna
    if (formData.typ_kredytu === 'Walutowy') {
      if (!formData.waluta) {
        newErrors.waluta = 'Waluta kredytu jest wymagana dla kredytu walutowego.';
      } else if (formData.waluta === 'Inna (podaj)' && !formData.waluta_inna.trim()) {
        newErrors.waluta_inna = 'Podaj walutę, jeśli wybrano "Inna (podaj)".';
      }
    }

    // data_zawarcia_umowy
    if (!formData.data_zawarcia_umowy) {
      newErrors.data_zawarcia_umowy = 'Data zawarcia umowy jest wymagana.';
    } else if (formData.data_zawarcia_umowy > today) {
      newErrors.data_zawarcia_umowy = 'Data zawarcia umowy nie może być w przyszłości.';
    }

    // bank_macierzysty
    if (!formData.bank_macierzysty.trim()) {
      newErrors.bank_macierzysty = 'Bank macierzysty jest wymagany.';
    }

    // rodzaj_kredytu
    if (!formData.rodzaj_kredytu) {
      newErrors.rodzaj_kredytu = 'Rodzaj kredytu jest wymagany.';
    }

    // wartosc_pln
    if (formData.wartosc_pln === '' || isNaN(Number(formData.wartosc_pln)) || Number(formData.wartosc_pln) < 0) {
      newErrors.wartosc_pln = 'Wartość kredytu w PLN musi być liczbą nieujemną.';
    }

    // liczba_rat
    if (formData.liczba_rat === '' || isNaN(Number(formData.liczba_rat)) || !Number.isInteger(Number(formData.liczba_rat)) || Number(formData.liczba_rat) < 1) {
      newErrors.liczba_rat = 'Liczba rat musi być liczbą całkowitą większą od 0.';
    }

    // status_kredytu
    if (!formData.status_kredytu) {
      newErrors.status_kredytu = 'Status kredytu jest wymagany.';
    }

    // Conditional fields for status_kredytu = "Spłacony"
    if (formData.status_kredytu === 'Spłacony') {
      // data_splaty
      if (!formData.data_splaty) {
        newErrors.data_splaty = 'Data całkowitej spłaty jest wymagana dla spłaconego kredytu.';
      } else if (formData.data_splaty > today) {
        newErrors.data_splaty = 'Data spłaty nie może być w przyszłości.';
      } else if (formData.data_zawarcia_umowy && formData.data_splaty < formData.data_zawarcia_umowy) {
        newErrors.data_splaty = 'Data spłaty nie może być przed datą zawarcia umowy.';
      }

      // laczna_wartosc_wplat_pln
      if (formData.laczna_wartosc_wplat_pln === '' || isNaN(Number(formData.laczna_wartosc_wplat_pln)) || Number(formData.laczna_wartosc_wplat_pln) < 0) {
        newErrors.laczna_wartosc_wplat_pln = 'Łączna wartość wpłat w PLN musi być liczbą nieujemną.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const output: { [key: string]: any } = { ...formData };

      // Clean up fields that should be null if not applicable
      if (output.typ_kredytu !== 'Walutowy') {
        output.waluta = null;
        output.waluta_inna = null;
      } else {
        if (output.waluta !== 'Inna (podaj)') {
          output.waluta_inna = null;
        }
      }

      if (output.status_kredytu !== 'Spłacony') {
        output.data_splaty = null;
        output.laczna_wartosc_wplat_pln = null;
      }

      // Handle optional multi-select: if empty, it should be an empty array
      if (output.powiedz_mi_wiecej.length === 0) {
        output.powiedz_mi_wiecej = [];
      }

      // Ensure number fields are numbers or null, and format to 2 decimal places
      output.wartosc_pln = output.wartosc_pln === '' ? null : parseFloat(Number(output.wartosc_pln).toFixed(2));
      output.liczba_rat = output.liczba_rat === '' ? null : Number(output.liczba_rat);
      output.laczna_wartosc_wplat_pln = output.laczna_wartosc_wplat_pln === '' ? null : parseFloat(Number(output.laczna_wartosc_wplat_pln).toFixed(2));

      console.log('Form submitted successfully:', output);
      alert('Formularz wysłany pomyślnie! Sprawdź konsolę.');
    } else {
      console.log('Form validation failed:', errors);
    }
  };

  const inputStyle = "w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2";
  const inputBgStyle = {
    backgroundColor: 'rgba(245, 245, 245, 0.1)',
    border: '1px solid rgba(245, 245, 245, 0.2)',
    color: '#F5F5F5',
    '--tw-ring-color': '#D4AF37',
  };
  const labelStyle = "block text-sm font-medium mb-2";
  const errorStyle = "text-red-400 text-sm mt-1";
  const helpTextStyle = "text-xs text-gray-400 mt-1";

  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5' }}>
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 mb-8 text-lg transition-colors hover:opacity-80"
            style={{ color: '#D4AF37' }}
          >
            <ArrowLeft size={20} />
            <span>Powrót do strony głównej</span>
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
            Formularz Kredytowy
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-center mb-12">
            Wypełnij poniższy formularz, abyśmy mogli lepiej zrozumieć Twoją sytuację kredytową.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8 p-8 rounded-2xl shadow-xl border-4" style={{ borderColor: '#D4AF37', backgroundColor: '#0A1A2F' }}>
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#F5F5F5' }}>Dane kredytu</h2>

            {/* typ_kredytu */}
            <div>
              <label htmlFor="typ_kredytu" className={labelStyle}>
                Typ kredytu <span style={{ color: '#D4AF37' }}>*</span>
              </label>
              <select
                id="typ_kredytu"
                name="typ_kredytu"
                value={formData.typ_kredytu}
                onChange={handleChange}
                className={inputStyle}
                style={inputBgStyle}
                required
              >
                <option value="" disabled>Wybierz...</option>
                <option value="Złotowy (PLN)">Złotowy (PLN)</option>
                <option value="Walutowy">Walutowy</option>
                <option value="SKD">SKD</option>
              </select>
              <p className={helpTextStyle}>Wybierz rodzaj kredytu. Jeśli walutowy — wskaż walutę niżej.</p>
              {errors.typ_kredytu && <p className={errorStyle}>{errors.typ_kredytu}</p>}
            </div>

            {/* waluta (conditional) */}
            {formData.typ_kredytu === 'Walutowy' && (
              <div>
                <label htmlFor="waluta" className={labelStyle}>
                  Waluta kredytu <span style={{ color: '#D4AF37' }}>*</span>
                </label>
                <select
                  id="waluta"
                  name="waluta"
                  value={formData.waluta}
                  onChange={handleChange}
                  className={inputStyle}
                  style={inputBgStyle}
                  required
                >
                  <option value="" disabled>Wybierz...</option>
                  <option value="CHF">CHF</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                  <option value="Inna (podaj)">Inna (podaj)</option>
                </select>
                {errors.waluta && <p className={errorStyle}>{errors.waluta}</p>}
              </div>
            )}

            {/* waluta_inna (conditional) */}
            {formData.typ_kredytu === 'Walutowy' && formData.waluta === 'Inna (podaj)' && (
              <div>
                <label htmlFor="waluta_inna" className={labelStyle}>
                  Podaj walutę <span style={{ color: '#D4AF37' }}>*</span>
                </label>
                <input
                  type="text"
                  id="waluta_inna"
                  name="waluta_inna"
                  value={formData.waluta_inna}
                  onChange={handleChange}
                  className={inputStyle}
                  style={inputBgStyle}
                  placeholder="np. JPY"
                  required
                />
                {errors.waluta_inna && <p className={errorStyle}>{errors.waluta_inna}</p>}
              </div>
            )}

            {/* data_zawarcia_umowy */}
            <div>
              <label htmlFor="data_zawarcia_umowy" className={labelStyle}>
                Data zawarcia umowy <span style={{ color: '#D4AF37' }}>*</span>
              </label>
              <input
                type="date"
                id="data_zawarcia_umowy"
                name="data_zawarcia_umowy"
                value={formData.data_zawarcia_umowy}
                onChange={handleChange}
                className={inputStyle}
                style={inputBgStyle}
                required
              />
              {errors.data_zawarcia_umowy && <p className={errorStyle}>{errors.data_zawarcia_umowy}</p>}
            </div>

            {/* bank_macierzysty */}
            <div>
              <label htmlFor="bank_macierzysty" className={labelStyle}>
                Bank macierzysty (z którym zawarto umowę) <span style={{ color: '#D4AF37' }}>*</span>
              </label>
              <input
                type="text"
                id="bank_macierzysty"
                name="bank_macierzysty"
                value={formData.bank_macierzysty}
                onChange={handleChange}
                className={inputStyle}
                style={inputBgStyle}
                placeholder="np. mBank, PKO BP, Millennium..."
                required
              />
              {errors.bank_macierzysty && <p className={errorStyle}>{errors.bank_macierzysty}</p>}
            </div>

            {/* rodzaj_kredytu */}
            <div>
              <label className={labelStyle}>
                Rodzaj kredytu <span style={{ color: '#D4AF37' }}>*</span>
              </label>
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                {['indeksowany', 'denominowany', 'nie wiem'].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="rodzaj_kredytu"
                      value={option}
                      checked={formData.rodzaj_kredytu === option}
                      onChange={handleChange}
                      className="form-radio"
                      style={{ accentColor: '#D4AF37' }}
                      required
                    />
                    <span className="ml-2">{option.charAt(0).toUpperCase() + option.slice(1)}</span>
                  </label>
                ))}
              </div>
              <p className={helpTextStyle}>Jeśli nie masz pewności, wybierz ‘nie wiem’.</p>
              {errors.rodzaj_kredytu && <p className={errorStyle}>{errors.rodzaj_kredytu}</p>}
            </div>

            {/* wartosc_pln & liczba_rat (2-column on desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="wartosc_pln" className={labelStyle}>
                  Wartość kredytu w PLN <span style={{ color: '#D4AF37' }}>*</span>
                </label>
                <input
                  type="number"
                  id="wartosc_pln"
                  name="wartosc_pln"
                  value={formData.wartosc_pln}
                  onChange={handleChange}
                  className={inputStyle}
                  style={inputBgStyle}
                  placeholder="np. 350000"
                  step="0.01"
                  min="0"
                  required
                />
                {errors.wartosc_pln && <p className={errorStyle}>{errors.wartosc_pln}</p>}
              </div>
              <div>
                <label htmlFor="liczba_rat" className={labelStyle}>
                  Liczba rat (w miesiącach) <span style={{ color: '#D4AF37' }}>*</span>
                </label>
                <input
                  type="number"
                  id="liczba_rat"
                  name="liczba_rat"
                  value={formData.liczba_rat}
                  onChange={handleChange}
                  className={inputStyle}
                  style={inputBgStyle}
                  placeholder="np. 360"
                  min="1"
                  step="1"
                  required
                />
                {errors.liczba_rat && <p className={errorStyle}>{errors.liczba_rat}</p>}
              </div>
            </div>

            {/* status_kredytu */}
            <div>
              <label className={labelStyle}>
                Status kredytu <span style={{ color: '#D4AF37' }}>*</span>
              </label>
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                {['Aktywny', 'Spłacony'].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="status_kredytu"
                      value={option}
                      checked={formData.status_kredytu === option}
                      onChange={handleChange}
                      className="form-radio"
                      style={{ accentColor: '#D4AF37' }}
                      required
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
              {errors.status_kredytu && <p className={errorStyle}>{errors.status_kredytu}</p>}
            </div>

            {/* data_splaty & laczna_wartosc_wplat_pln (conditional, 2-column on desktop) */}
            {formData.status_kredytu === 'Spłacony' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="data_splaty" className={labelStyle}>
                    Data całkowitej spłaty <span style={{ color: '#D4AF37' }}>*</span>
                  </label>
                  <input
                    type="date"
                    id="data_splaty"
                    name="data_splaty"
                    value={formData.data_splaty}
                    onChange={handleChange}
                    className={inputStyle}
                    style={inputBgStyle}
                    required
                  />
                  {errors.data_splaty && <p className={errorStyle}>{errors.data_splaty}</p>}
                </div>
                <div>
                  <label htmlFor="laczna_wartosc_wplat_pln" className={labelStyle}>
                    Łączna wartość wpłat w PLN <span style={{ color: '#D4AF37' }}>*</span>
                  </label>
                  <input
                    type="number"
                    id="laczna_wartosc_wplat_pln"
                    name="laczna_wartosc_wplat_pln"
                    value={formData.laczna_wartosc_wplat_pln}
                    onChange={handleChange}
                    className={inputStyle}
                    style={inputBgStyle}
                    placeholder="np. 412345.67"
                    step="0.01"
                    min="0"
                    required
                  />
                  {errors.laczna_wartosc_wplat_pln && <p className={errorStyle}>{errors.laczna_wartosc_wplat_pln}</p>}
                </div>
              </div>
            )}

            {/* powiedz_mi_wiecej (multi-select) */}
            <div>
              <label htmlFor="powiedz_mi_wiecej" className={labelStyle}>
                Powiedz mi więcej o… (opcjonalnie)
              </label>
              <select
                id="powiedz_mi_wiecej"
                name="powiedz_mi_wiecej"
                multiple
                value={formData.powiedz_mi_wiecej}
                onChange={handleMultiSelectChange}
                className={`${inputStyle} h-32`} // Adjust height for multi-select
                style={inputBgStyle}
              >
                <option value="" disabled>Wybierz temat (opcjonalnie)</option>
                <option value="Ubezpieczenia/ubezpieczenie niskiego wkładu">Ubezpieczenia/ubezpieczenie niskiego wkładu</option>
                <option value="Wcześniejsza spłata">Wcześniejsza spłata</option>
                <option value="Wzrost rat">Wzrost rat</option>
                <option value="Aneksy/renegocjacje">Aneksy/renegocjacje</option>
                <option value="Klauzule abuzywne">Klauzule abuzywne</option>
                <option value="Inne">Inne</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full font-bold py-4 px-8 rounded-lg text-lg transition-all hover:-translate-y-1 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4 active:scale-95 active:shadow-inner"
              style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}
            >
              Wyślij formularz
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreditFormPage;
